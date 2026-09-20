
# Collecting Your PC Information Before Starting

Good thinking — knowing your system specs upfront helps avoid surprises mid-experiment. Run these commands on your **local machine** (not inside any VM).

---

## Method 1: Quick System Summary (One Command)

Open **Command Prompt** or **PowerShell** (`Win + R` → type `cmd` → Enter):

```cmd
systeminfo
```

This gives you everything in one scroll. But for a cleaner view, run the individual commands below.

---

## Method 2: Individual Checks

### Operating System

```cmd
systeminfo | findstr /C:"OS Name" /C:"OS Version" /C:"System Type"
```

**What to look for:**
| Field | Ideal for This Experiment |
|---|---|
| OS Name | Windows 10/11 (any edition) |
| System Type | 64-bit operating system |

---

### Processor (CPU)

```cmd
wmic cpu get Name, NumberOfCores, NumberOfLogicalProcessors
```

**What to look for:**
| Field | Minimum | Recommended |
|---|---|---|
| Cores | 2 | 4+ |
| Logical Processors | 4 | 8+ |

---

### RAM (Memory)

```cmd
wmic memorychip get Capacity, Speed, Manufacturer
```

Also check usable RAM:

```cmd
systeminfo | findstr /C:"Total Physical Memory" /C:"Available Physical Memory"
```

**What to look for:**
| Scenario | RAM Needed |
|---|---|
| Bare minimum | 8 GB |
| Comfortable RDP + browser + docs | 12 GB+ |
| Ideal | 16 GB+ |

> If you have 8 GB, close heavy apps (Teams, Chrome with many tabs) before starting.

---

### Disk Space

```cmd
wmic logicaldisk get DeviceID, Size, FreeSpace, FileSystem
```

**What to look for:**
| Field | Minimum Free Space |
|---|---|
| C: drive | At least **15–20 GB** free |

You won't need much local disk — the heavy lifting is on the Azure VM. But RDP cache and browser data add up.

---

### Network Connection

```cmd
ipconfig | findstr /C:"IPv4" /C:"Default Gateway"
```

Also test internet speed (open PowerShell):

```powershell
curl https://fast.com -UseBasicParsing | Out-Null
Write-Host "Check browser at https://fast.com for speed test"
```

**What to look for:**
| Requirement | Minimum |
|---|---|
| Connection type | Wi-Fi or Ethernet |
| Speed | 10 Mbps+ download |
| Stability | Consistent (RDP is sensitive to drops) |

> Ethernet is always better than Wi-Fi for RDP sessions.

---

### Display Resolution

```powershell
powershell -command "Get-CimInstance Win32_VideoController | Select-Object Name, CurrentHorizontalResolution, CurrentVerticalResolution"
```

**What to look for:**
| Field | Recommended |
|---|---|
| Resolution | 1920×1080 (Full HD) or higher |

Higher resolution = more workspace inside the RDP window.

---

### Running This All at Once (PowerShell)

Copy-paste this entire block into **PowerShell (Admin)**:

```powershell
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   SYSTEM INFO FOR AZURE VM EXPERIMENT  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n--- OS ---" -ForegroundColor Yellow
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture | Format-List

Write-Host "--- CPU ---" -ForegroundColor Yellow
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors | Format-List

Write-Host "--- RAM ---" -ForegroundColor Yellow
$ram = Get-CimInstance Win32_ComputerSystem
$totalGB = [math]::Round($ram.TotalPhysicalMemory / 1GB, 2)
Write-Host "Total Physical Memory: $totalGB GB"
$os = Get-CimInstance Win32_OperatingSystem
$freeGB = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
Write-Host "Available Memory: $freeGB GB"

Write-Host "--- DISK ---" -ForegroundColor Yellow
Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3" |
    Select-Object DeviceID,
        @{N='SizeGB';E={[math]::Round($_.Size/1GB,2)}},
        @{N='FreeGB';E={[math]::Round($_.FreeSpace/1GB,2)}},
        FileSystem | Format-Table

Write-Host "--- DISPLAY ---" -ForegroundColor Yellow
Get-CimInstance Win32_VideoController |
    Select-Object Name, CurrentHorizontalResolution, CurrentVerticalResolution | Format-List

Write-Host "--- NETWORK ---" -ForegroundColor Yellow
Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -notlike "169.*" -and $_.IPAddress -ne "127.0.0.1" } |
    Select-Object InterfaceAlias, IPAddress | Format-Table

Write-Host "--- WINDOWS VERSION ---" -ForegroundColor Yellow
winver

Write-Host "========================================" -ForegroundColor Green
Write-Host "   SHARE THIS OUTPUT TO PROCEED          " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
```

---

## What To Share With Me

Once you run the commands, share these key details:

```
OS:           Windows 10/11 ?   Edition ?
CPU:          Processor name    Cores ?
RAM:          Total GB ?
Disk C:       Free space ?
Display:      Resolution ?
Internet:     Wi-Fi / Ethernet ?
```

With this info I can tell you:
- Whether your PC can handle the virtual desktop workflow smoothly
- If you need to close background apps
- Optimal RDP settings (color depth, resolution, resource sharing)
- Any potential bottlenecks before you hit them mid-experiment

-----------
----------


   SYSTEM INFO FOR AZURE VM EXPERIMENT                                                                                  ========================================                                                                                                                                                                                                        --- OS ---                                                                                                                                                                                                                                                                                                                                                              Caption        : Microsoft Windows 11 Pro                                                                               Version        : 10.0.26200                                                                                             OSArchitecture : 64-bit                                                                                                                                                                                                                                                                                                                                                                                                                                                                         --- CPU ---                                                                                                                                                                                                                                                                                                                                                             Name                      : Intel(R) Core(TM) i5-10310U CPU @ 1.70GHz                                                   NumberOfCores             : 4                                                                                           NumberOfLogicalProcessors : 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                   --- RAM ---                                                                                                             Total Physical Memory: 15.78 GB                                                                                         Available Memory: 4.69 GB                                                                                               --- DISK ---                                                                                                                                                                                                                                    DeviceID SizeGB FreeGB FileSystem                                                                                       -------- ------ ------ ----------                                                                                       C:       452.82 260.25 NTFS                                                                                             K:          250 239.25 NTFS                                                                                             N:          250 247.94 NTFS                                                                                                                                                                                                                                                                                                                                             --- DISPLAY ---                                                                                                                                                                                                                                                                                                                                                         Name                        : Idd Virtual Monitor                                                                       CurrentHorizontalResolution :                                                                                           CurrentVerticalResolution   :                                                                                                                                                                                                                   Name                        : Intel(R) UHD Graphics                                                                     CurrentHorizontalResolution : 1920                                                                                      CurrentVerticalResolution   : 1080                                                                                                                                                                                                                                                                                                                                                                                                                                                              --- NETWORK ---                                                                                                                                                                                                                                 InterfaceAlias IPAddress                                                                                                -------------- ---------                                                                                                Wi-Fi          192.168.29.212                                                                                                                                                                                                                                                                                                                                           --- WINDOWS VERSION ---                                                                                                 ========================================                                                                                   SHARE THIS OUTPUT TO PROCEED                                                                                         ========================================                                                                                PS C:\WINDOWS\system32> 