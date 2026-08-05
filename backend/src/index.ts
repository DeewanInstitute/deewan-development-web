import "dotenv/config";
import cors from "cors";
import express from "express";
import contactRouter from "./routes/contact.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
const allowedOrigins = (process.env.FRONTEND_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/contact", contactRouter);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
