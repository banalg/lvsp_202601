# V14 - Prefixed Titles (ID - Label) for maximum clarity
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "MISE À JOUR DES METADONNEES (V14 - TITRE PREFIXE)..." -ForegroundColor Cyan

$basePath = "00_sons"
$tempPath = Join-Path $basePath "temp_meta"
if (-not (Test-Path $tempPath)) { New-Item -ItemType Directory -Path $tempPath | Out-Null }

$playlistContent = Get-Content "playlist.js" -Raw -Encoding UTF8
if ($playlistContent -match "const playlistData = (\[[\s\S]*?\])") {
    $playlist = $matches[1] | ConvertFrom-Json
}
else {
    Write-Host "ERREUR PLAYLIST" -ForegroundColor Red; exit 1
}

$albumName = "La sourici" + [char]232 + "re"
$copyright = "Sons provenant de https://sounddino.com/ ou autres assemblages libres ou non."

$counter = 1

foreach ($item in $playlist) {
    if (Test-Path (Join-Path $basePath $item.file)) {
        $inputFile = [System.IO.Path]::GetFullPath((Join-Path $basePath $item.file))
        $outputFile = [System.IO.Path]::GetFullPath((Join-Path $tempPath $item.file))
        $metaFile = [System.IO.Path]::GetFullPath((Join-Path $tempPath "meta.txt"))
        
        # Extract full ID (03_05_00)
        $fullId = if ($item.file -match "^(\d+_\d+_\d+)") { $matches[1] } else { $item.id }
        
        # Prefixed Title: "03_05_00 - Label"
        $prefixedTitle = "$fullId - $($item.label)"
        
        # Subtitle: filename without ID prefix
        $subtitle = $item.file -replace "^\d+_\d+_\d+_", "" -replace "\.mp3$", ""
        
        # Construct metadata
        $metaLines = @(
            ";FFMETADATA1",
            "title=$prefixedTitle",
            "artist=LVSP",
            "album=$albumName",
            "date=2026",
            "track=$counter",
            "TIT3=$subtitle",
            "comment=ID: $fullId",
            "copyright=$copyright"
        )
        [System.IO.File]::WriteAllLines($metaFile, $metaLines, $utf8NoBOM)
        
        # Run FFmpeg
        & ffmpeg -hide_banner -loglevel error -i "$inputFile" -i "$metaFile" -map_metadata 1 -id3v2_version 3 -codec copy -y "$outputFile"
            
        if ($LASTEXITCODE -eq 0) {
            Move-Item "$outputFile" "$inputFile" -Force
            Write-Host "OK -> $prefixedTitle (N°: $counter)" -ForegroundColor Green
            $counter++
        }
    }
}

Remove-Item $tempPath -Recurse -Force
Write-Host "TERMINE ! Les titres sont désormais préfixés par leur ID." -ForegroundColor Cyan
