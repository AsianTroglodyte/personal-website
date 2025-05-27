import { defineCollection, z } from 'astro:content';
import {glob, file} from 'astro/loaders'

const blog = defineCollection({
	loader: glob({ pattern: "*.md", base: "/blog"}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const writings = defineCollection({
	loader: glob({ pattern: "*.md", base: "/writings"}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	})
})

const portfolio = defineCollection({
	loader: glob({ pattern: "*.md", base: "/portfolio"}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
})

export const collections = {blog, writings, portfolio};
