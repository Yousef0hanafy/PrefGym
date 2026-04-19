import { create } from 'zustand';

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  isFeatured?: boolean;
}

export interface Member {
  id: string;
  memberId: string;
  name: string;
  phone: string;
  email: string;
  planId: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  freezeStatus: 'active' | 'frozen' | 'none';
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export interface Transformation {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  plan: string;
  rating: number;
  avatar: string;
  text: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  plan: string;
  status: 'pending' | 'contacted' | 'confirmed';
  createdAt: string;
}

interface GymStore {
  // State
  memberships: Plan[];
  members: Member[];
  gallery: GalleryImage[];
  transformations: Transformation[];
  testimonials: Testimonial[];
  bookingRequests: BookingRequest[];
  
  // Stats
  totalMembers: number;
  totalTrainers: number;
  premiumSpace: number;
  expiringSoon: number;
  revenue: number;
  
  // Actions
  setMemberships: (plans: Plan[]) => void;
  addMembership: (plan: Plan) => void;
  updateMembership: (id: string, plan: Partial<Plan>) => void;
  deleteMembership: (id: string) => void;
  setFeaturedPlan: (id: string) => void;
  
  addBooking: (booking: BookingRequest) => void;
  updateBookingStatus: (id: string, status: BookingRequest['status']) => void;
  
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;
  
  addTransformation: (t: Transformation) => void;
  deleteTransformation: (id: string) => void;
}

export const useGymStore = create<GymStore>((set) => ({
  // Initial memberships data
  memberships: [
    {
      id: '1',
      name: 'Monthly',
      price: 1600,
      duration: '1 Month',
      features: ['5 Invitations', '1 Kickboxing Session', 'Unlimited Spa Access', 'Machines Access'],
      isFeatured: false,
    },
    {
      id: '2',
      name: 'Quarter',
      price: 3200,
      duration: '3 Months',
      features: ['10 Invitations', '2 PT Sessions', '2 Kickboxing Sessions', '2 Body Assessments', 'Unlimited Spa Access'],
      isFeatured: false,
    },
    {
      id: '3',
      name: 'Semi-Annual',
      price: 4500,
      duration: '6 Months',
      features: ['18 Invitations', '3 PT Sessions', '2 Kickboxing Sessions', '2 Body Assessments', '5 Weeks Freeze', 'Unlimited Spa Access'],
      isFeatured: false,
    },
    {
      id: '4',
      name: 'Annual',
      price: 6600,
      duration: '12 Months',
      features: ['28 Invitations', '5 PT Sessions', '4 Kickboxing Sessions', '4 Body Assessments', '12 Weeks Freeze', 'Physiotherapy', 'Unlimited Spa Access'],
      isFeatured: true,
    },
  ],
  
  members: [],
  gallery: [],
  transformations: [],
  testimonials: [
    {
      id: '1',
      name: 'Ahmed Mohamed',
      plan: 'Annual',
      rating: 5,
      avatar: '',
      text: 'Best gym in Egypt! Amazing equipment and professional trainers. Highly recommended!',
    },
    {
      id: '2',
      name: 'Sarah Ahmed',
      plan: 'Semi-Annual',
      rating: 5,
      avatar: '',
      text: 'The spa facilities are incredible. Love the atmosphere and the community here.',
    },
    {
      id: '3',
      name: 'Omar Khalil',
      plan: 'Quarter',
      rating: 4,
      avatar: '',
      text: 'Great environment and excellent personal training sessions. Results speak for themselves!',
    },
  ],
  bookingRequests: [],
  
  // Stats
  totalMembers: 542,
  totalTrainers: 28,
  premiumSpace: 1800,
  expiringSoon: 15,
  revenue: 125000,
  
  // Actions
  setMemberships: (plans) => set({ memberships: plans }),
  addMembership: (plan) => set((state) => ({ memberships: [...state.memberships, plan] })),
  updateMembership: (id, updatedPlan) => set((state) => ({
    memberships: state.memberships.map((p) => p.id === id ? { ...p, ...updatedPlan } : p)
  })),
  deleteMembership: (id) => set((state) => ({
    memberships: state.memberships.filter((p) => p.id !== id)
  })),
  setFeaturedPlan: (id) => set((state) => ({
    memberships: state.memberships.map((p) => ({
      ...p,
      isFeatured: p.id === id
    }))
  })),
  
  addBooking: (booking) => set((state) => ({
    bookingRequests: [booking, ...state.bookingRequests]
  })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookingRequests: state.bookingRequests.map((b) => 
      b.id === id ? { ...b, status } : b
    )
  })),
  
  addGalleryImage: (image) => set((state) => ({
    gallery: [...state.gallery, image]
  })),
  deleteGalleryImage: (id) => set((state) => ({
    gallery: state.gallery.filter((img) => img.id !== id)
  })),
  
  addTransformation: (t) => set((state) => ({
    transformations: [...state.transformations, t]
  })),
  deleteTransformation: (id) => set((state) => ({
    transformations: state.transformations.filter((t) => t.id !== id)
  })),
}));