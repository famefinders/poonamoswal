import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, ImageIcon, Mail, Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Poonamm B Oswal" },
      {
        name: "description",
        content: "Get in touch with Poonam Oswal for mentoring, consulting, books, or social initiatives.",
      },
    ],
  }),
  component: ConnectPage,
});

const COMPANY_WEB3FORMS_KEY = "adf390a3-57ba-4401-927b-d57870bdae5d";

function ConnectPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const firstName = (formData.get("first_name") as string) || "";
    const lastName = (formData.get("last_name") as string) || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const email = (formData.get("email") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";

    try {
      await Promise.allSettled([
        // 1. Send live email alert via Web3Forms (JSON Payload)
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: COMPANY_WEB3FORMS_KEY,
            name: fullName,
            email: email,
            subject: subject || "New Contact Message - poonamoswal.com",
            message: message || "No message body provided.",
            from_name: "Poonam Oswal Website",
          }),
        }),
        // 2. Save directly into MongoDB Atlas via Express Backend
        fetch("https://poonamoswal-api.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            subject,
            message,
          }),
        }),
      ]);

      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = (formData.get("newsletter_email") as string) || "";

    try {
      await Promise.allSettled([
        // Web3Forms alert to company email
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: COMPANY_WEB3FORMS_KEY,
            name: "Newsletter Subscriber",
            email: email,
            subject: "New Newsletter Subscriber - poonamoswal.com",
            message: `New subscriber signed up with email: ${email}`,
            from_name: "Poonam Oswal Newsletter",
          }),
        }),
        // DB save
        fetch("https://poonamoswal-api.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Newsletter Subscriber",
            email: email,
            subject: "Newsletter Subscription",
            message: "Subscribed via website newsletter banner.",
          }),
        }),
      ]);
    } catch (err) {
      console.error("Newsletter submission error:", err);
    }

    setNewsletterSubscribed(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* 1. TOP COMPACT BANNER */}
      <section className="bg-background px-6 pb-6 pt-32 sm:px-10 sm:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl border border-border/70 bg-[#faf6f0] shadow-sm flex items-center justify-center">
            <img
              src="/connect-1.jpg"
              alt="Connect Banner"
              className="size-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-6 text-center text-muted-foreground/60 bg-gradient-to-b from-amber-50/40 to-orange-100/30">
              <ImageIcon className="size-10 mb-2 opacity-50 text-[#c2410c]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-foreground/70">
                Connect Banner
              </span>
              <span className="text-xs mt-1 text-muted-foreground">
                <code>public/connect-1.jpg</code>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GET IN TOUCH WITH US (Form + Map) */}
      <section className="border-t border-border/60 bg-[#fdfbf7] px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Get In Touch With Us
            </h1>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 items-start">
            {/* Left: Contact Form */}
            <div className="rounded-3xl border border-border/70 bg-card p-8 sm:p-12 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl mb-8">
                Simple Contact Form
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-green-50/90 border border-green-200 p-8 text-center text-green-900 animate-in fade-in zoom-in-95 duration-300">
                  <CheckCircle className="size-12 text-green-600 mb-3" />
                  <h3 className="font-display text-2xl font-bold">Message Sent Successfully!</h3>
                  <p className="mt-2 text-sm text-green-700 max-w-md">
                    Thank you for reaching out. We have received your query and Poonam Oswal's team will connect with you shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 border-green-300 bg-white hover:bg-green-100 text-green-800"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground/80">First Name *</label>
                      <Input name="first_name" required placeholder="First name here" className="rounded-xl border-border/80 bg-background" />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground/80">Last Name</label>
                      <Input name="last_name" placeholder="Last name here (optional)" className="rounded-xl border-border/80 bg-background" />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground/80">Email Address *</label>
                      <Input name="email" required type="email" placeholder="Add email" className="rounded-xl border-border/80 bg-background" />
                    </div>
                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-foreground/80">Subject *</label>
                      <Input name="subject" required placeholder="How can we help you?" className="rounded-xl border-border/80 bg-background" />
                    </div>
                  </div>

                  {/* Comments / Questions */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-foreground/80">Comments / Questions</label>
                    <Textarea name="message" rows={4} placeholder="Comments (optional)" className="rounded-xl border-border/80 bg-background resize-none" />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={loading}
                      className="rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-5 text-sm font-semibold shadow-md transition-transform hover:scale-[1.02] disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 size-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Google Map Container */}
            <div className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm h-[480px]">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.215582963162!2d77.30058727632669!3d28.623306975670005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4cce2ee16d1%3A0xe960bf7e0d37e6b0!2sMadhu%20Vihar%2C%20I.P.Extension%2C%20Patparganj%2C%20Delhi%2C%20110092!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="size-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE CONTACT INFO CARDS */}
      <section className="bg-background px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Office */}
            <div className="flex flex-col rounded-3xl border border-border/70 bg-card p-10 shadow-sm transition-all hover:shadow-md">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#9333ea] text-white shadow-md">
                <Building2 className="size-8" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-foreground">
                Our Office
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                204, A-83 S/F, Gali No. 15, Madhu Vihar, Patparganj, East Delhi
              </p>
            </div>

            {/* Card 2: Phone */}
            <div className="flex flex-col rounded-3xl border border-border/70 bg-card p-10 shadow-sm transition-all hover:shadow-md">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#f97316] text-white shadow-md">
                <Phone className="size-8" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-foreground">
                Our Phone
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <a href="tel:+918743969027" className="hover:text-foreground hover:underline">
                  +91 87439 69027
                </a>
              </p>
            </div>

            {/* Card 3: Email */}
            <div className="flex flex-col rounded-3xl border border-border/70 bg-card p-10 shadow-sm transition-all hover:shadow-md">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#7c3aed] text-white shadow-md">
                <Mail className="size-8" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-bold text-foreground">
                Our Email
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <a href="mailto:info@poonamoswal.com" className="hover:text-foreground hover:underline">
                  info@poonamoswal.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER SECTION */}
      <section className="border-t border-border/60 bg-[#faf8f5] px-6 py-24 text-center sm:px-10 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto size-4 rounded-full bg-amber-400 mb-6" />
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Subscribe Our Newsletter
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Stay connected for inspiring writings, upcoming books, literary events, and spiritual reflections.
          </p>

          {newsletterSubscribed ? (
            <div className="mt-8 rounded-full bg-green-100 px-6 py-4 text-sm font-semibold text-green-800">
              Thank you for subscribing to Poonam Oswal&apos;s newsletter!
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <input
                required
                type="email"
                name="newsletter_email"
                placeholder="Your Email Address"
                className="w-full max-w-md rounded-full border border-border/80 bg-background px-6 py-4 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-6 text-sm font-semibold uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                Subscribe <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}