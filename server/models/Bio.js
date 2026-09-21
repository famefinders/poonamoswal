import mongoose from "mongoose";

const statItemSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    suffix: { type: String, default: "" },
    label: { type: String, required: true },
    word: { type: String },
  },
  { _id: false }
);

const poetryItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const contactInfoItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const bioSchema = new mongoose.Schema(
  {
    hero: {
      eyebrow: { type: String, default: "Wisdom, Words & Well-Being" },
      title: {
        type: String,
        default: "Inspiring Lives Through Art, Words & Wisdom.",
      },
      quote: {
        type: String,
        default:
          "I walk the path of creativity, compassion, and consciousness — hoping to inspire others to embrace their true potential.",
      },
      attribution: { type: String, default: "Poonam Oswal" },
    },
    biography: {
      type: [String],
      default: [],
    },
    stats: {
      type: [statItemSchema],
      default: [],
    },
    career: {
      title: {
        type: String,
        default:
          "Career Starts With — As Former Joint Director in Home Ministry, Govt. of India",
      },
      body: { type: String, default: "" },
    },
    socialIntro: {
      type: String,
      default:
        "Through public engagements and social initiatives, Poonam Oswal promotes women empowerment, cultural values, and social harmony across communities.",
    },
    poetry: {
      type: [poetryItemSchema],
      default: [],
    },
    contactInfo: {
      type: [contactInfoItemSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bio = mongoose.model("Bio", bioSchema);
export default Bio;

