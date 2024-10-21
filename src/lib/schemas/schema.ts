import { z } from "zod";

export const SpaceSchema = z.object({
  id: z.string().uuid("SpaceSchema: Invalid id"),
  ownerEmail: z.string().email("SpaceSchema: Invalid email"),
  spaceName: z.string(),
  headerTitle: z.string(),
  customMessage: z.string(),
  questions: z.array(z.string()),
});

export type Space = z.infer<typeof SpaceSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const TestimonialSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  spaceId: z.string().uuid(),
  date: z.date()
});

export type Testimonial = z.infer<typeof TestimonialSchema>;