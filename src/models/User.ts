import { Schema, model } from "mongoose"

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ava: {
    type: String,
    required: true,
    default:
      "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  bio: { type: String, default: "" },
  birth: { type: Date, default: "" },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"],
  },
  date: { type: Date, required: true },
})

export default model("User", schema)
