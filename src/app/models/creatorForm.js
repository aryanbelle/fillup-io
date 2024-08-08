import mongoose, { Mongoose } from "mongoose";

const CreatorFormModel = new mongoose.Schema(
  {
    isAcceptingResponses: {
      type: Boolean,
      default: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: {
          type: String,
          required: true,
        },
        isRequired: {
          type: Boolean,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    responses: [
      {
        userFormResponseId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userName: {
          type: String,
          unique: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CreatorForm ||
  mongoose.model("CreatorForm", CreatorFormModel);
