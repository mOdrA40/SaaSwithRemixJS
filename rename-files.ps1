# PowerShell script untuk rename file sesuai standar PascalCase
# Jalankan dari root directory project

Write-Host "🔄 Starting file rename process..." -ForegroundColor Green

# Define file mappings (old_name -> new_name)
$fileMappings = @{
    "app\components\ui\input.tsx" = "Input.tsx"
    "app\components\ui\label.tsx" = "Label.tsx"
    "app\components\ui\loading.tsx" = "Loading.tsx"
    "app\components\ui\data-table.tsx" = "DataTable.tsx"
    "app\components\ui\command-palette.tsx" = "CommandPalette.tsx"
    "app\components\ui\notification-center.tsx" = "NotificationCenter.tsx"
    "app\lib\query-client.ts" = "queryClient.ts"
}

# Function to rename file safely
function Rename-FilesSafely {
    param($oldPath, $newName)
    
    $directory = Split-Path $oldPath -Parent
    $newPath = Join-Path $directory $newName
    
    if (Test-Path $oldPath) {
        if (Test-Path $newPath) {
            Write-Host "⚠️  Target file already exists: $newPath" -ForegroundColor Yellow
            return $false
        }
        
        try {
            Rename-Item $oldPath $newName
            Write-Host "✅ Renamed: $oldPath -> $newName" -ForegroundColor Green
            return $true
        }
        catch {
            Write-Host "❌ Failed to rename: $oldPath" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
            return $false
        }
    }
    else {
        Write-Host "⚠️  Source file not found: $oldPath" -ForegroundColor Yellow
        return $false
    }
}

# Rename files
foreach ($mapping in $fileMappings.GetEnumerator()) {
    Rename-FilesSafely $mapping.Key $mapping.Value
}

Write-Host "🎉 File rename process completed!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update import statements in all files" -ForegroundColor White
Write-Host "   2. Run 'bun run typecheck' to verify no errors" -ForegroundColor White
Write-Host "   3. Test the application" -ForegroundColor White
