# Poonam Oswal Website — Backend API

Node.js + Express + MongoDB (Mongoose) backend for Poonam Oswal's official website.

## Requirements

- Node.js (v18+)
- MongoDB Atlas or local MongoDB instance

## Setup Instructions

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your MongoDB connection URI and JWT secret:
   ```bash
   cp .env.example .env
   ```
   Example `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/poonam_oswal?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ADMIN_DEFAULT_EMAIL=admin@poonamoswal.com
   ADMIN_DEFAULT_PASSWORD=admin123
   ```

4. **Seed Initial Database Content**:
   Once your `MONGO_URI` is configured in `.env`, populate the database with initial content matching the frontend:
   ```bash
   npm run seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

6. **Start Production Server**:
   ```bash
   npm start
   ```

---

## API Endpoints

### Public Endpoints

- `GET /` — API info & endpoint directory
- `GET /api/health` — Health check
- `GET /api/bio` — Get active bio, hero, stats, and career information
- `GET /api/books` — Get all books
- `GET /api/books/:id` — Get single book
- `GET /api/gallery` — Get all gallery images
- `GET /api/gallery/:id` — Get single gallery image
- `GET /api/services` — Get all services
- `GET /api/services/:id` — Get single service
- `GET /api/testimonials` — Get all testimonials
- `GET /api/testimonials/:id` — Get single testimonial
- `POST /api/contact` — Submit a contact inquiry
  - Body: `{ "name": "...", "email": "...", "phone": "...", "message": "..." }`
- `POST /api/admin/login` — Admin login returning a JWT
  - Body: `{ "email": "...", "password": "..." }`

### Protected Endpoints (Requires `Authorization: Bearer <token>`)

- `GET /api/admin/me` — Current logged-in admin details
- `POST /api/bio` — Create bio profile
- `PUT /api/bio` or `PUT /api/bio/:id` — Update bio profile
- `DELETE /api/bio/:id` — Delete bio profile
- `POST /api/books` — Create a book
- `PUT /api/books/:id` — Update a book
- `DELETE /api/books/:id` — Delete a book
- `POST /api/gallery` — Create gallery image
- `PUT /api/gallery/:id` — Update gallery image
- `DELETE /api/gallery/:id` — Delete gallery image
- `POST /api/services` — Create service
- `PUT /api/services/:id` — Update service
- `DELETE /api/services/:id` — Delete service
- `POST /api/testimonials` — Create testimonial
- `PUT /api/testimonials/:id` — Update testimonial
- `DELETE /api/testimonials/:id` — Delete testimonial
- `GET /api/contact` — View received contact inquiries
- `PATCH /api/contact/:id/read` — Mark inquiry as read
- `DELETE /api/contact/:id` — Delete contact inquiry

