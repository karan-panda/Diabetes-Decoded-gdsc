import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // Ensure this matches the one in Google Cloud Console exactly
);

// Define the scopes required for Google Fit API
// Choose scopes based on the specific data you need (steps, heart rate, etc.)
// Find available scopes here: https://developers.google.com/fit/rest/v1/authorization
const scopes = [
  'https://www.googleapis.com/auth/fitness.activity.read', // Steps
  'https://www.googleapis.com/auth/fitness.body.read', // Weight, BMI etc.
  'https://www.googleapis.com/auth/fitness.heart_rate.read', // Heart rate
  'https://www.googleapis.com/auth/fitness.blood_pressure.read', // Blood Pressure
  'https://www.googleapis.com/auth/userinfo.profile', // Add userinfo.profile scope for access to basic profile info
  'https://www.googleapis.com/auth/userinfo.email', // Add email scope for user identification
  // 'https://www.googleapis.com/auth/fitness.blood_glucose.read', // Optional: Glucose
  // 'https://www.googleapis.com/auth/fitness.sleep.read', // Optional: Sleep
  // 'https://www.googleapis.com/auth/fitness.location.read', // Optional: Location
  // 'https://www.googleapis.com/auth/fitness.nutrition.read', // Optional: Nutrition
];

export default function handler(req, res) {
  console.log("Google Fit connect handler started");
  console.log("Environment variables set:", {
    clientIdSet: !!process.env.GOOGLE_CLIENT_ID,
    clientSecretSet: !!process.env.GOOGLE_CLIENT_SECRET,
    redirectUriSet: !!process.env.GOOGLE_REDIRECT_URI
  });
  
  // Generate the url that will be used for the consent dialog.
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'offline' gets refresh_token
    scope: scopes,
    include_granted_scopes: true,
    // Force approval prompt every time to ensure refresh token is always provided
    prompt: 'consent'
  });

  console.log("Redirecting to Google OAuth URL:", authorizationUrl);
  res.redirect(authorizationUrl);
}
