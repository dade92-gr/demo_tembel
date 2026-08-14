@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

cd /d "D:\proyek website\website\LMS pembelajaran" || (
    echo ❌ ERROR: Gagal pindah ke direktori
    pause
    exit /b 1
)

echo.
echo ========================================
echo     PROSES UPDATE KE GITHUB (DEMO_TEMBEL)
echo ========================================
echo.

where git > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Git tidak ditemukan.
    pause
    exit /b 1
)

echo [1] Menambahkan semua file yang berubah...
git add .
if errorlevel 1 (
    echo ❌ ERROR: Gagal menambahkan file.
    pause
    exit /b 1
)
echo ✅ Berhasil menambahkan file.
echo.

git status --porcelain | findstr . > nul
if errorlevel 1 (
    echo ℹ️  Tidak ada perubahan yang perlu di-commit.
    pause
    exit /b 0
)

for /f "tokens=1-3 delims=/" %%a in ("%date%") do (
    set "dd=%%a"
    set "mm=%%b"
    set "yyyy=%%c"
)

for /f "tokens=1-3 delims=:." %%a in ("%time%") do (
    set "hh=%%a"
    set "min=%%b"
    set "ss=%%c"
)

set "hh=%hh: =0%"
set "tanggal_aman=%yyyy%-%mm%-%dd%_%hh%-%min%-%ss%"

echo [2] Menyimpan perubahan...
git commit -m "Auto update demo_tembel: %tanggal_aman%"
if errorlevel 1 (
    echo ❌ ERROR: Gagal commit.
    pause
    exit /b 1
)
echo ✅ Berhasil commit.
echo.

echo [3] Mengirim ke GitHub...
git push origin master
if errorlevel 1 (
    echo ❌ ERROR: Gagal push ke GitHub.
    echo    Mencoba force push...
    git push origin master --force
    if errorlevel 1 (
        echo ❌ ERROR: Gagal push juga.
        pause
        exit /b 1
    )
)
echo ✅ Berhasil push ke GitHub.
echo.

echo ========================================
echo ✅ UPDATE SELESAI!
echo ========================================
echo.

echo 📁 File yang baru saja diupdate:
git diff --name-only HEAD~1 HEAD
echo.

pause