import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query; // You can customize this query to filter exercises, e.g., "diabetic friendly"
  const apiKey = 'sC0hmU/g5CQL7aLvs8fpvA==HVS1iuWWp1i5uj1Z';
  const url = `https://api.api-ninjas.com/v1/exercises?${query}`;

  try {
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': apiKey }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercise data' });
  }
}
