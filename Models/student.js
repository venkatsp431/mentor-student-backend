import mongoose from "mongoose";
// const { objectId } = mongoose.Schema;
const { Types } = mongoose;
const studentSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  studentName: {
    type: String,
  },

  mentor: {
    type: String,
  },
  prevMentor: {
    type: String,
  },
});

const Student = mongoose.model("students", studentSchema);
export { Student };
