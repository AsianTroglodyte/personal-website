import { defineCollection, z } from 'astro:content';

// const blog = defineCollection({
// 	// loader: glob({ pattern: "*.md", base: "./src/content/blog"}),
// 	// Type-check frontmatter using a schema
// 	schema: z.object({
// 		title: z.string(),
// 		description: z.string(),
// 		pubDate: z
// 			.string()
// 			.or(z.date())
// 			.transform((val) => new Date(val)),
// 		updatedDate: z
// 			.string()
// 			.optional()
// 			.transform((str) => (str ? new Date(str) : undefined)),
// 		heroImage: z.string().optional(),
// 		alt: z.string().optional()
// 	}),
// });

const writing = defineCollection({
	// loader: glob({ pattern: "*.md", base: "src/content/writing"}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date().transform((val) => new Date(val)),
		updatedDate: z.coerce.date().optional().transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		alt: z.string().optional(),
		tags: z.array(z.string()),
		isFeatured: z.boolean().default(false)
	})
})

const portfolio = defineCollection({
	// loader: glob({ pattern: "*.md", base: "src/content/portfolio"}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		alt: z.string().optional(),
		tags: z.array(z.string()),
		isFeatured: z.boolean().default(false)
	}),
})

export const collections = {writing, portfolio};
