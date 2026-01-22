import { z } from 'zod';

// Social Link Schema
export const socialLinkSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  url: z.string().url('Must be a valid URL'),
  icon: z.string().min(1, 'Icon is required'),
});

// Profile Schema
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  avatar: z.string().min(1, 'Must be a valid URL'),
  coverImage: z.string().url('Must be a valid URL'),
  socialLinks: z.array(socialLinkSchema),
});

// Link Schema
export const linkSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  url: z.string().min(1, 'URL is required'),
  description: z.string().min(1, 'Description is required'),
  backgroundImage: z.string().url('Must be a valid URL'),
});

// Product Schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Must be a valid URL'),
  price: z.string().min(1, 'Price is required'),
  url: z.string().min(1, 'URL is required'),
});

// AI Tool Schema
export const aiToolSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  logo: z.string().url('Must be a valid URL'),
  url: z.string().min(1, 'URL is required'),
});

// Complete Bio Data Schema
export const bioDataSchema = z.object({
  profile: profileSchema,
  links: z.array(linkSchema),
  products: z.array(productSchema),
  aiTools: z.array(aiToolSchema),
});

// Types
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Product = z.infer<typeof productSchema>;
export type AITool = z.infer<typeof aiToolSchema>;
export type BioData = z.infer<typeof bioDataSchema>;



// Cloudflare Worker/Pages Environment
export interface Env {
  // Add environment variables here if needed
}

// Cloudflare Pages Functions type
export interface EventContext<Env = unknown, P extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string>;
  data: Data;
}

export type PagesFunction<Env = unknown, Params extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> = (
  context: EventContext<Env, Params, Data>
) => Response | Promise<Response>;

export type PagesMiddleware<Env = unknown, Params extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> = (
  context: EventContext<Env, Params, Data>
) => Response | Promise<Response | void>;
