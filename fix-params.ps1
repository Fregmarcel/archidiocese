# Script pour corriger tous les params des pages Next.js 15
$baseDir = $PSScriptRoot

# Utiliser -LiteralPath pour gérer les crochets
$files = @(
    (Join-Path $baseDir "src\app\`[locale`]\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\admin\zones-paroissiales\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\agenda\affiches\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\agenda\videos\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\agenda\pdfs\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\homelies\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\ecrits\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\bibliographie\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\presse\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\reflexion\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\television\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\priere\page.tsx"),
    (Join-Path $baseDir "src\app\`[locale`]\services-diocesains\sedi\page.tsx")
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Traitement de $file..." -ForegroundColor Cyan
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Pattern pour détecter si c'est une page client ou server
        $isClientComponent = $content -match "^'use client'|^`"use client`""
        
        if ($isClientComponent) {
            # Pour les composants client, on garde params synchrone mais on await plus bas
            Write-Host "  -> Composant client détecté, aucune modification nécessaire" -ForegroundColor Yellow
        } else {
            # Pour les composants serveur, on doit faire params async
            # Pattern 1: { params }: { params: { locale: string } }
            $pattern1 = '\{ params \}: \{ params: \{ locale: string \} \}'
            $replacement1 = '{ params }: { params: Promise<{ locale: string }> }'
            
            if ($content -match $pattern1) {
                $content = $content -replace $pattern1, $replacement1
                
                # Remplacer const { locale } = params; par const { locale } = await params;
                $content = $content -replace 'const \{ locale \} = params;', 'const { locale } = await params;'
                
                Set-Content $file -Value $content -Encoding UTF8 -NoNewline
                Write-Host "  -> Modifié avec succès!" -ForegroundColor Green
            } else {
                Write-Host "  -> Aucune correspondance trouvée" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "Fichier non trouvé: $file" -ForegroundColor Red
    }
}

Write-Host "`nTerminé! Tous les fichiers ont été traités." -ForegroundColor Green
