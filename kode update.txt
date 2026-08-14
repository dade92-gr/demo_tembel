@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

cd /d "D:\proyek website\website\LMS pembelajaran" || (
    echo ❌ ERROR: Gagal pindah ke direktori "D:\proyek website\website\LMS pembelajaran"
    echo    Pastikan folder tersebut ada.
    pause
    exit /b 1
)

echo.
echo ========================================
echo     PROSES UPDATE KE GITHUB (DEMO_TEMBEL)
echo ========================================
echo.

REM --- CEK GIT TERINSTALL ---
where git > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Git tidak ditemukan.
    echo    Pastikan Git sudah terinstall dan terdaftar di PATH.
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

REM --- CEK APAKAH ADA PERUBAHAN YANG AKAN DI-COMMIT ---
for /f "delims=" %%i in ('git status --porcelain') do set "ada_perubahan=1"
if not defined ada_perubahan (
    echo ℹ️  Tidak ada perubahan yang perlu di-commit.
    echo    Proses selesai.
    pause
    exit /b 0
)

REM --- FORMAT TANGGAL AMAN (YYYY-MM-DD_HH-MM-SS) ---
for /f "tokens=1-3 delims=/" %%a in ("%date%") do (
    set "dd=%%a"
    set "mm=%%b"
    set "yyyy=%%c"
)

REM Ambil jam dari %time% (format: HH:MM:SS,XX)
for /f "tokens=1-3 delims=:." %%a in ("%time%") do (
    set "hh=%%a"
    set "min=%%b"
    set "ss=%%c"
)

REM Hapus spasi jika jam < 10
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
git push origin main
if errorlevel 1 (
    echo ❌ ERROR: Gagal push ke GitHub.
    echo    Periksa koneksi internet dan pastikan Anda memiliki akses ke repository.
    pause
    exit /b 1
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

echo ========================================
pause