// Site-wide configuration. Edit these values to brand your academic homepage.

import { SITE_URL } from "../site.config.mjs";
export { SITE_URL };

/** Short site title — shown in the header, browser tab, and structured data. */
export const SITE_TITLE = "Xuan Tang";

/** Default meta description. Edit the visible introduction in src/pages/index.astro. */
export const SITE_DESCRIPTION =
  "Xuan Tang, second-year PhD student at The University of Hong Kong, researching learning theory and LLM optimization.";

/** Public-facing author name. */
export const SITE_AUTHOR = "Xuan Tang";

/** Author URL (homepage, GitHub, ORCID, etc.). Defaults to the site itself. */
export const SITE_AUTHOR_URL = SITE_URL;

/** Obfuscated address for visible contact text. */
export const SITE_EMAIL_DISPLAY = "xuantang8 [at] connect [dot] hku [dot] hk";

/** Standard email link, derived from the displayed address to keep both in sync. */
export const SITE_EMAIL_HREF = `mailto:${SITE_EMAIL_DISPLAY.replace(" [at] ", "@").replaceAll(" [dot] ", ".")}`;

/** Google Scholar profile. */
export const SITE_SCHOLAR_URL = "https://scholar.google.com/citations?user=iYaJ1pkAAAAJ&hl=en";

/** Google Search Console verification token. */
export const SITE_GOOGLE_SITE_VERIFICATION = "";

/** Default social/OG share image. */
export const SITE_SOCIAL_IMAGE = "/avatar.png";

/** Optional license for your own articles; independent of the template license. */
export const SITE_LICENSE = "";
