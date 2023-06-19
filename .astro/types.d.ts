declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}
declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"avr-intro.md": {
	id: "avr-intro.md";
  slug: "avr-intro";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"building-luccachat.md": {
	id: "building-luccachat.md";
  slug: "building-luccachat";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"building-luccanotes.md": {
	id: "building-luccanotes.md";
  slug: "building-luccanotes";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"building-tank-battle.md": {
	id: "building-tank-battle.md";
  slug: "building-tank-battle";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"cmu-acceptance.md": {
	id: "cmu-acceptance.md";
  slug: "cmu-acceptance";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"college-application-grievances.md": {
	id: "college-application-grievances.md";
  slug: "college-application-grievances";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"discovery.md": {
	id: "discovery.md";
  slug: "discovery-review";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"freelancing.md": {
	id: "freelancing.md";
  slug: "becoming-a-freelance-dev";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"gh-actions-website.md": {
	id: "gh-actions-website.md";
  slug: "gh-actions-website";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"good-ui-isnt-magic.md": {
	id: "good-ui-isnt-magic.md";
  slug: "good-ui-isnt-magic";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"index.md": {
	id: "index.md";
  slug: "index";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"me.md": {
	id: "me.md";
  slug: "me";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"no-justify.md": {
	id: "no-justify.md";
  slug: "no-justify";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"prism-testing.md": {
	id: "prism-testing.md";
  slug: "prism-testing";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"prisma-learning.md": {
	id: "prisma-learning.md";
  slug: "prisma-learning";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"ram.md": {
	id: "ram.md";
  slug: "ram-review";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"react-calculator-fem-challenge.md": {
	id: "react-calculator-fem-challenge.md";
  slug: "react-calculator-fem-challenge";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"redstone-features.md": {
	id: "redstone-features.md";
  slug: "redstone-features";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"redstone-quickstart.md": {
	id: "redstone-quickstart.md";
  slug: "redstone-quickstart";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"redstone-shutdown.md": {
	id: "redstone-shutdown.md";
  slug: "redstone-shutdown";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"redstone.md": {
	id: "redstone.md";
  slug: "redstone";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"sinnohvation.md": {
	id: "sinnohvation.md";
  slug: "sinnohvation-review";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"t3-stack.md": {
	id: "t3-stack.md";
  slug: "t3-stack";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"tech-picks-07-21.md": {
	id: "tech-picks-07-21.md";
  slug: "tech-picks-07-21";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"test.md": {
	id: "test.md";
  slug: "test";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"website-1.0.md": {
	id: "website-1.0.md";
  slug: "website-1.0";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"website-2.0.md": {
	id: "website-2.0.md";
  slug: "website-2.0";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
"website-3.0.md": {
	id: "website-3.0.md";
  slug: "website-3.0";
  body: string;
  collection: "articles";
  data: any
} & { render(): Render[".md"] };
};
"drafts": {
"articles.md": {
	id: "articles.md";
  slug: "articles";
  body: string;
  collection: "drafts";
  data: any
} & { render(): Render[".md"] };
"portfolio-projects.md": {
	id: "portfolio-projects.md";
  slug: "portfolio-projects";
  body: string;
  collection: "drafts";
  data: any
} & { render(): Render[".md"] };
};
"general": {
"me.mdx": {
	id: "me.mdx";
  slug: "me";
  body: string;
  collection: "general";
  data: any
} & { render(): Render[".mdx"] };
};
"portfolio": {
"blaring-net.md": {
	id: "blaring-net.md";
  slug: "blaring-net";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"calculator.md": {
	id: "calculator.md";
  slug: "calculator";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"crowdfunding.md": {
	id: "crowdfunding.md";
  slug: "crowdfunding";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"lucca-logs.md": {
	id: "lucca-logs.md";
  slug: "lucca-logs";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"luccaboard.md": {
	id: "luccaboard.md";
  slug: "luccaboard";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"luccachat.md": {
	id: "luccachat.md";
  slug: "luccachat";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"luccanotes.md": {
	id: "luccanotes.md";
  slug: "luccanotes";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"mmm-collabs.md": {
	id: "mmm-collabs.md";
  slug: "mmm-collabs";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"mmm-invites.md": {
	id: "mmm-invites.md";
  slug: "mmm-invites";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"mmm-tickets.md": {
	id: "mmm-tickets.md";
  slug: "mmm-tickets";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"mmm-wallets.md": {
	id: "mmm-wallets.md";
  slug: "mmm-wallets";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"osumekeys.md": {
	id: "osumekeys.md";
  slug: "osumekeys";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"quizzical.md": {
	id: "quizzical.md";
  slug: "quizzical";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"rest-countries-api.md": {
	id: "rest-countries-api.md";
  slug: "rest-countries-api";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"social-dashboard.md": {
	id: "social-dashboard.md";
  slug: "social-dashboard";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"tank-battle.md": {
	id: "tank-battle.md";
  slug: "tank-battle";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"tenzies.md": {
	id: "tenzies.md";
  slug: "tenzies";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
"travel-journal.md": {
	id: "travel-journal.md";
  slug: "travel-journal";
  body: string;
  collection: "portfolio";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
