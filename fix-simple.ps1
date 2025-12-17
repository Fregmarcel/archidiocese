# Script simplifié pour corriger les params
$filesList = @(
    'src\app\[locale]\page.tsx',
    'src\app\[locale]\admin\zones-paroissiales\page.tsx',
    'src\app\[locale]\television\page.tsx',
    'src\app\[locale]\agenda\affiches\page.tsx',
    'src\app\[locale]\agenda\videos\page.tsx',
    'src\app\[locale]\agenda\pdfs\page.tsx',
    'src\app\[locale]\homelies\page.tsx',
    'src\app\[locale]\ecrits\page.tsx',
    'src\app\[locale]\bibliographie\page.tsx',
    'src\app\[locale]\presse\page.tsx',
    'src\app\[locale]\reflexion\page.tsx',
    'src\app\[locale]\priere\page.tsx',
    'src\app\[locale]\services-diocesains\sedi\page.tsx'
)

$corrected = 0

foreach ($relativePath in $filesList) {
    if (Test-Path -LiteralPath $relativePath) {
        Write-Host "Processing: $relativePath"
        
        $content = Get-Content -LiteralPath $relativePath -Raw
        
        # Ne pas modifier les composants 'use client'
        if ($content -notmatch "'use client'") {
            $original = $content
            
            # Fixer la signature de fonction
            $content = $content -replace '\{ params \}: \{ params: \{ locale: string \} \}', '{ params }: { params: Promise<{ locale: string }> }'
            
            # Fixer l'utilisation de params
            $content = $content -replace 'const \{ locale \} = params;', 'const { locale } = await params;'
            
            # S'assurer que la fonction est async si on utilise await
            if ($content -match 'await params') {
                $content = $content -replace '(export default) (function|async function)', '$1 async function'
            }
            
            if ($content -ne $original) {
                Set-Content -LiteralPath $relativePath -Value $content -NoNewline
                Write-Host "  Fixed!" -ForegroundColor Green
                $corrected++
            }
        } else {
            Write-Host "  Skipped (client component)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`nTotal fixed: $corrected"
