export const ContentProtection = () => {
  if (typeof window === "undefined") return null

  const style = document.createElement("style")
  style.textContent = `
    /* Disable text selection except code blocks */
    body:not(.code-block-focused) {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    /* Allow selection in code blocks */
    pre, code, .highlight, .code-block {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
    
    /* Disable right-click context menu */
    body {
      -webkit-touch-callout: none;
    }
    
    /* Hide content from print */
    @media print {
      body { display: none !important; }
    }
    
    /* Disable drag and drop */
    img, video, audio, iframe {
      pointer-events: none;
      user-drag: none;
      -webkit-user-drag: none;
    }
    
    /* Allow interaction with code blocks */
    pre code, .highlight code {
      pointer-events: auto;
    }
  `
  document.head.appendChild(style)

  // Disable right-click
  const disableContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("pre, code, .highlight, .code-block")) {
      e.preventDefault()
      return false
    }
  }
  document.addEventListener("contextmenu", disableContextMenu)

  // Disable keyboard shortcuts (Ctrl+S, Ctrl+P, Ctrl+Shift+I, F12, etc.)
  const disableKeys = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement
    const isCodeBlock = target.closest("pre, code, .highlight, .code-block")
    
    // Allow copy (Ctrl+C) in code blocks
    if (e.ctrlKey && e.key === "c" && isCodeBlock) return
    
    // Block: Ctrl+S (save), Ctrl+P (print), Ctrl+Shift+I (devtools), F12, Ctrl+U (view source)
    if (
      (e.ctrlKey && (e.key === "s" || e.key === "p" || e.key === "u")) ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      e.key === "F12"
    ) {
      if (!isCodeBlock) {
        e.preventDefault()
        return false
      }
    }
    
    // Block Ctrl+A (select all) outside code blocks
    if (e.ctrlKey && e.key === "a" && !isCodeBlock) {
      e.preventDefault()
      return false
    }
  }
  document.addEventListener("keydown", disableKeys)

  // Disable drag
  const disableDrag = (e: DragEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("pre, code, .highlight, .code-block")) {
      e.preventDefault()
    }
  }
  document.addEventListener("dragstart", disableDrag)

  // Disable text selection outside code blocks
  const handleSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container
      if (element && !element.closest("pre, code, .highlight, .code-block")) {
        selection.removeAllRanges()
      }
    }
  }
  document.addEventListener("selectionchange", handleSelection)

  // Add copy buttons to code blocks
  const addCopyButtons = () => {
    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return
      
      const btn = document.createElement("button")
      btn.className = "copy-btn"
      btn.textContent = "Copy"
      btn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 10px;
        font-size: 12px;
        background: var(--secondary);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
        z-index: 10;
      `
      pre.style.position = "relative"
      pre.appendChild(btn)
      
      pre.addEventListener("mouseenter", () => btn.style.opacity = "1")
      pre.addEventListener("mouseleave", () => btn.style.opacity = "0")
      
      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent || pre.textContent
        try {
          await navigator.clipboard.writeText(code)
          btn.textContent = "Copied!"
          btn.style.background = "#22c55e"
          setTimeout(() => {
            btn.textContent = "Copy"
            btn.style.background = "var(--secondary)"
          }, 2000)
        } catch {
          btn.textContent = "Failed"
          setTimeout(() => btn.textContent = "Copy", 2000)
        }
      })
    })
  }
  
  // Run after content loads
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addCopyButtons)
  } else {
    addCopyButtons()
  }
  
  // Also run on SPA navigation
  document.addEventListener("astro:page-load", addCopyButtons)
  document.addEventListener("nav", addCopyButtons)

  return null
}