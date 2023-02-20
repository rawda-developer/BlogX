import "dotenv/config";
import express, { Express, Request, Response } from "express";
import userRoutes from "./routes/users.route";
import authRoutes from "./routes/auth.route";
const app: Express = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "BlogX backend" });
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(4000, () => console.log("Listening on port 4000!!"));
export default app;
