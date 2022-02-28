import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface Visitor {
  uid: string;
  username: string;
  createTime: Date;
}

// 2. Create a Schema corresponding to the document interface.
let schema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    username: String,
    createTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: "createTime" } }
);

// 3. Create a Model.
const VisitorModel = model<Visitor>("Visitor", schema);
export default VisitorModel;
