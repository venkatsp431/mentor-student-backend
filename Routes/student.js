import express from "express";
import { Student } from "../models/student.js";
import mongoose from "mongoose";
import { Mentor } from "../Models/mentors.js";
const { ObjectId } = mongoose.Types;
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) return res.status(400).json("No data Found");
    res.status(200).json({ data: students });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/add", async (req, res) => {
  try {
    const student = new Student({
      studentName: req.body.studentName,
      mentor: req.body.mentor || "",
    });
    const newStudent = await student.save();
    if (!newStudent) return res.status(400).json("Failed to add new student");
    res.status(200).json({ data: newStudent });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.put("/changementor", async (req, res) => {
  try {
    const student1 = await Student.find({ _id: new ObjectId(req.body.id) });
    console.log(student1);
    const student = await Student.findOneAndUpdate(
      { _id: new ObjectId(req.body.id) },
      {
        $set: {
          prevMentor: student1[0].mentor,
          mentor: req.body.mentor,
        },
      }
    );
    const mentor = await Mentor.findOneAndUpdate(
      { mentor: student1[0].mentor },
      {
        $pull: {
          students: student1[0].studentName,
        },
      }
    );
    if (!student) return res.status(400).json("Failed to update");
    if (!mentor) return res.status(400).json("Failed to update");
    res
      .status(200)
      .json({ message: "Successfully updated", data: student, data1: mentor });
  } catch (error) {
    console.log(error);
    res.status(200).json("Internal Server Error");
  }
});

router.get("/previousmentor", async (req, res) => {
  try {
    const prevMentor = await Student.find({ _id: new ObjectId(req.body.id) });
    if (!prevMentor) return res.status(400).json("Failed to update Mentor");
    res.status(200).json({ data: prevMentor[0].prevMentor });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

export const studentRouter = router;
