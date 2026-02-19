import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userroutes.js';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://bits-and-volts-seven.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use("/public", express.static("public"));

app.use("/api/users", userRoutes);

export default app;

