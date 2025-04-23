// API route for fetching news about diabetes
export default async function handler(req, res) {
  try {
    // Using the same API key but making the request server-side
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=diabetes&apiKey=272537c253ce4bb3b56199385a550c90"
    );

    if (!response.ok) {
      throw new Error(`News API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.articles?.slice(0, 5) || [];
    
    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error fetching news in API route:", error);
    res.status(500).json({ 
      error: "Failed to fetch news", 
      message: error.message 
    });
  }
}