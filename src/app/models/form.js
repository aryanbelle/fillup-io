// import {Schema, model, models, Document, Mongoose, mongo} from 'mongoose';

import mongoose from "mongoose";

const CreatorFormModel = new mongoose.Schema({
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
});

export default mongoose.model.CreatorForm ||
  mongoose.model("CreatorForm", CreatorFormModel);

// interface Field {
//   question: string;
//   answer: any; // Adjust the type based on specific requirements if needed
// }
//
// interface Form extends Document {
//   title: string;
//   description: string;
//   fields: Field[];
// }
//
// const fieldSchema = new Schema<Field>({
//   question: { type: String, required: true },
//   answer: Schema.Types.Mixed, // Allows for various types of answers
// });
//
// const formSchema = new Schema<Form>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     fields: [fieldSchema],
//   },
//   { timestamps: true }
// );
//
// const FormModel = models.Form || model<Form>('Form', formSchema);

// export default FormModel;
