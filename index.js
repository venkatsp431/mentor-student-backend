import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { mentorRouter } from "./Routes/mentors.js";
import { studentRouter } from "./Routes/student.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
dbConnection();

app.use("/api/mentor", mentorRouter);
app.use("/api/student", studentRouter);

app.listen(7070, () => console.log("Server runnning in localhost:7070"));

app.get("/", (req, res) => {
  res.send("working good");
});
