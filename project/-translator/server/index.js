import "dotenv/config";
import express from "express";
import cors from "cors";
import translateRouter from "./routes/translate.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "translation-api" });
});

app.use("/api/translate", translateRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Translation server running on http://localhost:${PORT}`);
});
