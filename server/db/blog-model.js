const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", Post);
