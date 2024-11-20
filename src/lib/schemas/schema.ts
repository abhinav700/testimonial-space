import { z } from "zod";

export const TestimonialSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  spaceId: z.string().uuid(),
  createdAt: z.optional(z.string()),
});

export type TestimonialType = z.infer<typeof TestimonialSchema>;


export const SpaceSchema = z.object({
  id: z.string().uuid("SpaceSchema: Invalid id"),
  ownerEmail: z.string().email("SpaceSchema: Invalid email"),
  spaceName: z.string(),
  header: z.string(),
  customMessage: z.string(),
  questions: z.array(z.string()),
  testimonials: z.optional(z.array(TestimonialSchema)),
});

export type SpaceType = z.infer<typeof SpaceSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const TestimonialFormDataSchema = z.object({
  description: z.string(),
  customerName: z.string(),
  customerEmail: z.string().email(),
  date:z.optional(z.string())
});


export type TestimonialFormDataType = z.infer<typeof TestimonialFormDataSchema>;
