import { useQuery } from "@tanstack/react-query";
import {
  hero as initialHero,
  biography as initialBiography,
  stats as initialStats,
  career as initialCareer,
  socialIntro as initialSocialIntro,
  poetry as initialPoetry,
  contactInfo as initialContactInfo,
  books as initialBooks,
  gallery as initialGallery,
  services as initialServices,
} from "@/data/site";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  "http://localhost:5000/api";

export type BioData = {
  hero: typeof initialHero;
  biography: string[];
  stats: typeof initialStats;
  career: typeof initialCareer;
  socialIntro: string;
  poetry: typeof initialPoetry;
  contactInfo?: typeof initialContactInfo;
};

export type BookData = {
  _id?: string;
  title: string;
  type: string;
  tone: string;
  badge?: string;
  description: string;
  author?: string;
  coverImage?: string;
  buyLink?: string;
  order?: number;
};

export type GalleryItemData = {
  _id?: string;
  title: string;
  detail: string;
  size: "standard" | "tall" | "wide";
  imageUrl?: string;
  order?: number;
};

export type ServiceData = {
  _id?: string;
  title: string;
  description: string;
  icon: string | any;
  order?: number;
};

export type TestimonialData = {
  _id?: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
  featured?: boolean;
  order?: number;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message?: string;
};


export type ContactMessageData = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  createdAt: string;
};

// Admin Token Utilities
const TOKEN_KEY = "poonam_admin_token";

export const getAdminToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setAdminToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const clearAdminToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const isAdminLoggedIn = (): boolean => {
  return !!getAdminToken();
};

// Generic fetch wrapper with auth header support
async function fetchFromApi<T>(
  endpoint: string,
  options?: RequestInit,
  requireAuth = false
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };

  if (requireAuth) {
    const token = getAdminToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.message || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export const api = {
  // Bio & Site Information
  getBio: async (): Promise<BioData> => {
    const json = await fetchFromApi<{ success: boolean; data: any }>("bio");
    if (json && json.data) {
      return {
        hero: json.data.hero || initialHero,
        biography:
          json.data.biography && json.data.biography.length > 0
            ? json.data.biography
            : initialBiography,
        stats:
          json.data.stats && json.data.stats.length > 0
            ? json.data.stats
            : initialStats,
        career: json.data.career || initialCareer,
        socialIntro: json.data.socialIntro || initialSocialIntro,
        poetry:
          json.data.poetry && json.data.poetry.length > 0
            ? json.data.poetry
            : initialPoetry,
        contactInfo:
          json.data.contactInfo && json.data.contactInfo.length > 0
            ? json.data.contactInfo
            : initialContactInfo,
      };
    }
    throw new Error("Invalid bio response");
  },

  // Books
  getBooks: async (): Promise<BookData[]> => {
    const json = await fetchFromApi<{ success: boolean; data: BookData[] }>("books");
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return initialBooks;
  },

  // Gallery
  getGallery: async (): Promise<GalleryItemData[]> => {
    const json = await fetchFromApi<{
      success: boolean;
      data: GalleryItemData[];
    }>("gallery");
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return initialGallery as GalleryItemData[];
  },

  // Services
  getServices: async (): Promise<ServiceData[]> => {
    const json = await fetchFromApi<{ success: boolean; data: ServiceData[] }>(
      "services"
    );
    if (json && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return initialServices;
  },

  // Testimonials
  getTestimonials: async (): Promise<TestimonialData[]> => {
    const json = await fetchFromApi<{
      success: boolean;
      data: TestimonialData[];
    }>("testimonials");
    if (json && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  },

  // Contact Form Submission (Public)
  sendContact: async (
    data: ContactFormData
  ): Promise<{ success: boolean; message: string }> => {
    return await fetchFromApi<{ success: boolean; message: string }>("contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // ================= ADMIN AUTH =================
  loginAdmin: async (
    email: string,
    password: string
  ): Promise<{ success: boolean; token: string; admin: any }> => {
    return await fetchFromApi<{ success: boolean; token: string; admin: any }>(
      "admin/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );
  },

  getAdminMe: async (): Promise<{ success: boolean; admin: any }> => {
    return await fetchFromApi<{ success: boolean; admin: any }>(
      "admin/me",
      {},
      true
    );
  },

  // ================= ADMIN CRUD OPERATIONS =================

  // Bio Update
  updateBio: async (data: Partial<BioData>): Promise<any> => {
    return await fetchFromApi<{ success: boolean; data: any }>(
      "bio",
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true
    );
  },

  // Books CRUD
  createBook: async (data: BookData): Promise<BookData> => {
    const res = await fetchFromApi<{ success: boolean; data: BookData }>(
      "books",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  updateBook: async (id: string, data: Partial<BookData>): Promise<BookData> => {
    const res = await fetchFromApi<{ success: boolean; data: BookData }>(
      `books/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  deleteBook: async (id: string): Promise<any> => {
    return await fetchFromApi(
      `books/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },

  // Services CRUD
  createService: async (data: ServiceData): Promise<ServiceData> => {
    const res = await fetchFromApi<{ success: boolean; data: ServiceData }>(
      "services",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  updateService: async (
    id: string,
    data: Partial<ServiceData>
  ): Promise<ServiceData> => {
    const res = await fetchFromApi<{ success: boolean; data: ServiceData }>(
      `services/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  deleteService: async (id: string): Promise<any> => {
    return await fetchFromApi(
      `services/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },

  // Gallery CRUD
  createGalleryItem: async (data: GalleryItemData): Promise<GalleryItemData> => {
    const res = await fetchFromApi<{ success: boolean; data: GalleryItemData }>(
      "gallery",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  updateGalleryItem: async (
    id: string,
    data: Partial<GalleryItemData>
  ): Promise<GalleryItemData> => {
    const res = await fetchFromApi<{ success: boolean; data: GalleryItemData }>(
      `gallery/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  deleteGalleryItem: async (id: string): Promise<any> => {
    return await fetchFromApi(
      `gallery/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },

  // Testimonials CRUD
  createTestimonial: async (data: TestimonialData): Promise<TestimonialData> => {
    const res = await fetchFromApi<{ success: boolean; data: TestimonialData }>(
      "testimonials",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  updateTestimonial: async (
    id: string,
    data: Partial<TestimonialData>
  ): Promise<TestimonialData> => {
    const res = await fetchFromApi<{ success: boolean; data: TestimonialData }>(
      `testimonials/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      true
    );
    return res.data;
  },

  deleteTestimonial: async (id: string): Promise<any> => {
    return await fetchFromApi(
      `testimonials/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },

  // Contact Inquiries (Admin Only)
  getContactMessages: async (): Promise<ContactMessageData[]> => {
    const res = await fetchFromApi<{
      success: boolean;
      data: ContactMessageData[];
    }>("contact", {}, true);
    return res.data || [];
  },

  markContactRead: async (id: string): Promise<ContactMessageData> => {
    const res = await fetchFromApi<{
      success: boolean;
      data: ContactMessageData;
    }>(
      `contact/${id}/read`,
      {
        method: "PATCH",
      },
      true
    );
    return res.data;
  },

  deleteContactMessage: async (id: string): Promise<any> => {
    return await fetchFromApi(
      `contact/${id}`,
      {
        method: "DELETE",
      },
      true
    );
  },
};

// React Query Hooks with Fallbacks
export function useBio() {
  return useQuery({
    queryKey: ["bio"],
    queryFn: api.getBio,
    initialData: {
      hero: initialHero,
      biography: initialBiography,
      stats: initialStats,
      career: initialCareer,
      socialIntro: initialSocialIntro,
      poetry: initialPoetry,
      contactInfo: initialContactInfo,
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}

export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: api.getBooks,
    initialData: initialBooks,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: api.getGallery,
    initialData: initialGallery as GalleryItemData[],
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: api.getServices,
    initialData: initialServices,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: api.getTestimonials,
    initialData: [],
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
