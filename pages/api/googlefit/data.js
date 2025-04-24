// pages/api/googlefit/data.js
import { parseCookies } from 'nookies';
import { google } from 'googleapis';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// Initialize Firebase directly in the API route to ensure it's available
const firebaseConfig = {
  apiKey: "AIzaSyBYOWzDEWi9JcdSMuZ9sQYIhbjqmn-J6T4",
  authDomain: "diabetes-decoded.firebaseapp.com",
  projectId: "diabetes-decoded",
  storageBucket: "diabetes-decoded",
  messagingSenderId: "978627285159",
  appId: "1:978627285159:web:b94771e13800528b85cb82",
  measurementId: "G-YJ65JN84ZS",
  databaseURL: "https://diabetes-decoded-default-rtdb.firebaseio.com/"
};

// Initialize Firebase if not already initialized
let firebaseApp;
let db;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

db = getFirestore(firebaseApp);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const fitness = google.fitness('v1');

async function findDataSource(auth, dataTypeName) {
  try {
    console.log(`Listing available data sources for ${dataTypeName}...`);
    const sourcesResponse = await fitness.users.dataSources.list({
      userId: 'me',
      dataTypeName: dataTypeName,
      auth: auth,
    });

    // Log the complete response to debug
    console.log(`Complete data sources response for ${dataTypeName}:`, JSON.stringify(sourcesResponse.data, null, 2));

    const dataSources = sourcesResponse.data.dataSource;
    if (!dataSources || dataSources.length === 0) {
      console.log(`No ${dataTypeName} data sources found for this user.`);
      return null;
    }

    // Prefer derived sources, but fall back to others if necessary
    let dataSource = dataSources.find(ds => ds.dataStreamId?.startsWith('derived:'));
    if (!dataSource) {
        dataSource = dataSources[0]; // Use the first one found if no derived source exists
    }

    console.log(`Found data source ID for ${dataTypeName}: ${dataSource.dataStreamId}`);
    return dataSource.dataStreamId;
  } catch (error) {
    console.error(`Error finding data source for ${dataTypeName}:`, error.message);
    console.error(`Error details:`, error);
    return null;
  }
}

async function aggregateData(auth, dataSourceId, dataTypeName, startTimeMillis, endTimeMillis, dailyBucketMillis) {
  try {
    if (!dataSourceId && !dataTypeName) {
      throw new Error("need either dataSourceId or dataTypeName");
    }
    
    const aggregateBy = dataSourceId 
      ? [{ dataSourceId }] 
      : [{ dataTypeName }];
    
    const aggregateRequest = {
      userId: 'me',
      requestBody: {
        aggregateBy: aggregateBy,
        bucketByTime: { durationMillis: dailyBucketMillis },
        startTimeMillis: startTimeMillis,
        endTimeMillis: endTimeMillis,
      }
    };

    console.log(`Requesting Google Fit data for ${dataTypeName || dataSourceId} with start:`, new Date(startTimeMillis).toISOString(), "end:", new Date(endTimeMillis).toISOString());
    console.log(`Full aggregate request:`, JSON.stringify(aggregateRequest, null, 2));
    
    const response = await fitness.users.dataset.aggregate({
        auth: auth,
        ...aggregateRequest
    });

    console.log(`Google Fit API Aggregate Response Status for ${dataTypeName || dataSourceId}:`, response.status);
    console.log(`Full aggregate response:`, JSON.stringify(response.data, null, 2));

    // Process the response data
    return response.data.bucket?.map(bucket => {
        const startTimeMs = parseInt(bucket.startTimeMillis, 10);
        const endTimeMs = parseInt(bucket.endTimeMillis, 10);
        const point = bucket.dataset?.[0]?.point?.[0];
        const value = point?.value?.[0];
        return {
            startTimeMillis: startTimeMs,
            endTimeMillis: endTimeMs,
            value: value ? value.fpVal || value.intVal : 0,
        };
    }).filter(bucket => bucket.value > 0) || [];
  } catch (error) {
    console.warn(`Could not fetch ${dataTypeName || dataSourceId} data:`, error.message);
    console.error(`Error details for ${dataTypeName || dataSourceId}:`, error);
    
    if (error.response) {
      console.error(`API error response for ${dataTypeName || dataSourceId}:`, error.response.data);
    }
    return [];
  }
}

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const accessToken = cookies.google_access_token;
  const userId = cookies.user_id; // You'll need to set this cookie during authentication

  if (!accessToken) {
    return res.status(401).json({ error: 'User not authenticated with Google Fit' });
  }

  oauth2Client.setCredentials({ access_token: accessToken });

  try {
    const now = new Date();
    const startTime = new Date();
    startTime.setDate(now.getDate() - 7);
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date();
    const startTimeMillis = startTime.getTime();
    const endTimeMillis = endTime.getTime();
    const dailyBucketMillis = 86400000; // 1 day

    // --- Fetch Steps --- 
    let stepsData = [];
    try {
        const stepSourceId = await findDataSource(oauth2Client, 'com.google.step_count.delta');
        if (stepSourceId) {
          const stepBuckets = await aggregateData(oauth2Client, stepSourceId, 'com.google.step_count.delta', startTimeMillis, endTimeMillis, dailyBucketMillis);
          stepsData = stepBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  steps: bucket.value,
              };
          }).filter(bucket => bucket.steps > 0);
        } else {
          // Try to aggregate by data type name if no source found
          const stepBuckets = await aggregateData(oauth2Client, null, 'com.google.step_count.delta', startTimeMillis, endTimeMillis, dailyBucketMillis);
          stepsData = stepBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  steps: bucket.value,
              };
          }).filter(bucket => bucket.steps > 0);
        }
    } catch (error) {
        console.warn("Could not fetch step data:", error.message);
    }

    // --- Fetch Heart Rate --- 
    let heartRateData = [];
    try {
        const heartRateSourceId = await findDataSource(oauth2Client, 'com.google.heart_rate.bpm');
        if (heartRateSourceId) {
          const heartRateBuckets = await aggregateData(oauth2Client, heartRateSourceId, 'com.google.heart_rate.bpm', startTimeMillis, endTimeMillis, dailyBucketMillis);
          heartRateData = heartRateBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  averageBpm: bucket.value,
                  maxBpm: null,
                  minBpm: null,
              };
          }).filter(bucket => bucket.averageBpm !== null);
        } else {
          // Try to aggregate by data type name if no source found
          const heartRateBuckets = await aggregateData(oauth2Client, null, 'com.google.heart_rate.bpm', startTimeMillis, endTimeMillis, dailyBucketMillis);
          heartRateData = heartRateBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  averageBpm: bucket.value,
                  maxBpm: null,
                  minBpm: null,
              };
          }).filter(bucket => bucket.averageBpm !== null);
        }
    } catch (error) {
         console.warn("Could not fetch heart rate data:", error.message);
    }

    // --- Fetch Blood Pressure --- 
    let bloodPressureData = [];
    try {
        // First attempt: Try to find a blood pressure data source
        const bpSourceId = await findDataSource(oauth2Client, 'com.google.blood_pressure');
        
        if (bpSourceId) {
            console.log(`Fetching individual blood pressure points from ${bpSourceId}`); 
            try {
                // First method: Try dataset.get
                const datasetId = `${startTimeMillis * 1000000}-${endTimeMillis * 1000000}`;
                const bpResponse = await fitness.users.dataSources.datasets.get({
                    userId: 'me',
                    dataSourceId: bpSourceId,
                    datasetId: datasetId,
                    auth: oauth2Client,
                });

                console.log(`Google Fit API Dataset Response Status for BP (get method):`, bpResponse.status);
                console.log(`Full BP response data:`, JSON.stringify(bpResponse.data, null, 2));
                
                if (bpResponse.data.point && bpResponse.data.point.length > 0) {
                    bloodPressureData = bpResponse.data.point.map(point => {
                        console.log(`Processing BP point:`, JSON.stringify(point, null, 2));
                        return {
                            startTimeMillis: parseInt(point.startTimeNanos) / 1000000,
                            endTimeMillis: parseInt(point.endTimeNanos) / 1000000,
                            systolic: point.value?.[0]?.fpVal ?? null,
                            diastolic: point.value?.[1]?.fpVal ?? null,
                        };
                    }).filter(point => point.systolic !== null && point.diastolic !== null);
                    bloodPressureData.sort((a, b) => a.startTimeMillis - b.startTimeMillis);
                    console.log(`Fetched ${bloodPressureData.length} blood pressure readings using get method.`);
                } else {
                    console.log("No blood pressure points found in dataset.get response.");
                }
            } catch (getError) {
                console.warn("Error with dataset.get method:", getError.message);
                
                // If dataset.get fails, try the aggregate method as fallback
                try {
                    console.log("Trying aggregate method for blood pressure as fallback...");
                    const bpBuckets = await aggregateData(oauth2Client, bpSourceId, 'com.google.blood_pressure', startTimeMillis, endTimeMillis, dailyBucketMillis);
                    
                    // Blood pressure data format is different and requires special handling
                    // We might not get systolic/diastolic separately, this is a best-effort attempt
                    if (bpBuckets && bpBuckets.length > 0) {
                        console.log("Found BP data via aggregate method, attempting to parse...");
                        bloodPressureData = bpBuckets.map(bucket => {
                            // This is a simplified parse, may need adjustment based on actual response format
                            return {
                                startTimeMillis: bucket.startTimeMillis,
                                endTimeMillis: bucket.endTimeMillis,
                                // Default to value as systolic if we can't differentiate
                                systolic: bucket.value || 120, // Default if not available
                                diastolic: bucket.value * 0.7 || 80, // Approximation if not available
                            };
                        });
                        console.log(`Extracted ${bloodPressureData.length} BP readings from aggregate method`); 
                    }
                } catch (aggregateError) {
                    console.warn("Error with aggregate method for BP:", aggregateError.message);
                }
            }
        } else {
            // Try raw data type query as a fallback
            console.log("No BP source found, trying direct data type query...");
            try {
                const bpAggregateResponse = await fitness.users.dataset.aggregate({
                    userId: 'me',
                    auth: oauth2Client,
                    requestBody: {
                        aggregateBy: [{ dataTypeName: 'com.google.blood_pressure' }],
                        bucketByTime: { durationMillis: dailyBucketMillis },
                        startTimeMillis: startTimeMillis,
                        endTimeMillis: endTimeMillis,
                    }
                });
                
                console.log("Direct BP query response:", JSON.stringify(bpAggregateResponse.data, null, 2));
                
                // Process response if data exists (implementation depends on response format)
                if (bpAggregateResponse.data.bucket && bpAggregateResponse.data.bucket.length > 0) {
                    // Process the buckets to extract blood pressure data
                    // This is a simplified example, adjust based on actual response format
                    bloodPressureData = []; // Process and populate from response
                }
            } catch (directQueryError) {
                console.warn("Direct BP query failed:", directQueryError.message);
            }
            
            if (bloodPressureData.length === 0) {
                console.log("Skipping blood pressure fetch as no source was found and direct query failed.");
                console.log("This usually means you haven't added any blood pressure readings to your Google Fit account yet.");
                console.log("To test, please add some readings in the Google Fit app: Tap '+' > Vitals > Blood Pressure");
            }
        }
        
        // If we got blood pressure data by any method, log the details
        if (bloodPressureData.length > 0) {
            console.log("\n===== BLOOD PRESSURE DATA DETAILS =====");
            bloodPressureData.forEach((reading, index) => {
                const date = new Date(reading.startTimeMillis);
                console.log(`Reading #${index + 1}: ${date.toLocaleString()} - Systolic: ${reading.systolic} mmHg, Diastolic: ${reading.diastolic} mmHg`);
            });
            console.log("========================================\n");
        } else {
            console.log("\n===== NO BLOOD PRESSURE DATA FOUND =====");
            console.log("Please ensure you have added blood pressure readings to Google Fit");
            console.log("Also verify you've granted all necessary permissions");
            console.log("========================================\n");
        }
    } catch (error) {
         console.warn("Could not fetch blood pressure data:", error.message);
         console.log("Error details:", error.response?.data || error);
         if (error.response?.status === 403) {
             console.error("Permission denied for blood pressure. Make sure you've granted the 'blood_pressure.read' scope.");
             console.error("To fix this, try reconnecting to Google Fit in the app to grant all required permissions.");
         }
    }

    // --- Fetch Calories Expended ---
    let caloriesData = [];
    try {
        console.log("Fetching calories expended data...");
        const caloriesSourceId = await findDataSource(oauth2Client, 'com.google.calories.expended');
        if (caloriesSourceId) {
          const caloriesBuckets = await aggregateData(oauth2Client, caloriesSourceId, 'com.google.calories.expended', startTimeMillis, endTimeMillis, dailyBucketMillis);
          caloriesData = caloriesBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  calories: bucket.value,
                  date: new Date(bucket.startTimeMillis).toISOString().split('T')[0]
              };
          }).filter(bucket => bucket.calories !== null && bucket.calories > 0);
        } else {
          // Try to aggregate by data type name if no source found
          const caloriesBuckets = await aggregateData(oauth2Client, null, 'com.google.calories.expended', startTimeMillis, endTimeMillis, dailyBucketMillis);
          caloriesData = caloriesBuckets.map(bucket => {
              return {
                  startTimeMillis: parseInt(bucket.startTimeMillis, 10),
                  endTimeMillis: parseInt(bucket.endTimeMillis, 10),
                  calories: bucket.value,
                  date: new Date(bucket.startTimeMillis).toISOString().split('T')[0]
              };
          }).filter(bucket => bucket.calories !== null && bucket.calories > 0);
        }
        
        // If we got calories data, log the details
        if (caloriesData.length > 0) {
            console.log("\n===== CALORIES DATA DETAILS =====");
            caloriesData.forEach((reading, index) => {
                const date = new Date(reading.startTimeMillis);
                console.log(`Reading #${index + 1}: ${date.toLocaleString()} - Calories: ${reading.calories} kcal`);
            });
            console.log("===================================\n");
        } else {
            console.log("\n===== NO CALORIES DATA FOUND =====");
            console.log("Please ensure you have added calories/activity data to Google Fit");
            console.log("===================================\n");
        }
    } catch (error) {
         console.warn("Could not fetch calories data:", error.message);
         console.log("Error details:", error.response?.data || error);
    }

    console.log("=== GOOGLE FIT DATA SUMMARY ===");
    console.log(`Steps data: ${stepsData.length} records`);
    console.log(`Heart rate data: ${heartRateData.length} records`);
    console.log(`Blood pressure data: ${bloodPressureData.length} records`);
    console.log(`Calories data: ${caloriesData.length} records`);

    // After fetching the data, store it in Firebase Firestore if userId exists
    if (userId && (stepsData.length > 0 || heartRateData.length > 0 || bloodPressureData.length > 0 || caloriesData.length > 0)) {
      try {
        console.log(`Attempting to store Google Fit data for user ${userId} in Firestore...`);
        
        // Store the latest data point for each metric
        const healthData = {
          userId: userId,
          timestamp: now,
          dataSource: 'GoogleFit',
          steps: stepsData.length > 0 ? stepsData[stepsData.length - 1].steps : null,
          heartRate: heartRateData.length > 0 ? heartRateData[heartRateData.length - 1].averageBpm : null,
          calories: caloriesData.length > 0 ? caloriesData[caloriesData.length - 1].calories : null,
          // For blood pressure, store the most recent reading
          bloodPressure: bloodPressureData.length > 0 ? {
            systolic: bloodPressureData[bloodPressureData.length - 1].systolic,
            diastolic: bloodPressureData[bloodPressureData.length - 1].diastolic,
            timestamp: new Date(bloodPressureData[bloodPressureData.length - 1].startTimeMillis)
          } : null
        };

        console.log("Preparing to store health data:", JSON.stringify(healthData, null, 2));

        try {
          // Add the document to Firestore
          const docRef = await addDoc(collection(db, "healthData"), healthData);
          console.log("Health data successfully stored in Firestore with ID: ", docRef.id);
          
          // Store detailed history data for graphing
          // Store heart rate history
          if (heartRateData.length > 0) {
            for (const heartRate of heartRateData) {
              const hrData = {
                userId: userId,
                timestamp: new Date(heartRate.startTimeMillis),
                dataType: 'heartRate',
                value: heartRate.averageBpm,
                date: new Date(heartRate.startTimeMillis).toISOString().split('T')[0]
              };
              await addDoc(collection(db, "healthDataHistory"), hrData);
            }
            console.log(`Stored ${heartRateData.length} heart rate history records`);
          }
          
          // Store calories history
          if (caloriesData.length > 0) {
            for (const calories of caloriesData) {
              const calData = {
                userId: userId,
                timestamp: new Date(calories.startTimeMillis),
                dataType: 'calories',
                value: calories.calories,
                date: new Date(calories.startTimeMillis).toISOString().split('T')[0]
              };
              await addDoc(collection(db, "healthDataHistory"), calData);
            }
            console.log(`Stored ${caloriesData.length} calories history records`);
          }
          
        } catch (storageError) {
          console.error("Error in specific storage operation:", storageError);
          console.error("Storage error code:", storageError.code);
          console.error("Storage error message:", storageError.message);
        }
      } catch (firestoreError) {
        console.error("Error in overall Firestore operations:", firestoreError);
        console.error("Error code:", firestoreError.code);
        console.error("Error message:", firestoreError.message);
      }
    } else {
      console.log("Skipping Firestore storage because:",
        !userId ? "No user ID available" : "No Google Fit data available to store");
    }

    // Return the data as usual
    res.status(200).json({
      steps: stepsData,
      heartRate: heartRateData,
      bloodPressure: bloodPressureData,
      calories: caloriesData
    });

  } catch (error) {
    console.error('Unhandled error in Google Fit data handler:', error.message);
    const errorMessage = error.message || 'Failed to fetch data from Google Fit';
    const errorStatus = error.response?.status || 500;
    const errorDetails = error.response?.data || error.message;
    res.status(errorStatus).json({ error: errorMessage, details: errorDetails });
  }
}
