// figma-mcp-server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001; // Changed from 3000 to avoid conflict with Next.js

const FIGMA_TOKEN = "figd_kHssni5hHrjQ8evsJMf4M2_5I2k_kM6T_J-suHAR";

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Figma MCP Server" });
});

// Get Figma file
app.post("/figma/file", async (req, res) => {
  try {
    const { fileKey } = req.body;
    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}`,
      {
        headers: { "X-Figma-Token": FIGMA_TOKEN },
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Figma file nodes
app.post("/figma/nodes", async (req, res) => {
  try {
    const { fileKey, nodeIds } = req.body;
    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeIds.join(",")}`,
      { headers: { "X-Figma-Token": FIGMA_TOKEN } },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file images/exports
app.post("/figma/images", async (req, res) => {
  try {
    const { fileKey, nodeIds, format = "png", scale = 1 } = req.body;
    const response = await axios.get(
      `https://api.figma.com/v1/images/${fileKey}?ids=${nodeIds.join(",")}&format=${format}&scale=${scale}`,
      { headers: { "X-Figma-Token": FIGMA_TOKEN } },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get file styles
app.post("/figma/styles", async (req, res) => {
  try {
    const { fileKey } = req.body;
    const response = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/styles`,
      {
        headers: { "X-Figma-Token": FIGMA_TOKEN },
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Figma MCP Server running on http://localhost:${PORT}`);
  console.log(`✅ Figma token configured`);
});
