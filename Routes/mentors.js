import express from "express";
import { Mentor } from "../Models/mentors.js";
import { Student } from "../models/student.js";
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const mentors = await Mentor.find({});
    if (!mentors) return res.status(400).json("No data found");
    res.status(200).json({ data: mentors });
  } catch (error) {
    console.log(error);
    res.send(200).json("Internal Server Error");
  }
});

router.post("/addmentor", async (req, res) => {
  try {
    const mentor = new Mentor({
      mentor: req.body.mentor,
    });
    const newMentor = await mentor.save();
    if (!newMentor) return res.status(400).json("Failed to upload");
    res.status(200).json({ message: "Added Successfully", data: newMentor });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});
router.get("/nomentor", async (req, res) => {
  try {
    const students = await Student.find({ mentor: "" });
    res.status(200).json({ data: students });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});
router.put("/assignmentor", async (req, res) => {
  try {
    const students = await Student.find({ mentor: "" });
    const toUpdate = [...req.body.students];
    // const mentor = await Mentor.findOneAndUpdate({
    //   mentor: req.body.mentor,
    //   $push: {
    //     students: req.body.students,
    //   },
    // });
    const studentUpdation = async () => {
      for (let idx = 0; idx < toUpdate.length; idx++) {
        const stud = toUpdate[idx];

        // Update Mentor
        await Mentor.findOneAndUpdate(
          { mentor: req.body.mentor },
          {
            $push: {
              students: stud,
            },
          }
        );

        // Update Student
        await Student.findOneAndUpdate(
          { studentName: stud },
          {
            $set: { mentor: req.body.mentor },
          }
        );
      }
    };

    studentUpdation();
    if (!studentUpdation) res.status(400).json("Failed to update");
    res.status(200).json({
      message: "Successfully assigned mentor",

      studentdata: studentUpdation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/mentorstulist", async (req, res) => {
  try {
    const mentor = await Mentor.aggregate([
      {
        $lookup: {
          from: "students",
          localField: "mentor",
          foreignField: "mentor",
          as: "Mentor Stu List",
        },
      },
    ]);
    if (!mentor) return res.status(400).json("Failed to retrieve");
    res.status(200).json({ data: mentor });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

export const mentorRouter = router;
