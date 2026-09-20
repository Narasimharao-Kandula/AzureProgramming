@echo off
REM sync-from-obsidian.bat - Windows batch version
REM Copies files from Obsidian vault to Quartz content folder

set OBSIDIAN_VAULT=K:\Nisha\MyVault\AzureProgramming
set QUARTZ_CONTENT=K:\Nisha\MyVault\AzureProgramming\quartz\content

echo 🔄 Syncing from Obsidian vault to Quartz...

robocopy "%OBSIDIAN_VAULT%" "%QUARTZ_CONTENT%" /E /XD .git .obsidian quartz node_modules .github public /XF README.md package.json package-lock.json quartz.config.ts .gitignore sync-from-obsidian.js sync-from-obsidian.bat Untitled.md

echo ✅ Sync complete!
echo.
echo Next steps:
echo   cd quartz
echo   git add .
echo   git commit -m "Sync from Obsidian"
echo   git push
pause