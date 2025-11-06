# PowerShell script to download iPhone 17 images
# Run this script from the img folder: .\download_images.ps1

$ErrorActionPreference = "Continue"

# Proxy configuration
$proxyHost = "109.104.153.100"
$proxyPort = "13282"
$proxyUser = "qlwzbkwVcZ3qbYHM"
$proxyPass = "qlwzbkwVcZ3qbYHM"
$proxyUrl = "http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}"

Write-Host "iPhone 17 Image Downloader" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "Using proxy: ${proxyHost}:${proxyPort}" -ForegroundColor Gray
Write-Host ""

# Create a function to download images with proxy
function Download-Image {
    param(
        [string]$FileName,
        [object]$Urls  # Can be string or array of strings
    )
    
    # Convert single URL to array
    if ($Urls -is [string]) {
        $Urls = @($Urls)
    }
    
    foreach ($Url in $Urls) {
        try {
            Write-Host "Trying: $FileName from ${Url}..." -NoNewline
            
            # Create proxy object
            $proxy = New-Object System.Net.WebProxy($proxyUrl)
            $proxy.Credentials = New-Object System.Net.NetworkCredential($proxyUser, $proxyPass)
            
            # Create web request with proxy
            $webClient = New-Object System.Net.WebClient
            $webClient.Proxy = $proxy
            $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
            
            # Download file
            $webClient.DownloadFile($Url, "$PWD\$FileName")
            $webClient.Dispose()
            
            # Check if file was downloaded and has reasonable size
            if (Test-Path "$PWD\$FileName") {
                $file = Get-Item "$PWD\$FileName"
                if ($file.Length -gt 5000) {  # At least 5KB
                    Write-Host " ✅ ($([math]::Round($file.Length/1KB,2)) KB)" -ForegroundColor Green
                    return $true
                } else {
                    Remove-Item "$PWD\$FileName" -Force
                    Write-Host " ⚠️ File too small, trying next URL..." -ForegroundColor Yellow
                }
            }
        } catch {
            # Suppress error output for cleaner display, continue to next URL
            Write-Host " ❌" -NoNewline -ForegroundColor Red
        }
    }
    
    Write-Host "   All URLs failed for $FileName" -ForegroundColor Red
    return $false
}

# iPhone 17 Standard images
# Trying multiple sources and URL patterns
Write-Host "iPhone 17 Standard Models:" -ForegroundColor Yellow
$iphone17Images = @{
    # Try Apple CDN first
    "iphone17black.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-black-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_black__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_black__d0z0jqjqjqjq_large.jpg",
        "https://cdn.mos.cms.futurecdn.net/yHEG9mEBVMbgyEnfDtqiP7-2560-80.jpg"
    )
    "iphone17white.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-white-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_white__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_white__d0z0jqjqjqjq_large.jpg"
    )
    "iphone17mistblue.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-mist-blue-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_mistblue__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_mistblue__d0z0jqjqjqjq_large.jpg"
    )
    "iphone17sage.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-sage-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_sage__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_sage__d0z0jqjqjqjq_large.jpg"
    )
    "iphone17lavender.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-lavender-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_lavender__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17/c/images/overview/hero/hero_iphone17_lavender__d0z0jqjqjqjq_large.jpg"
    )
}

foreach ($file in $iphone17Images.Keys) {
    Download-Image -FileName $file -Url $iphone17Images[$file]
}

# iPhone 17 Pro images
Write-Host ""
Write-Host "iPhone 17 Pro Models:" -ForegroundColor Yellow
$iphone17ProImages = @{
    "iphone17prosilver.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-silver-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_silver__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_silver__d0z0jqjqjqjq_large.jpg"
    )
    "iphone17procosmicorange.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-cosmic-orange-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_cosmicorange__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_cosmicorange__d0z0jqjqjqjq_large.jpg",
        "https://www.citypng.com/public/uploads/preview/orange-iphone-17-pro-max-back-view-png-11609137037.png",
        "https://cdn.mos.cms.futurecdn.net/yHEG9mEBVMbgyEnfDtqiP7-2560-80.jpg"
    )
    "iphone17prodeepblue.jpg" = @(
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-17-pro-deep-blue-select?wid=940&hei=1112&fmt=jpeg&qlt=90",
        "https://www.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_deepblue__d0z0jqjqjqjq_large.jpg",
        "https://images.apple.com/v/iphone-17-pro/c/images/overview/hero/hero_iphone17pro_deepblue__d0z0jqjqjqjq_large.jpg",
        "https://cdn.mos.cms.futurecdn.net/yHEG9mEBVMbgyEnfDtqiP7-2560-80.jpg"
    )
}

foreach ($file in $iphone17ProImages.Keys) {
    Download-Image -FileName $file -Url $iphone17ProImages[$file]
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Note: If downloads failed, you can manually download images from:" -ForegroundColor Cyan
Write-Host "  - https://www.apple.com/iphone-17/" -ForegroundColor White
Write-Host "  - https://www.apple.com/iphone-17-pro/" -ForegroundColor White
Write-Host ""
Write-Host "Save them with the correct filenames in this folder." -ForegroundColor Cyan

