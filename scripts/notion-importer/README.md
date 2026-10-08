# Notion Importer

Complete Notion to MDX (Markdown + JSX) importer optimized for Astro with advanced media handling, interactive components, and seamless integration.

## 🚀 Quick Start

### Method 1: Using NOTION_PAGE_ID (Recommended)

```bash
# Install dependencies
npm install

# Setup environment variables
cp env.example .env
# Edit .env with your Notion token and page ID

# Complete Notion → MDX conversion (fetches title/slug automatically)
NOTION_TOKEN=secret_xxx NOTION_PAGE_ID=abc123 node index.mjs

# Or use .env file
node index.mjs
```

### Method 2: Using pages.json (Legacy)

```bash
# Install dependencies
npm install

# Setup environment variables
cp env.example .env
# Edit .env with your Notion token

# Create a local configuration (ignored by Git)
cp input/pages.example.json input/pages.json
# Configure pages in input/pages.json
# {
#   "pages": [
#     {
#       "id": "your-page-id",
#       "title": "Title",
#       "slug": "slug"
#     }
#   ]
# }

# Complete Notion → MDX conversion
node index.mjs

# For step-by-step debugging
node notion-converter.mjs    # Notion → Markdown
node mdx-converter.mjs       # Markdown → MDX
```

## 📁 Structure

```
notion-importer/
├── index.mjs                    # Complete Notion → MDX pipeline
├── notion-converter.mjs         # Notion → Markdown with notion-to-md v4
├── mdx-converter.mjs           # Markdown → MDX with Astro components
├── post-processor.mjs          # Markdown post-processing
├── package.json                # Dependencies and scripts
├── env.example                 # Environment variables template
├── static/                     # Static files injected at build time
│   ├── frontmatter.example.mdx # Optional frontmatter template
│   └── bibliography.example.bib # Optional bibliography template
├── input/                      # Configuration
│   └── pages.example.json     # Copy to local pages.json before editing
└── output/                     # Results
    ├── *.md                   # Intermediate Markdown
    ├── *.mdx                  # Final MDX for Astro
    └── media/                 # Downloaded media files
```

## ✨ Key Features

### 🎯 **Advanced Media Handling**
- **Local download**: Automatic download of all Notion media (images, files, PDFs)
- **Path transformation**: Smart path conversion for web accessibility
- **Image components**: Automatic conversion to Astro `Image` components with zoom/download
- **Media organization**: Structured media storage by page ID

### 🧮 **Interactive Components**
- **Callouts → Notes**: Notion callouts converted to Astro `Note` components
- **Enhanced tables**: Tables wrapped in styled containers
- **Code blocks**: Enhanced with copy functionality
- **Automatic imports**: Smart component and image import generation

### 🎨 **Smart Formatting**  
- **Link fixing**: Notion internal links converted to relative links
- **Artifact cleanup**: Removal of Notion-specific formatting artifacts
- **Static frontmatter**: Priority injection of custom frontmatter from `static/frontmatter.mdx`
- **Static bibliography**: Automatic copying of `static/bibliography.bib`
- **Astro compatibility**: Full compatibility with Astro MDX processing

### 🔧 **Robust Pipeline**
- **Notion preprocessing**: Advanced page configuration and media strategy
- **Post-processing**: Markdown cleanup and optimization
- **MDX conversion**: Final transformation with Astro components
- **Auto-copy**: Automatic copying to Astro content directory

## 📄 Static Files Configuration

The importer supports static files for consistent metadata and bibliography. Only generic examples are committed. Local `input/pages.json`, `.env` files, importer output, and active static overrides are ignored by Git; review generated articles before adding them to the public site.

### Frontmatter (`static/frontmatter.mdx`)
Copy `static/frontmatter.example.mdx` to `static/frontmatter.mdx` and edit it to override frontmatter across all conversions. Leave it absent to use each page's metadata:

```yaml
---
title: "My Article Title"
subtitle: "Optional subtitle"
description: "Article description for SEO"
authors:
  - name: "Jane Doe"
    url: "https://example.com"
    affiliations:
      - "Hugging Face"
tags:
  - AI
  - Research
doi: "10.1000/182"
tableOfContentsAutoCollapse: true
---
```

This static frontmatter takes **highest priority** over any Notion metadata or existing frontmatter.

### Bibliography (`static/bibliography.bib`)
Copy `static/bibliography.example.bib` to `static/bibliography.bib` and add your BibTeX entries. The importer copies these entries to `src/content/bibliography.bib`; back up your existing bibliography before importing:

```bibtex
@article{example2024,
  title={Example Article},
  author={Doe, Jane and Smith, John},
  journal={Example Journal},
  year={2024}
}
```

## 📊 Example Workflow

```bash
# 1. Configure your Notion pages
# Edit input/pages.json with your page IDs

# 2. Complete automatic conversion
NOTION_TOKEN=your_token node index.mjs --clean

# 3. Generated results
ls output/
# → getting-started.md (Intermediate Markdown)  
# → getting-started.mdx (Final MDX for Astro)
# → media/ (downloaded images and files)
```

### 📋 Conversion Result

The pipeline generates MDX files optimized for Astro with:

```mdx
---
title: "Getting Started with Notion"
published: "2024-01-15"
tableOfContentsAutoCollapse: true
---

import Image from '../components/Image.astro';
import Note from '../components/Note.astro';
import gettingStartedImage from './media/getting-started/image1.png';

## Introduction

Here is some content with a callout:

<Note type="info" title="Important">
This is a converted Notion callout.
</Note>

And an image:

<Figure
  src={gettingStartedImage}
  alt="Getting started screenshot"
  zoomable
  downloadable
  layout="fixed"
/>
```

## ⚙️ Required Astro Configuration

To use the generated MDX files, ensure your Astro project has the required components:

```astro
// src/components/Figure.astro
---
export interface Props {
  src: any;
  alt?: string;
  caption?: string;
  zoomable?: boolean;
  downloadable?: boolean;
  layout?: string;
  id?: string;
}

const { src, alt, caption, zoomable, downloadable, layout, id } = Astro.props;
---

<figure {id} class="figure">
  <img src={src} alt={alt} />
  {caption && <figcaption>{caption}</figcaption>}
</figure>
```

## 🛠️ Prerequisites

- **Node.js** with ESM support
- **Notion Integration**: Set up an integration in your Notion workspace
- **Notion Token**: Copy the "Internal Integration Token"
- **Shared Pages**: Share the specific Notion page(s) with your integration
- **Astro** to use the generated MDX

## 🎯 Technical Architecture

### 4-Stage Pipeline

1. **Notion Preprocessing** (`notion-converter.mjs`)
   - Configuration loading from `pages.json`
   - Notion API client initialization
   - Media download strategy configuration

2. **Notion-to-Markdown** (notion-to-md v4)
   - Page conversion with `NotionConverter`
   - Media downloading with `downloadMediaTo()`
   - File export with `DefaultExporter`

3. **Markdown Post-processing** (`post-processor.mjs`)
   - Notion artifact cleanup
   - Link fixing and optimization
   - Table and code block enhancement

4. **MDX Conversion** (`mdx-converter.mjs`)
   - Component transformation (Figure, Note)
   - Automatic import generation
   - Frontmatter enhancement
   - Astro compatibility optimization

## 📊 Configuration Options

### Pages Configuration (`input/pages.json`)

```json
{
  "pages": [
    {
      "id": "your-notion-page-id",
      "title": "Page Title",
      "slug": "page-slug"
    }
  ]
}
```

### Environment Variables

Copy `env.example` to `.env` and configure:

```bash
cp env.example .env
# Edit .env with your actual Notion token
```

Required variables:
```bash
NOTION_TOKEN=secret_your_notion_integration_token_here
```

### Command Line Options

```bash
# Full workflow
node index.mjs --clean --token=your_token

# Notion to Markdown only
node index.mjs --notion-only

# Markdown to MDX only  
node index.mjs --mdx-only

# Custom paths
node index.mjs --input=my-pages.json --output=converted/
```

## 📊 Conversion Statistics

For a typical Notion page:
- **Media files** automatically downloaded and organized
- **Callouts** converted to interactive Note components
- **Images** transformed to Figure components with zoom/download
- **Tables** enhanced with proper styling containers
- **Code blocks** enhanced with copy functionality
- **Links** fixed for proper internal navigation

## ✅ Project Status

### 🎉 **Complete Features**
- ✅ **Notion → MDX Pipeline**: Full end-to-end functional conversion
- ✅ **Media Management**: Automatic download and path transformation
- ✅ **Component Integration**: Seamless Astro component integration
- ✅ **Smart Formatting**: Intelligent cleanup and optimization
- ✅ **Robustness**: Error handling and graceful degradation
- ✅ **Flexibility**: Modular pipeline with step-by-step options

### 🚀 **Production Ready**
The toolkit is now **100% operational** for converting Notion pages to MDX/Astro with all advanced features (media handling, component integration, smart formatting).

## 🔗 Integration with notion-to-md v4

This toolkit leverages the powerful [notion-to-md v4](https://notionconvert.com/docs/v4/guides/) library with:

- **Advanced Media Strategies**: Download, upload, and direct media handling
- **Custom Renderers**: Block transformers and annotation transformers  
- **Exporter Plugins**: File, buffer, and stdout output options
- **Database Support**: Full database property and frontmatter transformation
- **Page References**: Smart internal link handling

## 📚 Additional Resources

- [notion-to-md v4 Documentation](https://notionconvert.com/docs/v4/guides/)
- [Notion API Documentation](https://developers.notion.com/)
- [Astro MDX Documentation](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Media Handling Strategies](https://notionconvert.com/blog/mastering-media-handling-in-notion-to-md-v4-download-upload-and-direct-strategies/)
- [Frontmatter Transformation](https://notionconvert.com/blog/how-to-convert-notion-properties-to-frontmatter-with-notion-to-md-v4/)
