export type SiteNewsPart = string | { text: string; href: string };

export type SiteNewsItem = {
  date: string;
  content: SiteNewsPart[];
};

/** News & Updates: plain text with separate links for each paper or resource. */
export const SITE_NEWS: SiteNewsItem[] = [
  {
    date: "2026-08",
    content: [
      "New preprint: ",
      { text: "VALG", href: "https://arxiv.org/abs/2608.13060" },
      ", an agentic system for ML theory research (",
      { text: "code", href: "https://github.com/DechenZhang/VALG-ML-Theory-Agent" },
      ").",
    ],
  },
  {
    date: "2026-07",
    content: [
      "Two papers at ICML 2026: ",
      { text: "precision scaling laws", href: "https://arxiv.org/abs/2602.19241" },
      " and ",
      { text: "the implicit bias of stochastic steepest descent", href: "https://arxiv.org/abs/2602.11557" },
      ".",
    ],
  },
  {
    date: "2026-04",
    content: [
      "Our ",
      { text: "analysis of adaptive optimizers under floating-point quantization", href: "https://arxiv.org/abs/2510.21314" },
      " appeared at ICLR 2026 (",
      { text: "OpenReview", href: "https://openreview.net/pdf?id=wwP1SCACee" },
      ").",
    ],
  },
];
