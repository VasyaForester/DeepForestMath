# Builds the academy site and copies the Python course into dist/python.
# Math and Python stay in separate folders.
# The zip contains dist at the archive root, without lesson-bg or stats-store.json.

$ErrorActionPreference = "Stop"
$math = Split-Path $PSScriptRoot -Parent
$python = Join-Path (Split-Path $math -Parent) "pythongenius\frontend"
$desktop = [Environment]::GetFolderPath("Desktop")
$zip = Join-Path $desktop "DeepForest-hosting.zip"

if (-not (Test-Path (Join-Path $python "package.json"))) {
  throw "Python course folder was not found: $python"
}

Write-Host "Build mathematics"
Push-Location $math
npm run build
if ($LASTEXITCODE -ne 0) { throw "Mathematics build failed" }
Pop-Location

Write-Host "Build Python"
Push-Location $python
$env:VITE_BASE = "/python/"
npm run build
$code = $LASTEXITCODE
Remove-Item Env:VITE_BASE -ErrorAction SilentlyContinue
Pop-Location
if ($code -ne 0) { throw "Python build failed" }

$target = Join-Path $math "dist\python"
if (Test-Path $target) { Remove-Item $target -Recurse -Force }
New-Item -ItemType Directory -Path $target | Out-Null
Copy-Item (Join-Path $python "dist\*") $target -Recurse -Force

foreach ($skip in @("lesson-bg", "stats-store.json")) {
  $path = Join-Path $math "dist\$skip"
  if (Test-Path $path) { Remove-Item $path -Recurse -Force }
}

if (Test-Path $zip) { Remove-Item $zip -Force }
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($zip, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  $root = (Resolve-Path (Join-Path $math "dist")).Path.TrimEnd('\')
  Get-ChildItem -Path $root -Recurse -File -Force | ForEach-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace('\', '/')
    [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal)
  }
} finally {
  $archive.Dispose()
}

Add-Type -AssemblyName System.IO.Compression
$archive = [System.IO.Compression.ZipFile]::OpenRead($zip)
$names = @($archive.Entries | ForEach-Object { $_.FullName })
$archive.Dispose()

$bad = @($names | Where-Object { $_ -like "lesson-bg*" -or $_ -like "*stats-store.json" })
if ($bad.Count -gt 0) { throw "Archive contains forbidden files: $($bad -join ', ')" }
if (-not ($names -contains ".htaccess")) { throw "Archive is missing .htaccess" }
if (-not ($names -contains "python/index.html")) { throw "Archive is missing the Python page" }

$item = Get-Item $zip
Write-Host ("zip=" + $item.FullName)
Write-Host ("bytes=" + $item.Length)
Write-Host ("python=" + (($names | Where-Object { $_ -like "python/*" }).Count))
