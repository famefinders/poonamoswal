import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import Bio from "./models/Bio.js";
import Book from "./models/Book.js";
import GalleryImage from "./models/GalleryImage.js";
import Service from "./models/Service.js";
import Testimonial from "./models/Testimonial.js";

dotenv.config();

const initialBio = {
  hero: {
    eyebrow: "Wisdom, Words & Well-Being",
    title: "Inspiring Lives Through Art, Words & Wisdom.",
    quote:
      "I walk the path of creativity, compassion, and consciousness — hoping to inspire others to embrace their true potential.",
    attribution: "Poonam Oswal",
  },
  biography: [
    "Poonam Oswal is a distinguished educationist, administrator, poet, author, spiritual guide, and social contributor whose life reflects dedication, discipline, and devotion to nation-building. With an illustrious career in the Government of India and a deep commitment to cultural and spiritual values, she continues to inspire individuals across generations.",
    "Born on 6 June 1964, Poonam Oswal began her professional journey with the Department of Official Language under the Ministry of Home Affairs, Government of India. She served at the Central Hindi Training Institute, New Delhi, where she devoted over two decades to strengthening the implementation of the Official Language Policy of the Government of India.",
    "During her 24 years of service, she imparted Hindi software and Hindi word processing training to Central Government employees and officers, helping them adapt to technological advancements in official language usage.",
    "She served for 9 years as Assistant Director and 6 years as Deputy Director from March 2016 to March 2022. From March 2022 to June 2024, she served as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024.",
    "Beyond her distinguished government service, Poonam Oswal is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker. Through her writings, seminars, and public engagements, she promotes spiritual awareness, cultural values, women empowerment, and social harmony.",
  ],
  stats: [
    { value: 24, suffix: "+", label: "Years Experience" },
    { value: 500, suffix: "+", label: "Personally Mentored" },
    { value: 1, suffix: "", label: "Certified Trainer", word: "Certified" },
  ],
  career: {
    title:
      "Career Starts With — As Former Joint Director in Home Ministry, Govt. of India",
    body: "In addition to her academic and training responsibilities, she held key administrative positions across a 24-year career, culminating as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024. She monitored and supervised official language training programs and policy implementation, ensuring compliance and quality standards.",
  },
  socialIntro:
    "Through public engagements and social initiatives, Poonam Oswal promotes women empowerment, cultural values, and social harmony across communities.",
  poetry: [
    {
      text: "Where thought becomes a quiet prayer, words begin to bloom.",
      label: "On consciousness",
    },
    {
      text: "Life reveals its colours to those who meet each season with grace.",
      label: "On life",
    },
    {
      text: "In nature’s patient rhythm, the heart remembers its way home.",
      label: "On nature",
    },
  ],
  contactInfo: [
    {
      label: "Address",
      value:
        "A-83, Flat No. 204, Street No. 15, Madhu Vihar, I.P. Extension, New Delhi-110092",
    },
    { label: "Mobile", value: "+91 97187 50379" },
    { label: "Email", value: "Email: Contact via form" },
  ],
  isActive: true,

};

const initialBooks = [
  {
    title: "प्रकृति की गोद में",
    type: "Poetry & short stories",
    tone: "nature",
    badge: "",
    description:
      "A soulful expression of harmony between human life and nature, encouraging readers to reconnect with the serenity and healing power of the natural world.",
    order: 1,
  },
  {
    title: "जीवन के बहुरंग",
    type: "Poetry collection",
    tone: "life",
    badge: "",
    description:
      "A reflective collection exploring the many shades of life, emotions, relationships, and personal transformation, guiding readers toward positivity and deeper understanding.",
    order: 2,
  },
  {
    title: "मेरी मां के खत",
    type: "Memoir",
    tone: "memoir",
    badge: "Coming Soon · Under Publication",
    description:
      "An intimate memoir shaped by memory, tenderness, and the enduring wisdom carried through a mother’s letters.",
    order: 3,
  },
];

const initialGallery = [
  {
    title: "Women’s Day",
    detail: "Celebrating strength and possibility",
    size: "tall",
    order: 1,
  },
  {
    title: "Award Ceremonies",
    detail: "Honouring service and contribution",
    size: "wide",
    order: 2,
  },
  {
    title: "Public Speaking",
    detail: "Sharing wisdom across generations",
    size: "standard",
    order: 3,
  },
  {
    title: "Social Meets",
    detail: "Building compassionate communities",
    size: "tall",
    order: 4,
  },
  {
    title: "Community Dialogue",
    detail: "Creating space for every voice",
    size: "standard",
    order: 5,
  },
];

const initialServices = [
  {
    title: "Mentoring",
    icon: "Compass",
    description:
      "Poonam Oswal believes true mentoring transforms both mindset and direction. She guides individuals with compassion, clarity, and practical wisdom drawn from her diverse journey.",
    order: 1,
  },
  {
    title: "Consulting",
    icon: "Sprout",
    description:
      "With deep experience across creative, social, and personal development spaces, she offers insightful consulting rooted in strategy and intuition.",
    order: 2,
  },
  {
    title: "Successful Careers",
    icon: "BookOpen",
    description:
      "She inspires individuals to build careers driven by passion and purpose, emphasizing skill development, confidence building, and conscious decision-making.",
    order: 3,
  },
  {
    title: "Authorship",
    icon: "Feather",
    description:
      "Guidance for aspiring writers on finding their voice and expressing it through poetry and prose.",
    order: 4,
  },
];

const initialTestimonials = [
  {
    name: "Dr. Ananya Sharma",
    role: "Civil Servant & Mentee",
    company: "Ministry of Home Affairs",
    quote:
      "Poonam ma'am has been a guiding light in my administrative career. Her mentoring provided clarity during my most challenging transitions.",
    rating: 5,
    order: 1,
    featured: true,
  },
  {
    name: "Rajesh K. Verma",
    role: "Reader & Literary Critic",
    company: "Sahitya Varta",
    quote:
      "Her poetry in 'प्रकृति की गोद में' resonates deeply with anyone seeking solace and connection with nature in today's fast world.",
    rating: 5,
    order: 2,
    featured: true,
  },
  {
    name: "Sunita Deshmukh",
    role: "Community Leader",
    company: "Nari Shakti Forum",
    quote:
      "Working alongside Poonam Oswal on women empowerment seminars showed me what compassionate leadership truly looks like.",
    rating: 5,
    order: 3,
    featured: true,
  },
];

const seedDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ Error: MONGO_URI is not defined in your environment variables.");
      process.exit(1);
    }

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB.");

    // Clear existing collections
    console.log("🧹 Clearing existing data...");
    await Admin.deleteMany();
    await Bio.deleteMany();
    await Book.deleteMany();
    await GalleryImage.deleteMany();
    await Service.deleteMany();
    await Testimonial.deleteMany();

    // 1. Seed Admin
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@poonamoswal.com";
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
    console.log(`👤 Creating default admin (${adminEmail})...`);
    await Admin.create({
      name: "Poonam Oswal Admin",
      email: adminEmail,
      password: adminPassword,
    });

    // 2. Seed Bio
    console.log("📝 Seeding Bio data...");
    await Bio.create(initialBio);

    // 3. Seed Books
    console.log("📚 Seeding Books...");
    await Book.insertMany(initialBooks);

    // 4. Seed Gallery
    console.log("🖼️ Seeding Gallery items...");
    await GalleryImage.insertMany(initialGallery);

    // 5. Seed Services
    console.log("💼 Seeding Services...");
    await Service.insertMany(initialServices);

    // 6. Seed Testimonials
    console.log("💬 Seeding Testimonials...");
    await Testimonial.insertMany(initialTestimonials);

    console.log("🎉 Database successfully seeded with initial content!");
    console.log(`🔑 Admin credentials: ${adminEmail} / ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

