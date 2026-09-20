import { defineConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

export default defineConfig({
  configuration: {
    pageTitle: "Nisha Azure Lab Experiments",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "narasimharao-kandula.github.io/AzureProgramming",
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
          light: "#ffffff",
          lightgray: "#f3f4f6",
          gray: "#d1d5db",
          darkgray: "#6b7280",
          dark: "#1f2937",
          secondary: "#0078d4",
          tertiary: "#00bcf2",
          highlight: "rgba(0, 120, 212, 0.1)",
          textHighlight: "#fef08a",
        },
        darkMode: {
          light: "#0f172a",
          lightgray: "#1e293b",
          gray: "#475569",
          darkgray: "#94a3b8",
          dark: "#f8fafc",
          secondary: "#60a5fa",
          tertiary: "#22d3ee",
          highlight: "rgba(96, 165, 250, 0.1)",
          textHighlight: "#fde047",
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
          enableRSS: false,
        }),
        Plugin.Assets(),
        Plugin.Static(),
        Plugin.ContentProtection(),
        Plugin.Favicon(),
        Plugin.NotFoundPage(),
        Plugin.CNAME(),
      ],
  },
  layout: {
    shareButtons: [],
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
            title: "Nisha Azure Lab Experiments",
            folderSortOrder: "alphabetical",
            useSavedState: true,
            mapFn: (node) => {
              if (node.type === "folder") {
                return { ...node, title: node.title.replace(/^\d+\.\s*/, "") }
              }
              return node
            },
            filterFn: (node) => {
              if (node.type === "file" && node.name === "Untitled.md") return false
              return true
            },
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
        ],
        right: [],
      },
      folder: {
        left: [
          Plugin.Explorer({
            title: "Nisha Azure Lab Experiments",
            folderSortOrder: "alphabetical",
            useSavedState: true,
            filterFn: (node) => {
              if (node.type === "file" && node.name === "Untitled.md") return false
              return true
            },
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
        ],
        right: [],
      },
      tag: {
        left: [
          Plugin.Explorer({
            title: "Nisha Azure Lab Experiments",
            folderSortOrder: "alphabetical",
            useSavedState: true,
          }),
          Plugin.Search(),
          Plugin.Darkmode(),
        ],
        right: [],
      },
      canvas: {
        left: [Plugin.Explorer(), Plugin.Search(), Plugin.Darkmode()],
        right: [],
      },
      bases: {
        left: [Plugin.Explorer(), Plugin.Search(), Plugin.Darkmode()],
        right: [],
      },
    },
  },
})