import { QuartzEmitterPlugin } from "../types"

export const ContentProtection: QuartzEmitterPlugin = () => {
  return {
    name: "ContentProtection",
    async *emit(ctx, _content, _resources) {
      const protectionScript = `
        // Content Protection Script
        (function() {
          'use strict';
          
          // Disable right-click context menu (except code blocks)
          document.addEventListener('contextmenu', function(e) {
            const target = e.target;
            if (!target.closest('pre, code, .highlight, .code-block, .copy-btn')) {
              e.preventDefault();
              return false;
            }
          });
          
          // Disable keyboard shortcuts
          document.addEventListener('keydown', function(e) {
            const target = e.target;
            const isCodeBlock = target.closest('pre, code, .highlight, .code-block');
            
            // Allow copy (Ctrl+C) in code blocks
            if (e.ctrlKey && e.key === 'c' && isCodeBlock) return;
            
            // Block: Ctrl+S (save), Ctrl+P (print), Ctrl+Shift+I (devtools), F12, Ctrl+U (view source)
            if (
              (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) ||
              (e.ctrlKey && e.shiftKey && e.key === 'I') ||
              e.key === 'F12'
            ) {
              if (!isCodeBlock) {
                e.preventDefault();
                return false;
              }
            }
            
            // Block Ctrl+A (select all) outside code blocks
            if (e.ctrlKey && e.key === 'a' && !isCodeBlock) {
              e.preventDefault();
              return false;
            }
          });
          
          // Disable drag
          document.addEventListener('dragstart', function(e) {
            const target = e.target;
            if (!target.closest('pre, code, .highlight, .code-block')) {
              e.preventDefault();
            }
          });
          
          // Disable text selection outside code blocks
          document.addEventListener('selectionchange', function() {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const container = range.commonAncestorContainer;
              const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
              if (element && !element.closest('pre, code, .highlight, .code-block')) {
                selection.removeAllRanges();
              }
            }
          });
          
          // Add copy buttons to code blocks
          function addCopyButtons() {
            document.querySelectorAll('pre').forEach(function(pre) {
              if (pre.querySelector('.copy-btn')) return;
              
              const btn = document.createElement('button');
              btn.className = 'copy-btn';
              btn.textContent = 'Copy';
              btn.style.cssText = 'position:absolute;top:8px;right:8px;padding:4px 10px;font-size:12px;background:var(--secondary);color:white;border:none;border-radius:4px;cursor:pointer;opacity:0;transition:opacity 0.2s;z-index:10;';
              pre.style.position = 'relative';
              pre.appendChild(btn);
              
              pre.addEventListener('mouseenter', function() { btn.style.opacity = '1'; });
              pre.addEventListener('mouseleave', function() { btn.style.opacity = '0'; });
              
              btn.addEventListener('click', async function() {
                const code = pre.querySelector('code')?.textContent || pre.textContent;
                try {
                  await navigator.clipboard.writeText(code);
                  btn.textContent = 'Copied!';
                  btn.style.background = '#22c55e';
                  setTimeout(function() {
                    btn.textContent = 'Copy';
                    btn.style.background = 'var(--secondary)';
                  }, 2000);
                } catch {
                  btn.textContent = 'Failed';
                  setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
                }
              });
            });
          }
          
          // Run on load
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addCopyButtons);
          } else {
            addCopyButtons();
          }
          
          // Run on SPA navigation
          document.addEventListener('nav', addCopyButtons);
          document.addEventListener('astro:page-load', addCopyButtons);
          
          // Disable print
          const style = document.createElement('style');
          style.textContent = '@media print { body { display: none !important; } }';
          document.head.appendChild(style);
        })();
      `;
      
      yield {
        type: "static",
        slug: "static/scripts/content-protection.js",
        ext: ".js",
        content: Buffer.from(protectionScript),
      };
    },
    async *partialEmit() {},
  };
}