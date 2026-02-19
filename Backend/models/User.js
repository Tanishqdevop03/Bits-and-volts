import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    location: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);