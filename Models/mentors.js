import mongoose from "mongoose";
const { objectId } = mongoose.Schema;

const mentorSchema = new mongoose.Schema({
  mentor: {
    type: String,
  },
  students: {
    type: Array,
  },
});

const Mentor = mongoose.model("mentors", mentorSchema);
export { Mentor };
