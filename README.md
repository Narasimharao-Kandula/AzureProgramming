# Azure Programming Lab Experiments

A public website for Azure Programming Lab Experiments, built with [Quartz](https://quartz.jzhao.xyz/) and hosted on GitHub Pages.

## 🌐 Live Site
**https://your-github-username.github.io/AzureProgramming/**

## 📁 Structure
```
quartz/
├── content/                    # Your markdown files (synced from Obsidian)
│   ├── 1. Azure Student Account.md
│   ├── 2. Blob Storage.md
│   ├── 3. Table Storage.md
│   ├── 4. Queue Storage.md
│   ├── 5. File Storage.md
│   ├── 6. Azure VM/
│   │   ├── 6.0 Complete File.md
│   │   ├── 6.1 Requirements.md
│   │   ├── 6.2 PART - A.md
│   │   ├── 6.3 PART - B.md
│   │   ├── 6.4 PART - C.md
│   │   └── 6.4 PART - D.md
│   └── Untitled.md
├── .github/workflows/deploy.yml # Auto-deploy to GitHub Pages
├── quartz.config.ts             # Site configuration
├── package.json
└── .gitignore
```

## 🚀 Quick Start

### 1. Create GitHub Repository
```bash
# Go to GitHub and create a new repository named "AzureProgramming"
# Make it PUBLIC (required for free GitHub Pages)
```

### 2. Push to GitHub
```bash
cd quartz
git add .
git commit -m "Initial commit: Azure Programming Lab website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/AzureProgramming.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The workflow will auto-run on every push to `main`

### 4. Update Your Site
Simply edit files in Obsidian, then:
```bash
cd quartz
git add .
git commit -m "Update: your changes"
git push
```
**The site auto-updates in ~1-2 minutes!**

## 📝 Supported File Types

| Type | Support | Notes |
|------|---------|-------|
| Markdown (.md) | ✅ Full | Rendered with syntax highlighting, TOC, math |
| Images (.png, .jpg, .gif, .svg, .webp) | ✅ Full | Auto-optimized, lazy-loaded |
| Videos (.mp4, .webm, .mkv*) | ✅ Native | MKV needs conversion to MP4/WebM |
| PDFs (.pdf) | ✅ Embedded | Viewable in-browser |
| Documents (.docx, .xlsx, .csv) | ✅ Download | Links to download raw files |
| Code (.py, .js, .ts, .json, .yaml) | ✅ Highlighted | Syntax highlighting in code blocks |

> **Note on Videos**: For best compatibility, convert `.mkv` to `.mp4` (H.264) using HandBrake or FFmpeg. Browsers don't natively support MKV.

## 🔧 Local Development

```bash
cd quartz
npm install          # First time only
npx quartz build --serve  # Starts dev server at http://localhost:8080
```

## ⚙️ Configuration

Edit `quartz.config.ts` to customize:
- **Site title/colors**: `configuration.theme.colors`
- **Navigation**: `layout.byPageType.content.left/right`
- **Plugins**: Enable/disable in `plugins.transformers/emitters`
- **Base URL**: Update `configuration.baseUrl` after deploying

## 🎨 Features Included

- ✅ **Full-text search** (client-side, no server needed)
- ✅ **Graph view** (local & global backlinks)
- ✅ **Dark/light mode** (auto-detect + manual toggle)
- ✅ **Table of contents** (right sidebar)
- ✅ **Syntax highlighting** (GitHub themes)
- ✅ **Math equations** (KaTeX)
- ✅ **Obsidian features**: Callouts, checkboxes, wikilinks, embeds
- ✅ **RSS feed & Sitemap** (SEO ready)
- ✅ **Mobile responsive**
- ✅ **SPA navigation** (instant page transitions)

## 📦 Adding New Content

1. **In Obsidian**: Create/edit markdown files normally
2. **Add media**: Place images/videos/PDFs in `content/` subfolders
3. **Reference in markdown**:
   ```markdown
   ![Diagram](./images/architecture.png)
   [Download PDF](./files/azure-guide.pdf)
   <video src="./videos/demo.mp4" controls></video>
   ```
4. **Commit & push** → Auto-deploys!

## 🔗 Useful Links

- [Quartz Documentation](https://quartz.jzhao.xyz/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Obsidian Publishing Alternatives](https://publish.obsidian.md/)

## 📄 License

MIT License - Feel free to use for your own labs!