import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Check,
  Compass,
  ExternalLink,
  Image as ImageIcon,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Quote,
  RefreshCw,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  api,
  clearAdminToken,
  isAdminLoggedIn,
  useBio,
  useBooks,
  useGallery,
  useServices,
  useTestimonials,
  type BookData,
  type ContactMessageData,
  type GalleryItemData,
  type ServiceData,
  type TestimonialData,
} from "@/lib/api";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Poonam Oswal" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Auth gate
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminToken();
    toast.success("Logged out successfully");
    navigate({ to: "/admin/login" });
  };

  // Queries
  const { data: bioData, isLoading: bioLoading } = useBio();
  const { data: books, isLoading: booksLoading } = useBooks();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: galleryItems, isLoading: galleryLoading } = useGallery();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  // Contact Messages State
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const data = await api.getContactMessages();
      setMessages(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load messages");
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchMessages();
    }
  }, [authorized]);

  // ================= 1. BIO STATE & HANDLERS =================
  const [bioForm, setBioForm] = useState({
    heroTitle: "",
    heroEyebrow: "",
    heroQuote: "",
    heroAttribution: "",
    biographyText: "",
    careerTitle: "",
    careerBody: "",
    socialIntro: "",
    address: "",
    mobile: "",
    email: "",
  });

  useEffect(() => {
    if (bioData) {
      const addr =
        bioData.contactInfo?.find((c) => c.label.toLowerCase().includes("address"))
          ?.value || "";
      const mob =
        bioData.contactInfo?.find((c) => c.label.toLowerCase().includes("mobile"))
          ?.value || "";
      const em =
        bioData.contactInfo?.find((c) => c.label.toLowerCase().includes("email"))
          ?.value || "";

      setBioForm({
        heroTitle: bioData.hero?.title || "",
        heroEyebrow: bioData.hero?.eyebrow || "",
        heroQuote: bioData.hero?.quote || "",
        heroAttribution: bioData.hero?.attribution || "",
        biographyText: (bioData.biography || []).join("\n\n"),
        careerTitle: bioData.career?.title || "",
        careerBody: bioData.career?.body || "",
        socialIntro: bioData.socialIntro || "",
        address: addr,
        mobile: mob,
        email: em,
      });
    }
  }, [bioData]);

  const [savingBio, setSavingBio] = useState(false);
  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBio(true);
    try {
      const paragraphs = bioForm.biographyText
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      await api.updateBio({
        hero: {
          eyebrow: bioForm.heroEyebrow,
          title: bioForm.heroTitle,
          quote: bioForm.heroQuote,
          attribution: bioForm.heroAttribution,
        },
        biography: paragraphs,
        career: {
          title: bioForm.careerTitle,
          body: bioForm.careerBody,
        },
        socialIntro: bioForm.socialIntro,
        contactInfo: [
          { label: "Address", value: bioForm.address },
          { label: "Mobile", value: bioForm.mobile },
          { label: "Email", value: bioForm.email },
        ],
      });

      await queryClient.invalidateQueries({ queryKey: ["bio"] });
      toast.success("Bio and profile information updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update bio");
    } finally {
      setSavingBio(false);
    }
  };

  // ================= 2. BOOKS MODAL STATE & HANDLERS =================
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [bookForm, setBookForm] = useState<BookData>({
    title: "",
    type: "Poetry collection",
    tone: "nature",
    badge: "",
    description: "",
    author: "Poonam Oswal",
    order: 0,
  });

  const openAddBook = () => {
    setEditingBookId(null);
    setBookForm({
      title: "",
      type: "Poetry collection",
      tone: "nature",
      badge: "",
      description: "",
      author: "Poonam Oswal",
      order: (books?.length || 0) + 1,
    });
    setBookModalOpen(true);
  };

  const openEditBook = (book: BookData) => {
    setEditingBookId(book._id || null);
    setBookForm({
      title: book.title,
      type: book.type,
      tone: book.tone,
      badge: book.badge || "",
      description: book.description,
      author: book.author || "Poonam Oswal",
      order: book.order || 0,
    });
    setBookModalOpen(true);
  };

  const handleSaveBook = async () => {
    if (!bookForm.title || !bookForm.description) {
      toast.error("Please fill in Title and Description");
      return;
    }
    try {
      if (editingBookId) {
        await api.updateBook(editingBookId, bookForm);
        toast.success("Book updated");
      } else {
        await api.createBook(bookForm);
        toast.success("Book created");
      }
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      setBookModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save book");
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await api.deleteBook(id);
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete book");
    }
  };

  // ================= 3. SERVICES MODAL STATE & HANDLERS =================
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<ServiceData>({
    title: "",
    description: "",
    icon: "Compass",
    order: 0,
  });

  const openAddService = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: "",
      description: "",
      icon: "Compass",
      order: (services?.length || 0) + 1,
    });
    setServiceModalOpen(true);
  };

  const openEditService = (service: ServiceData) => {
    setEditingServiceId(service._id || null);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: typeof service.icon === "string" ? service.icon : "Compass",
      order: service.order || 0,
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async () => {
    if (!serviceForm.title || !serviceForm.description) {
      toast.error("Please fill in Title and Description");
      return;
    }
    try {
      if (editingServiceId) {
        await api.updateService(editingServiceId, serviceForm);
        toast.success("Service updated");
      } else {
        await api.createService(serviceForm);
        toast.success("Service created");
      }
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      setServiceModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save service");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.deleteService(id);
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service");
    }
  };

  // ================= 4. GALLERY MODAL STATE & HANDLERS =================
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<GalleryItemData>({
    title: "",
    detail: "",
    size: "standard",
    order: 0,
  });

  const openAddGallery = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: "",
      detail: "",
      size: "standard",
      order: (galleryItems?.length || 0) + 1,
    });
    setGalleryModalOpen(true);
  };

  const openEditGallery = (item: GalleryItemData) => {
    setEditingGalleryId(item._id || null);
    setGalleryForm({
      title: item.title,
      detail: item.detail || "",
      size: item.size || "standard",
      order: item.order || 0,
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = async () => {
    if (!galleryForm.title) {
      toast.error("Please enter a Title");
      return;
    }
    try {
      if (editingGalleryId) {
        await api.updateGalleryItem(editingGalleryId, galleryForm);
        toast.success("Gallery item updated");
      } else {
        await api.createGalleryItem(galleryForm);
        toast.success("Gallery item added");
      }
      await queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setGalleryModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save gallery item");
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      await api.deleteGalleryItem(id);
      await queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Gallery item deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete gallery item");
    }
  };

  // ================= 5. TESTIMONIALS MODAL STATE & HANDLERS =================
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialData>({
    name: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
    order: 0,
  });

  const openAddTestimonial = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: "",
      role: "",
      company: "",
      quote: "",
      rating: 5,
      order: (testimonials?.length || 0) + 1,
    });
    setTestimonialModalOpen(true);
  };

  const openEditTestimonial = (item: TestimonialData) => {
    setEditingTestimonialId(item._id || null);
    setTestimonialForm({
      name: item.name,
      role: item.role || "",
      company: item.company || "",
      quote: item.quote,
      rating: item.rating || 5,
      order: item.order || 0,
    });
    setTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.quote) {
      toast.error("Please fill in Name and Quote");
      return;
    }
    try {
      if (editingTestimonialId) {
        await api.updateTestimonial(editingTestimonialId, testimonialForm);
        toast.success("Testimonial updated");
      } else {
        await api.createTestimonial(testimonialForm);
        toast.success("Testimonial added");
      }
      await queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setTestimonialModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.deleteTestimonial(id);
      await queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete testimonial");
    }
  };

  // ================= 6. CONTACT MESSAGES HANDLERS =================
  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markContactRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, read: true } : msg))
      );
      toast.success("Marked as read");
    } catch (err: any) {
      toast.error(err.message || "Failed to mark message read");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await api.deleteContactMessage(id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete message");
    }
  };

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl text-foreground sm:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage website content, publications, services, and visitor inquiries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ExternalLink className="mr-2 size-4" />
                View Website
              </Link>
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bio" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="bio" className="flex items-center gap-2">
              <User className="size-4" />
              <span>Bio</span>
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="size-4" />
              <span>Books</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Compass className="size-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="size-4" />
              <span>Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Quote className="size-4" />
              <span>Testimonials</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 relative">
              <Mail className="size-4" />
              <span>Messages</span>
              {messages.filter((m) => !m.read).length > 0 ? (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] text-primary-foreground font-semibold">
                  {messages.filter((m) => !m.read).length}
                </span>
              ) : null}
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: BIO & PROFILE */}
          <TabsContent value="bio" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Biography & Profile Information</CardTitle>
                <CardDescription>
                  Update hero introduction, biographical paragraphs, career highlights, and contact information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveBio} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={bioForm.heroTitle}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, heroTitle: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroEyebrow">Hero Eyebrow Tag</Label>
                      <Input
                        id="heroEyebrow"
                        value={bioForm.heroEyebrow}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, heroEyebrow: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroAttribution">Quote Attribution</Label>
                      <Input
                        id="heroAttribution"
                        value={bioForm.heroAttribution}
                        onChange={(e) =>
                          setBioForm({
                            ...bioForm,
                            heroAttribution: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="heroQuote">Hero Quote</Label>
                      <Textarea
                        id="heroQuote"
                        rows={2}
                        value={bioForm.heroQuote}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, heroQuote: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <Label htmlFor="biographyText">
                      Biography Paragraphs (Separate each paragraph with an empty line)
                    </Label>
                    <Textarea
                      id="biographyText"
                      rows={8}
                      value={bioForm.biographyText}
                      onChange={(e) =>
                        setBioForm({
                          ...bioForm,
                          biographyText: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="careerTitle">Career Highlight Title</Label>
                      <Input
                        id="careerTitle"
                        value={bioForm.careerTitle}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, careerTitle: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="careerBody">Career Description</Label>
                      <Textarea
                        id="careerBody"
                        rows={3}
                        value={bioForm.careerBody}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, careerBody: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="socialIntro">Social Work Intro</Label>
                      <Textarea
                        id="socialIntro"
                        rows={2}
                        value={bioForm.socialIntro}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, socialIntro: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 border-t pt-4 sm:grid-cols-3">
                    <div className="space-y-2 sm:col-span-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Public Contact Information
                      </h4>
                    </div>
                    <div className="space-y-2 sm:col-span-3">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={bioForm.address}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number</Label>
                      <Input
                        id="mobile"
                        value={bioForm.mobile}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, mobile: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email / Contact Notice</Label>
                      <Input
                        id="email"
                        value={bioForm.email}
                        onChange={(e) =>
                          setBioForm({ ...bioForm, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={savingBio}>
                    <Check className="mr-2 size-4" />
                    {savingBio ? "Saving Changes..." : "Save Bio Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: BOOKS */}
          <TabsContent value="books" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Books & Publications</CardTitle>
                  <CardDescription>
                    Manage published titles, poetry collections, and upcoming releases.
                  </CardDescription>
                </div>
                <Button onClick={openAddBook} size="sm">
                  <Plus className="mr-2 size-4" />
                  Add Book
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type / Genre</TableHead>
                        <TableHead>Tone Theme</TableHead>
                        <TableHead>Badge</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books && books.length > 0 ? (
                        books.map((book) => (
                          <TableRow key={book._id || book.title}>
                            <TableCell>{book.order ?? 0}</TableCell>
                            <TableCell className="font-medium">
                              {book.title}
                            </TableCell>
                            <TableCell>{book.type}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{book.tone}</Badge>
                            </TableCell>
                            <TableCell>
                              {book.badge ? (
                                <Badge variant="secondary">{book.badge}</Badge>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditBook(book)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() =>
                                  book._id && handleDeleteBook(book._id)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No books found. Click "Add Book" to create one.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: SERVICES */}
          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mentoring & Services</CardTitle>
                  <CardDescription>
                    Manage consulting and mentorship offerings.
                  </CardDescription>
                </div>
                <Button onClick={openAddService} size="sm">
                  <Plus className="mr-2 size-4" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services && services.length > 0 ? (
                        services.map((service) => (
                          <TableRow key={service._id || service.title}>
                            <TableCell>{service.order ?? 0}</TableCell>
                            <TableCell className="font-medium">
                              {service.title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {typeof service.icon === "string"
                                  ? service.icon
                                  : "Icon"}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-md truncate text-xs text-muted-foreground">
                              {service.description}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditService(service)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() =>
                                  service._id && handleDeleteService(service._id)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No services found. Click "Add Service" to create one.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: GALLERY */}
          <TabsContent value="gallery" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gallery Items</CardTitle>
                  <CardDescription>
                    Manage community pictures and highlight tiles.
                  </CardDescription>
                </div>
                <Button onClick={openAddGallery} size="sm">
                  <Plus className="mr-2 size-4" />
                  Add Image
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Detail / Caption</TableHead>
                        <TableHead>Grid Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {galleryItems && galleryItems.length > 0 ? (
                        galleryItems.map((item) => (
                          <TableRow key={item._id || item.title}>
                            <TableCell>{item.order ?? 0}</TableCell>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {item.detail}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.size}</Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditGallery(item)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() =>
                                  item._id && handleDeleteGallery(item._id)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No gallery items found. Click "Add Image" to create one.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 5: TESTIMONIALS */}
          <TabsContent value="testimonials" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Testimonials & Endorsements</CardTitle>
                  <CardDescription>
                    Manage testimonials from mentees, readers, and dignitaries.
                  </CardDescription>
                </div>
                <Button onClick={openAddTestimonial} size="sm">
                  <Plus className="mr-2 size-4" />
                  Add Testimonial
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role / Organization</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Quote</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testimonials && testimonials.length > 0 ? (
                        testimonials.map((item) => (
                          <TableRow key={item._id || item.name}>
                            <TableCell>{item.order ?? 0}</TableCell>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {item.role} {item.company ? `(${item.company})` : ""}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {"★".repeat(item.rating || 5)}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-xs">
                              {item.quote}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEditTestimonial(item)}
                              >
                                <Pencil className="size-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() =>
                                  item._id && handleDeleteTestimonial(item._id)
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No testimonials found. Click "Add Testimonial" to create one.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 6: CONTACT MESSAGES */}
          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Contact Form Submissions</CardTitle>
                  <CardDescription>
                    View and manage incoming inquiries submitted by visitors.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchMessages}
                  disabled={messagesLoading}
                >
                  <RefreshCw
                    className={`mr-2 size-4 ${
                      messagesLoading ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages && messages.length > 0 ? (
                    messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`rounded-lg border p-5 transition-colors ${
                          msg.read ? "bg-card border-border" : "bg-primary/5 border-primary/25"
                        }`}
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-foreground">
                              {msg.name}
                            </span>
                            {msg.read ? (
                              <Badge variant="outline" className="text-xs">
                                Read
                              </Badge>
                            ) : (
                              <Badge className="bg-primary text-xs">New</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span>
                            <strong>Email:</strong> {msg.email}
                          </span>
                          {msg.phone ? (
                            <span>
                              <strong>Phone:</strong> {msg.phone}
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-3 rounded-md bg-muted/40 p-3 text-sm text-foreground whitespace-pre-wrap">
                          {msg.message}
                        </p>

                        <div className="mt-4 flex justify-end gap-2">
                          {!msg.read ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkMessageRead(msg._id)}
                            >
                              <Check className="mr-1.5 size-3.5" />
                              Mark Read
                            </Button>
                          ) : null}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteMessage(msg._id)}
                          >
                            <Trash2 className="mr-1.5 size-3.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      No contact messages received yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ================= MODAL: BOOK ================= */}
      <Dialog open={bookModalOpen} onOpenChange={setBookModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingBookId ? "Edit Book" : "Add New Book"}
            </DialogTitle>
            <DialogDescription>
              Configure the publication details shown on the Author page.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="b-title">Book Title</Label>
              <Input
                id="b-title"
                value={bookForm.title}
                onChange={(e) =>
                  setBookForm({ ...bookForm, title: e.target.value })
                }
                placeholder="e.g. प्रकृति की गोद में"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="b-type">Type / Genre</Label>
                <Input
                  id="b-type"
                  value={bookForm.type}
                  onChange={(e) =>
                    setBookForm({ ...bookForm, type: e.target.value })
                  }
                  placeholder="e.g. Poetry collection"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-tone">Tone Theme</Label>
                <select
                  id="b-tone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={bookForm.tone}
                  onChange={(e) =>
                    setBookForm({ ...bookForm, tone: e.target.value })
                  }
                >
                  <option value="nature">nature</option>
                  <option value="life">life</option>
                  <option value="memoir">memoir</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="b-badge">Badge (Optional)</Label>
                <Input
                  id="b-badge"
                  value={bookForm.badge}
                  onChange={(e) =>
                    setBookForm({ ...bookForm, badge: e.target.value })
                  }
                  placeholder="e.g. Coming Soon"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-order">Display Order</Label>
                <Input
                  id="b-order"
                  type="number"
                  value={bookForm.order}
                  onChange={(e) =>
                    setBookForm({
                      ...bookForm,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="b-desc">Description</Label>
              <Textarea
                id="b-desc"
                rows={3}
                value={bookForm.description}
                onChange={(e) =>
                  setBookForm({ ...bookForm, description: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBookModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBook}>Save Book</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: SERVICE ================= */}
      <Dialog open={serviceModalOpen} onOpenChange={setServiceModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingServiceId ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              Configure mentorship and consulting services.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="s-title">Service Title</Label>
              <Input
                id="s-title"
                value={serviceForm.title}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, title: e.target.value })
                }
                placeholder="e.g. Mentoring"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="s-icon">Lucide Icon</Label>
                <select
                  id="s-icon"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={serviceForm.icon}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, icon: e.target.value })
                  }
                >
                  <option value="Compass">Compass</option>
                  <option value="Sprout">Sprout</option>
                  <option value="BookOpen">BookOpen</option>
                  <option value="Feather">Feather</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-order">Display Order</Label>
                <Input
                  id="s-order"
                  type="number"
                  value={serviceForm.order}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-desc">Description</Label>
              <Textarea
                id="s-desc"
                rows={4}
                value={serviceForm.description}
                onChange={(e) =>
                  setServiceForm({
                    ...serviceForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setServiceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveService}>Save Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: GALLERY ================= */}
      <Dialog open={galleryModalOpen} onOpenChange={setGalleryModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingGalleryId ? "Edit Gallery Item" : "Add Gallery Item"}
            </DialogTitle>
            <DialogDescription>
              Configure image title, detail caption, and mosaic layout size.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="g-title">Title</Label>
              <Input
                id="g-title"
                value={galleryForm.title}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, title: e.target.value })
                }
                placeholder="e.g. Women's Day"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="g-detail">Detail / Subtitle</Label>
              <Input
                id="g-detail"
                value={galleryForm.detail}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, detail: e.target.value })
                }
                placeholder="e.g. Celebrating strength and possibility"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="g-size">Grid Size</Label>
                <select
                  id="g-size"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={galleryForm.size}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      size: e.target.value as "standard" | "tall" | "wide",
                    })
                  }
                >
                  <option value="standard">standard</option>
                  <option value="tall">tall (2 rows)</option>
                  <option value="wide">wide (2 columns)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="g-order">Display Order</Label>
                <Input
                  id="g-order"
                  type="number"
                  value={galleryForm.order}
                  onChange={(e) =>
                    setGalleryForm({
                      ...galleryForm,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setGalleryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveGallery}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================= MODAL: TESTIMONIAL ================= */}
      <Dialog open={testimonialModalOpen} onOpenChange={setTestimonialModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingTestimonialId ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
            <DialogDescription>
              Add or modify reader quotes and mentee feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="t-name">Person's Name</Label>
                <Input
                  id="t-name"
                  value={testimonialForm.name}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Dr. Ananya Sharma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-rating">Rating (1-5)</Label>
                <Input
                  id="t-rating"
                  type="number"
                  min={1}
                  max={5}
                  value={testimonialForm.rating}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      rating: parseInt(e.target.value) || 5,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="t-role">Role / Designation</Label>
                <Input
                  id="t-role"
                  value={testimonialForm.role}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      role: e.target.value,
                    })
                  }
                  placeholder="e.g. Civil Servant & Mentee"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-company">Company / Org</Label>
                <Input
                  id="t-company"
                  value={testimonialForm.company}
                  onChange={(e) =>
                    setTestimonialForm({
                      ...testimonialForm,
                      company: e.target.value,
                    })
                  }
                  placeholder="e.g. Ministry of Home Affairs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-quote">Quote</Label>
              <Textarea
                id="t-quote"
                rows={4}
                value={testimonialForm.quote}
                onChange={(e) =>
                  setTestimonialForm({
                    ...testimonialForm,
                    quote: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTestimonialModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTestimonial}>Save Testimonial</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

