export const SEO = () => {
  if (typeof window === "undefined") return null

  const metaTags = [
    { name: "description", content: "Nisha Azure Lab Experiments - Comprehensive Azure programming tutorials covering Blob Storage, Queue Storage, Table Storage, File Storage, Azure VMs, and more. Learn Azure with hands-on labs." },
    { name: "keywords", content: "Azure, Cloud Computing, Blob Storage, Queue Storage, Table Storage, File Storage, Azure VM, Microsoft Azure, Cloud Tutorials, Azure Labs, Azure Programming" },
    { name: "author", content: "Nisha" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Nisha Azure Lab Experiments" },
    { property: "og:title", content: "Nisha Azure Lab Experiments | Azure Programming Labs" },
    { property: "og:description", content: "Comprehensive Azure programming tutorials covering Blob Storage, Queue Storage, Table Storage, File Storage, Azure VMs, and more. Learn Azure with hands-on labs." },
    { property: "og:image", content: "https://narasimharao-kandula.github.io/AzureProgramming/og-image.png" },
    { property: "og:url", content: "https://narasimharao-kandula.github.io/AzureProgramming/" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@narasimharao_k" },
    { name: "twitter:title", content: "Nisha Azure Lab Experiments | Azure Programming Labs" },
    { name: "twitter:description", content: "Comprehensive Azure programming tutorials with hands-on labs." },
    { name: "twitter:image", content: "https://narasimharao-kandula.github.io/AzureProgramming/og-image.png" },
  ]

  const existingMeta = new Set()
  document.querySelectorAll("meta[name], meta[property]").forEach((el) => {
    const key = el.getAttribute("name") || el.getAttribute("property")
    if (key) existingMeta.add(key)
  })

  metaTags.forEach((tag) => {
    const key = tag.name || tag.property
    if (!existingMeta.has(key)) {
      const meta = document.createElement("meta")
      if (tag.name) meta.setAttribute("name", tag.name)
      if (tag.property) meta.setAttribute("property", tag.property)
      meta.setAttribute("content", tag.content)
      document.head.appendChild(meta)
    }
  })

  // Add JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nisha Azure Lab Experiments",
    url: "https://narasimharao-kandula.github.io/AzureProgramming/",
    description: "Comprehensive Azure programming tutorials covering Blob Storage, Queue Storage, Table Storage, File Storage, Azure VMs, and more.",
    publisher: {
      "@type": "Person",
      name: "Nisha",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://narasimharao-kandula.github.io/AzureProgramming/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.textContent = JSON.stringify(jsonLd)
  document.head.appendChild(script)

  return null
}