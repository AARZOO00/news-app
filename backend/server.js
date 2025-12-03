import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=9995debcd74f4d9c88ea102e74a3809e"
    );
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
