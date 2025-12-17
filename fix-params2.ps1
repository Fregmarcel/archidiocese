# Script pour corriger tous les params des pages Next.js 15
Write-Host "Recherche des fichiers page.tsx à corriger..." -ForegroundColor Cyan

# Trouver tous les fichiers page.tsx dans le dossier [locale]
$files = Get-ChildItem -Path "src\app" -Filter "page.tsx" -Recurse -File | Where-Object {
    $_.FullName -like "*``[locale``]*"
}

$correctedCount = 0
$skippedCount = 0

foreach ($fileInfo in $files) {
    $file = $fileInfo.FullName
    Write-Host "`nTraitement de $($fileInfo.FullName -replace [regex]::Escape($PWD.Path + '\'), '')..." -ForegroundColor Cyan
    
    $content = Get-Content -LiteralPath $file -Raw -Encoding UTF8
    
    # Pattern pour détecter si c'est une page client ou server
    $isClientComponent = $content -match "^'use client'|^`"use client`""
    
    if ($isClientComponent) {
        # Pour les composants client, pas de modification nécessaire
        Write-Host "  -> Composant client, pas de modification" -ForegroundColor Yellow
        $skippedCount++
    } else {
        # Pour les composants serveur
        $originalContent = $content
        
        # Pattern 1: { params }: { params: { locale: string } }
        $content = $content -replace '\{ params \}: \{ params: \{ locale: string \} \}', '{ params }: { params: Promise<{ locale: string }> }'
        
        # Remplacer const { locale } = params; par const { locale } = await params;
        $content = $content -replace '(\s+)const \{ locale \} = params;', '$1const { locale } = await params;'
        
        if ($content -ne $originalContent) {
            Set-Content -LiteralPath $file -Value $content -Encoding UTF8 -NoNewline
            Write-Host "  -> ✓ Modifié avec succès!" -ForegroundColor Green
            $correctedCount++
        } else {
            Write-Host "  -> Aucune correspondance trouvée" -ForegroundColor Gray
            $skippedCount++
        }
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "Résumé:" -ForegroundColor Cyan
Write-Host "  Fichiers corrigés: $correctedCount" -ForegroundColor Green
Write-Host "  Fichiers ignorés: $skippedCount" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
