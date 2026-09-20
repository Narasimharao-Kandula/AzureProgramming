import { defineConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

export default defineConfig({
  configuration: {
    pageTitle: "Azure Programming Lab Experiments",
    pageTitleSuffix: " | Azure Labs",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "your-github-username.github.io/AzureProgramming",
    ignorePatterns: ["private", "templates", ".obsidian", "*.bak"],
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#0078d4",
          tertiary: "#00bcf2",
          highlight: "rgba(0, 120, 212, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#60a5fa",
          tertiary: "#22d3ee",
          highlight: "rgba(96, 165, 250, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        enableCheckbox: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CNAME(),
    ],
  },
  layout: {
    shareButtons: [
      {
        id: "twitter",
        getUrl: (url) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      },
      {
        id: "linkedin",
        getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      },
      {
        id: "github",
        getUrl: (url) => `https://github.com/your-github-username/AzureProgramming`,
      },
    ],
    groups: {
      toolbar: {
        priority: 35,
        direction: "row",
        gap: "0.5rem",
      },
    },
    byPageType: {
      "404": {
        positions: {
          beforeBody: [],
          left: [],
          right: [],
        },
      },
      content: {
        left: [
          Plugin.Explorer({
            title: "Azure Labs",
            folderSortOrder: "alphabetical",
            useSavedState: true,
            mapFn: (node) => {
              if (node.type === "folder") {
                return { ...node, title: node.title.replace(/^\d+\.\s*/, "") }
              }
              return node
            },
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
          Plugin.ReaderMode(),
        ],
        right: [
          Plugin.Graph({
            localGraph: { showTags: false, depth: 2, scale: 1.2, repelForce: 0.5 },
            globalGraph: { showTags: false, depth: 2, scale: 1.2, repelForce: 0.5 },
          }),
          Plugin.Backlinks(),
        ],
      },
      folder: {
        left: [
          Plugin.Explorer({
            title: "Azure Labs",
            folderSortOrder: "alphabetical",
            useSavedState: true,
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
          Plugin.ReaderMode(),
        ],
        right: [],
      },
      tag: {
        left: [
          Plugin.Explorer({
            title: "Azure Labs",
            folderSortOrder: "alphabetical",
            useSavedState: true,
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
          Plugin.ReaderMode(),
        ],
        right: [],
      },
      canvas: {
        left: [Plugin.Explorer(), Plugin.Search(), Plugin.Darkmode(), Plugin.ReaderMode()],
        right: [],
      },
      bases: {
        left: [Plugin.Explorer(), Plugin.Search(), Plugin.Darkmode(), Plugin.ReaderMode()],
        right: [],
      },
    },
  },
})