# Script d'import des zones pastorales
$textContent = Get-Content "d:\Marcel\archidiocese\Zone pastoral.txt" -Raw -Encoding UTF8

$body = @{
    text = $textContent
    replace = $true
} | ConvertTo-Json -Depth 10

try {
    Write-Host "Import en cours..."
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/pastoral-zones/import-from-text" -Method POST -ContentType "application/json; charset=utf-8" -Body $body
    Write-Host "Import réussi !"
    Write-Host $response
} catch {
    Write-Host "Erreur lors de l'import :"
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Host "Réponse du serveur: $responseBody"
    }
}
