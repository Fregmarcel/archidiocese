# Script pour corriger toutes les routes API avec params dynamiques
Write-Host "Recherche et correction des routes API..." -ForegroundColor Cyan

$files = Get-ChildItem -Path "src\app\api" -Filter "route.ts" -Recurse -File | Where-Object {
    $_.Directory.Name -match '\[.+\]'
}

$corrected = 0

foreach ($file in $files) {
    $relPath = $file.FullName -replace [regex]::Escape($PWD.Path + '\'), ''
    Write-Host ""
    Write-Host "Traitement: $relPath"
    
    $content = Get-Content -LiteralPath $file.FullName -Raw
    $original = $content
    
    # Pattern 1: context: { params: { paramName: type } }
    $content = $content -replace 'context: \{ params: \{ ([a-zA-Z]+): ([a-zA-Z]+) \} \}', 'context: { params: Promise<{ $1: $2 }> }'
    
    # Pattern 2: { params }: { params: { paramName: type } }
    $content = $content -replace '\{ params \}: \{ params: \{ ([a-zA-Z]+): ([a-zA-Z]+) \} \}', '{ params }: { params: Promise<{ $1: $2 }> }'
    
    # Fixer const { paramName } = params;  -> const { paramName } = await params;
    $content = $content -replace 'const \{ ([a-zA-Z]+) \} = (context\.)?params;', 'const { $1 } = await $2params;'
    
    # Fixer const paramName = params.paramName;  -> const paramName = (await params).paramName;
    $content = $content -replace 'const ([a-zA-Z]+) = (context\.)?params\.([a-zA-Z]+);', 'const $1 = (await $2params).$3;'
    
    if ($content -ne $original) {
        Set-Content -LiteralPath $file.FullName -Value $content -NoNewline
        Write-Host "  [OK] Corrige!" -ForegroundColor Green
        $corrected++
    } else {
        Write-Host "  - Aucune modification necessaire" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total de fichiers corriges: $corrected" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

