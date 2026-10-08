/** GitHub Actions supplies the Pages URL; set SITE_URL for a local production preview. */
export const SITE_URL = process.env.SITE_URL || "https://doodlext.github.io";

const site = new URL(SITE_URL);
if (!['http:', 'https:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash) {
  throw new Error("SITE_URL must be a root URL, such as https://USERNAME.github.io. Project subpaths need additional base-path support.");
}
