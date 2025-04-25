import { google } from 'googleapis';
import { setCookie } from 'nookies'; // Using nookies for cookie management
import crypto from 'crypto';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req, res) {
  const { code } = req.query; // Get the authorization code from the query parameters

  if (!code) {
    return res.status(400).send('Authorization code missing.');
  }

  try {
    console.log("Exchanging authorization code for tokens...");
    
    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    console.log("Token exchange successful. Access token received:", 
      tokens.access_token ? "✓ Present" : "✗ Missing",
      "Expires in:", tokens.expiry_date ? Math.floor((tokens.expiry_date - Date.now()) / 1000) + "s" : "Unknown"
    );

    // Get user info with explicit error handling
    let googleUserId;
    try {
      console.log("Attempting to fetch user info with access token...");
      const oauth2 = google.oauth2({
        version: 'v2',
        auth: oauth2Client
      });
      
      const userInfo = await oauth2.userinfo.get();
      googleUserId = userInfo.data.id; // This is a unique Google user ID
      console.log("Successfully retrieved user info. User ID:", googleUserId);
    } catch (userInfoError) {
      console.error("Error fetching user info:", userInfoError.message);
      // Generate a fallback user ID if we can't get one from Google
      googleUserId = `temp_${crypto.randomBytes(16).toString('hex')}`;
      console.log("Using fallback user ID:", googleUserId);
    }
    
    // Store the access token in a cookie
    if (tokens.access_token) {
        // Calculate accurate expiry time, default to 1 hour if not provided
        const expiryTime = tokens.expiry_date 
          ? Math.floor((tokens.expiry_date - Date.now()) / 1000) 
          : 3600;
          
        console.log(`Setting access token cookie, expires in ${expiryTime} seconds`);
        
        setCookie({ res }, 'google_access_token', tokens.access_token, {
            maxAge: expiryTime,
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        
        // Set user_id cookie for storage purposes
        setCookie({ res }, 'user_id', googleUserId, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        
        console.log(`Set user_id cookie: ${googleUserId}`);
    } else {
        console.error("No access token received from Google!");
    }
    
    if (tokens.refresh_token) {
        // IMPORTANT: Store refresh_token securely in a database associated with the user
        console.log("Received refresh token - this should be stored securely in a database");
        // Here you would typically save this to a secure database
        // Example: await db.users.updateRefreshToken(googleUserId, tokens.refresh_token);
    } else {
        console.log("No refresh token received. User may have previously authorized the app.");
    }

    // Redirect the user back to the analysis page
    console.log("Authentication successful, redirecting to analysis page");
    res.redirect('/analysis');
  } catch (error) {
    console.error('Error during Google authentication:', error);
    
    // Provide a more informative error page
    res.status(500).send(`
      <html>
        <head>
          <title>Authentication Error</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            .error-container { max-width: 600px; margin: 0 auto; }
            .error-code { color: #e53e3e; font-weight: bold; }
            .back-button { margin-top: 20px; padding: 10px 20px; background-color: #4299e1; 
                          color: white; border: none; border-radius: 5px; cursor: pointer; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1>Google Fit Authentication Failed</h1>
            <p>There was a problem connecting to your Google Fit account.</p>
            <p class="error-code">Error: ${error.message}</p>
            <p>Please try again or contact support if the problem persists.</p>
            <button class="back-button" onclick="window.location.href='/analysis'">
              Return to Analysis Page
            </button>
          </div>
        </body>
      </html>
    `);
  }
}
