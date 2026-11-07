@echo off
cd /d "C:\Users\Administrator\Desktop\Vanta Services"

git config user.name "abanob11hany11-dot"
git config user.email "286968760+abanob11hany11-dot@users.noreply.github.com"

if not exist .gitignore type nul>.gitignore
findstr /x /c:"node_modules" .gitignore >nul || echo node_modules>>.gitignore
findstr /x /c:".next" .gitignore >nul || echo .next>>.gitignore
findstr /x /c:".env" .gitignore >nul || echo .env>>.gitignore
findstr /x /c:".env.local" .gitignore >nul || echo .env.local>>.gitignore
findstr /x /c:".env.production" .gitignore >nul || echo .env.production>>.gitignore

if not exist .git (
  git init
)

git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/abanob11hany11-dot/vanta-service.git

git rm --cached --ignore-unmatch -q .env .env.local .env.production 2>nul

git add .
git commit -m "update %date% %time%"
git push -u origin main

echo.
echo Done.
pause
