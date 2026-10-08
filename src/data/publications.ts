export type Publication = {
  title: string;
  authors: string[];
  category: "conference" | "preprint";
  /** Conference month or first preprint release month (YYYY-MM), used for descending order. */
  date: string;
  venue?: string;
  links: { label: string; url: string }[];
};

/** Conference papers and public preprints. The display groups and sorts these automatically. */
export const PUBLICATIONS: Publication[] = [
  {
    title: "VALG: An Agentic System for ML Theory Research",
    authors: ["Dechen Zhang", "Xuan Tang", "Xinxiang Yin", "Xingwu Chen", "Jian Qian", "Difan Zou"],
    category: "preprint",
    date: "2026-08",
    venue: "arXiv preprint",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2608.13060" },
      { label: "Code", url: "https://github.com/DechenZhang/VALG-ML-Theory-Agent" },
    ],
  },
  {
    title: "Scaling Laws for Precision in High-Dimensional Linear Regression",
    authors: ["Dechen Zhang", "Xuan Tang", "Yingyu Liang", "Difan Zou"],
    venue: "ICML",
    category: "conference",
    date: "2026-07",
    links: [
      { label: "OpenReview", url: "https://openreview.net/pdf?id=LyhBIrNBXv" },
      { label: "arXiv", url: "https://arxiv.org/abs/2602.19241" },
    ],
  },
  {
    title: "The Implicit Bias of Steepest Descent with Mini-batch Stochastic Gradient",
    authors: ["Jichu Li", "Xuan Tang", "Difan Zou"],
    venue: "ICML",
    category: "conference",
    date: "2026-07",
    links: [
      { label: "OpenReview", url: "https://openreview.net/pdf?id=OT9cxeWbEO" },
      { label: "arXiv", url: "https://arxiv.org/abs/2602.11557" },
    ],
  },
  {
    title: "On the Convergence of Low-Precision LoRA Training",
    authors: ["Dechen Zhang", "Xuan Tang", "Difan Zou"],
    venue: "ICML HiLD Workshop",
    category: "conference",
    date: "2026-07",
    links: [{ label: "OpenReview", url: "https://openreview.net/pdf?id=GEGMc8lLoN" }],
  },
  {
    title: "A Convergence Analysis of Adaptive Optimizers under Floating-point Quantization",
    authors: ["Xuan Tang*", "Jichu Li*", "Difan Zou"],
    venue: "ICLR",
    category: "conference",
    date: "2026-04",
    links: [
      { label: "OpenReview", url: "https://openreview.net/pdf?id=wwP1SCACee" },
      { label: "arXiv", url: "https://arxiv.org/abs/2510.21314" },
    ],
  },
  {
    title: "Understanding the Generalization of Stochastic Gradient Adam in Learning Neural Networks",
    authors: ["Xuan Tang", "Han Zhang", "Yuan Cao", "Difan Zou"],
    venue: "NeurIPS",
    category: "conference",
    date: "2025-12",
    links: [
      { label: "OpenReview", url: "https://openreview.net/pdf?id=ETgPUJfQE1" },
      { label: "arXiv", url: "https://arxiv.org/abs/2510.11354" },
    ],
  },
];
