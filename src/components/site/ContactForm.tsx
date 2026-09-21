import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api, useBio } from "@/lib/api";

const icons = [MapPin, Phone, Mail];

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((val) => {
      const cleaned = val.replace(/\D/g, "");
      return /^[6-9]\d{9}$/.test(cleaned);
    }, "Enter a valid 10-digit phone number"),

  message: z.string().trim().optional(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { data: bio } = useBio();
  const contactInfo = bio.contactInfo || [];

  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setStatusMessage(null);

    try {
      const response = await api.sendContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message || "",
      });

      const message =
        response.message ||
        "Thank you for reaching out. Your message has been received.";

      setStatusMessage({
        type: "success",
        text: message,
      });
      toast.success(message);
      reset();
    } catch (error: any) {
      const errorMsg =
        error.message ||
        "Failed to send your message. Please try again or reach out directly.";
      setStatusMessage({
        type: "error",
        text: errorMsg,
      });
      toast.error(errorMsg);
    }
  };

  const phoneField = register("phone");

  return (
    <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
      <div>
        <h2 className="font-display text-3xl text-foreground">
          Contact details
        </h2>
        <div className="mt-8 space-y-6">
          {contactInfo.map((item, index) => {
            const Icon = icons[index] ?? Mail;
            return (
              <div key={item.label} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-foreground">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-5 rounded-md border border-border bg-card p-6 shadow-sm sm:grid-cols-2 sm:p-9"
        noValidate
      >
        {statusMessage ? (
          <div
            className={`flex items-start gap-3 rounded-md p-4 sm:col-span-2 text-sm ${
              statusMessage.type === "success"
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-destructive/10 text-destructive border border-destructive/20"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="size-5 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-medium">
                {statusMessage.type === "success"
                  ? "Message Sent"
                  : "Submission Failed"}
              </p>
              <p className="mt-0.5 text-xs opacity-90">{statusMessage.text}</p>
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            disabled={isSubmitting}
            placeholder="Your name"
            className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            disabled={isSubmitting}
            placeholder="you@example.com"
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            disabled={isSubmitting}
            placeholder="10-digit mobile number"
            className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
            maxLength={10}
            {...phoneField}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 10) value = value.slice(0, 10);
              e.target.value = value;
              phoneField.onChange(e);
            }}
          />
          {errors.phone ? (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            disabled={isSubmitting}
            placeholder="How may we connect? (optional)"
            className={`min-h-36 ${
              errors.message ? "border-destructive focus-visible:ring-destructive" : ""
            }`}
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:col-span-2 sm:justify-self-start"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending message...
            </>
          ) : (
            "Submit message"
          )}
        </Button>
      </form>
    </div>
  );
}