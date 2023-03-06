import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import mdx from "@astrojs/mdx";

import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), mdx()],
  site: "https://blaring.net",
  markdown: {
    // remarkPlugins: [remarkToc],
    // syntaxHighlight: "prism",
  },
});
