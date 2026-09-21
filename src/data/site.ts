import type { LucideIcon } from "lucide-react";
import { BookOpen, Compass, Feather, Sparkles, Sprout, Star } from "lucide-react";

export const siteMeta = {
  name: "Poonamm B Oswal",
  title: "Poonam Oswal — Art, Words & Wisdom",
  tagline: "An Author, Social Worker, Actor, Dancer & Voice over Artist to nurture your skills.",
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Art", to: "/art" },
  { label: "Author", to: "/author" },
  { label: "Poet", to: "/poet" },
  { label: "Social Worker", to: "/social-worker" },
  { label: "Connect", to: "/connect" },
] as const;

export const hero = {
  eyebrow: "Poonam Oswal",
  tagline: "An Author, Social Worker, Actor, Dancer & Voice over Artist to nurture your skills.",
  title: "Inspiring Lives Through Art, Words & Wisdom.",
  quote:
    "I walk the path of creativity, compassion, and consciousness — hoping to inspire others to embrace their true potential.",
  attribution: "Poonam Oswal",
};

export const biography = [
  "Poonam Oswal is a distinguished educationist, administrator, poet, author, spiritual guide, and social contributor whose life reflects dedication, discipline, and devotion to nation-building. With an illustrious career in the Government of India and a deep commitment to cultural and spiritual values, she continues to inspire individuals across generations.",
  "Born on 6 June 1964, Poonam Oswal began her professional journey with the Department of Official Language under the Ministry of Home Affairs, Government of India. She served at the Central Hindi Training Institute, New Delhi, where she devoted over two decades to strengthening the implementation of the Official Language Policy of the Government of India.",
  "During her 24 years of service, she imparted Hindi software and Hindi word processing training to Central Government employees and officers, helping them adapt to technological advancements in official language usage.",
  "She served for 9 years as Assistant Director and 6 years as Deputy Director from March 2016 to March 2022. From March 2022 to June 2024, she served as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024.",
  "Beyond her distinguished government service, Poonam Oswal is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker. Through her writings, seminars, and public engagements, she promotes spiritual awareness, cultural values, women empowerment, and social harmony.",
];

export const stats = [
  { value: 24, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Personally Mentored" },
  { value: 1, suffix: "", label: "Certified Trainer", word: "Certified" },
];

export const career = {
  title: "Career Starts With — As Former Joint Director in Home Ministry, Govt. of India",
  body: "In addition to her academic and training responsibilities, she held key administrative positions across a 24-year career, culminating as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024. She monitored and supervised official language training programs and policy implementation, ensuring compliance and quality standards.",
};

export type Service = { title: string; description: string; icon: LucideIcon };
export const services: Service[] = [
  {
    title: "Mentoring",
    icon: Compass,
    description:
      "Poonam Oswal believes true mentoring transforms both mindset and direction. She guides individuals with compassion, clarity, and practical wisdom drawn from her diverse journey.",
  },
  {
    title: "Consulting",
    icon: Sprout,
    description:
      "With deep experience across creative, social, and personal development spaces, she offers insightful consulting rooted in strategy and intuition.",
  },
  {
    title: "Successful Careers",
    icon: BookOpen,
    description:
      "She inspires individuals to build careers driven by passion and purpose, emphasizing skill development, confidence building, and conscious decision-making.",
  },
  {
    title: "Authorship & Poetry",
    icon: Feather,
    description:
      "Guidance for aspiring writers and thinkers on finding their authentic voice and expressing it through heart-touching poetry and prose.",
  },
];

export const astroPlans = [
  {
    name: "Basic Plan",
    price: "₹1,500",
    description: "Introductory session focusing on core charts and foundational insights.",
    features: [
      "1-on-1 Personalized Session (30 mins)",
      "Birth Chart & Dasha Overview",
      "Remedial Guidance & Core Advice",
    ],
  },
  {
    name: "Premium Plan",
    price: "₹3,500",
    popular: true,
    description: "Deep dive consultation covering life path, career transitions, health, and relationship prospects.",
    features: [
      "Comprehensive Consultation (60 mins)",
      "In-depth Kundli & Planetary Transits Analysis",
      "Tailored Gemstone & Vedic Remedies",
      "Follow-up Query Assistance",
    ],
  },
];

export const books = [
  {
    title: "प्रकृति की गोद में",
    type: "Poetry & Short Stories",
    tone: "nature",
    amazonUrl: "https://www.amazon.in",
    description:
      "A soulful expression of harmony between human life and nature, encouraging readers to reconnect with the serenity and healing power of the natural world.",
  },
  {
    title: "जीवन के बहुरंग",
    type: "Poetry Collection",
    tone: "life",
    amazonUrl: "https://www.amazon.in",
    description:
      "A reflective collection exploring the many shades of life, emotions, relationships, and personal transformation, guiding readers toward positivity and deeper understanding.",
  },
  {
    title: "मेरी मां के खत",
    type: "Memoir",
    tone: "memoir",
    badge: "Coming Soon · Under Publication",
    description:
      "An intimate memoir shaped by memory, tenderness, and the enduring wisdom carried through a mother’s letters.",
  },
];

export const gallery = [
  { title: "Women’s Day", detail: "Celebrating strength and possibility", size: "tall" },
  { title: "Award Ceremonies", detail: "Honouring service and contribution", size: "wide" },
  { title: "Public Speaking", detail: "Sharing wisdom across generations", size: "standard" },
  { title: "Social Meets", detail: "Building compassionate communities", size: "tall" },
  { title: "Community Dialogue", detail: "Creating space for every voice", size: "standard" },
];

export const poetry = [
  { text: "Where thought becomes a quiet prayer, words begin to bloom.", label: "On consciousness" },
  { text: "Life reveals its colours to those who meet each season with grace.", label: "On life" },
  { text: "In nature’s patient rhythm, the heart remembers its way home.", label: "On nature" },
];

export const socialIntro =
  "Through public engagements, spiritual mentorship, and social initiatives, Poonam Oswal promotes women empowerment, cultural values, and conscious living across communities.";

export const contactInfo = [
  {
    label: "Address",
    value: "A-83, Flat No. 204, Street No. 15, Madhu Vihar, I.P. Extension, New Delhi-110092",
  },
  { label: "Mobile", value: "+91 97187 50379" },
  { label: "Email", value: "poonamboswal@gmail.com" },
];