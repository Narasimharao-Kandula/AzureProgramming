#!/usr/bin/env node
// sync-from-obsidian.js
// Run this to copy files from your Obsidian vault to Quartz content folder

import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, statSync } from "fs"
import { join, resolve } from "path"

const OBSIDIAN_VAULT = "K:/Nisha/MyVault/AzureProgramming"
const QUARTZ_CONTENT = "K:/Nisha/MyVault/AzureProgramming/quartz/content"

const IGNORE = [".git", ".obsidian", "quartz", "node_modules", ".github", "public", "README.md", "package.json", "package-lock.json", "quartz.config.ts", ".gitignore", "sync-from-obsidian.js", "Untitled.md"]

function shouldIgnore(name: string): boolean {
  return IGNORE.some(pattern => name === pattern || name.startsWith(pattern))
}

function syncDir(src: string, dest: string) {
  if (!existsSync(src)) return
  
  const entries = readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    if (shouldIgnore(entry.name)) continue
    
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    
    if (entry.isDirectory()) {
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true })
      }
      syncDir(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
      console.log(`✓ Copied: ${entry.name}`)
    }
  }
}

console.log("🔄 Syncing from Obsidian vault to Quartz...")
syncDir(OBSIDIAN_VAULT, QUARTZ_CONTENT)
console.log("✅ Sync complete!")
console.log("\nNext steps:")
console.log("  cd quartz")
console.log("  git add .")
console.log("  git commit -m \"Sync from Obsidian\"")
console.log("  git push")