# Poonam Oswal's Legacy

Build a personal brand website for Poonam Oswal — a retired government official, published poet, author, and social worker. The site should feel warm, elegant, and professional — soft cream/beige/pink tones, elegant serif headings for a literary feel, clean sans-serif body text. Fully responsive.

PAGES / SECTIONS:

1. NAVIGATION (sticky header)

Logo text: "Poonam Oswal"

Menu: About | Author | Poet | Social Worker | Connect

2. HERO SECTION

Heading: "Inspiring Lives Through Art, Words & Wisdom."

Subtext: "Wisdom, Words & Well-Being"

Quote (styled prominently): "I walk the path of creativity, compassion, and consciousness — hoping to inspire others to embrace their true potential." — Poonam Oswal

Include a placeholder for her portrait photo (warm, professional saree portrait style).

Include a YouTube video embed placeholder.

3. ABOUT SECTION

Use this real bio content (do not use placeholder/lorem ipsum text):

"Poonam Oswal is a distinguished educationist, administrator, poet, author, spiritual guide, and social contributor whose life reflects dedication, discipline, and devotion to nation-building. With an illustrious career in the Government of India and a deep commitment to cultural and spiritual values, she continues to inspire individuals across generations.

Born on 6 June 1964, Poonam Oswal began her professional journey with the Department of Official Language under the Ministry of Home Affairs, Government of India. She served at the Central Hindi Training Institute, New Delhi, where she devoted over two decades to strengthening the implementation of the Official Language Policy of the Government of India.

During her 24 years of service, she imparted Hindi software and Hindi word processing training to Central Government employees and officers, helping them adapt to technological advancements in official language usage.

She served for 9 years as Assistant Director and 6 years as Deputy Director from March 2016 to March 2022. From March 2022 to June 2024, she served as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024.

Beyond her distinguished government service, Poonam Oswal is presently active as a poet, author, spiritual leader, social worker, influencer, and motivational speaker. Through her writings, seminars, and public engagements, she promotes spiritual awareness, cultural values, women empowerment, and social harmony."

Add 3 stat counters: "24+ Years Experience", "500+ Personally Mentored", "Certified Trainer" (use elegant animated counters).

4. CAREER HIGHLIGHT SECTION

Title: "Career Starts With — As Former Joint Director in Home Ministry, Govt. of India"

Content: "In addition to her academic and training responsibilities, she held key administrative positions across a 24-year career, culminating as Joint Director (Director Grade – Pay Level 13) before retiring in June 2024. She monitored and supervised official language training programs and policy implementation, ensuring compliance and quality standards."

5. SERVICES SECTION — "We Can Help Change Your Life"

Four service cards with icons:

- Mentoring: "Poonam Oswal believes true mentoring transforms both mindset and direction. She guides individuals with compassion, clarity, and practical wisdom drawn from her diverse journey."

- Consulting: "With deep experience across creative, social, and personal development spaces, she offers insightful consulting rooted in strategy and intuition."

- Successful Careers: "She inspires individuals to build careers driven by passion and purpose, emphasizing skill development, confidence building, and conscious decision-making."

- Authorship: "Guidance for aspiring writers on finding their voice and expressing it through poetry and prose."

6. AUTHOR / BOOKS SECTION

Title: "As Author — Poonam Oswal Books"

Show 3 book cards (image placeholder, title, description):

- 'प्रकृति की गोद में' — Poetry and short story collection. "A soulful expression of harmony between human life and nature, encouraging readers to reconnect with the serenity and healing power of the natural world."

- 'जीवन के बहुरंग' — Poetry collection. "A reflective collection exploring the many shades of life, emotions, relationships, and personal transformation, guiding readers toward positivity and deeper understanding."

- 'मेरी मां के खत' — Memoir (Coming Soon / Under Publication badge).

7. SOCIAL WORKER / GALLERY SECTION

A photo gallery grid (masonry style) with placeholders for event photos — Women's Day events, award ceremonies, public speaking engagements, social meets. Include a short intro: "Through public engagements and social initiatives, Poonam Oswal promotes women empowerment, cultural values, and social harmony across communities."

8. POET SECTION

A section highlighting her identity as a poet — quote-style excerpts, elegant typography, background texture (nature/ink themed).

9. CONNECT / CONTACT SECTION

Contact form with fields: Name, Email, Phone, Message, Submit button (no backend logic yet, just the UI and a form state handler I'll wire up later).

Also show contact info style layout (address, mobile — use placeholder icons, no real numbers).

10. FOOTER

Logo, menu links repeated, social media icons (Instagram, YouTube, Facebook), "All rights reserved © Poonam Oswal"

TECHNICAL REQUIREMENTS:

- Use plain React (no backend-as-a-service integrations like Supabase)

- Use React Router for page navigation (separate routes: /, /about, /author, /poet, /social-worker, /connect)

- Keep all text content in separate data files/constants (e.g., booksData.js, servicesData.js, bioData.js) rather than hardcoding directly in JSX, so it's easy to later connect to an API

- Contact form should have local state management with a placeholder submit handler (console.log for now)

- Fully responsive, mobile-first design

- Smooth scroll animations on section entry (fade-in/slide-up) are welcome

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/04754d80-1c26-47c0-bdde-e4dce076cbe4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
