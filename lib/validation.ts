import { z } from "zod";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const availabilitySchema = z.object({
  checkIn: dateString, checkOut: dateString, guests: z.coerce.number().int().min(1).max(20)
}).refine((v) => new Date(v.checkOut) > new Date(v.checkIn), { message: "Ngày trả phòng phải sau ngày nhận phòng" });

export const createBookingSchema = z.object({
  unitId: z.string().min(1), checkIn: dateString, checkOut: dateString, guests: z.number().int().min(1).max(20),
  fullName: z.string().trim().min(2).max(100), phone: z.string().regex(/^[0-9+().\s-]{9,20}$/),
  email: z.string().email().optional().or(z.literal("")), note: z.string().max(500).optional(), consent: z.literal(true)
}).refine((v) => new Date(v.checkOut) > new Date(v.checkIn), { message: "Ngày trả phòng phải sau ngày nhận phòng" });

export const lookupBookingSchema = z.object({ code: z.string().trim().min(8).max(30), phone: z.string().min(9).max(20) });
