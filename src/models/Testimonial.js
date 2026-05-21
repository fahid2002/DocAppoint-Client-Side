import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name:   { type: String, required: true },
    city:   { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);