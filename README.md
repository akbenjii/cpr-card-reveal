# Download
```
1. Install npcap @ https://nmap.org/npcap/dist/npcap-1.00.exe
2. Install the Card Revealer @ http://www.mediafire.com/file/faiqv4nac8o07yv/CPR_Card_Revealer.msi
3. Find your IPv4 address for your cuurent interface, (ethernet/wifi) 
   - How to find your IPv4?
   - If you can figure out if you're using ethernet or wifi type ipconfig in cmd prompt. Look for your adapter
     - Find "IPv4 Address. . . . . . . . . . . : 192.168.x.x" note; your ipv4 may be different. x as any number in range 255
   - For noobs:
     - Click the Start icon and select Settings.
     - Click the Network & Internet icon.
     Ethernet: 
     - Select Ethernet on the left menu pane and select your network connection, your IP address will appear next to "IPv4 Address".
     WiFi:
     - Select WiFi on the left menu pane and click Advanced Options, your IP address will appear next to "IPv4 Address".
4. to verify you chose the correct ipv4, walk around, or join a new room, the text should update from "not connected" to "connected"
5. win.
```

# Other
if you plan on downloading source (idk why u would) remeber you need npcap, and to use electron-rebuild to rebuild cap. 
```
handy dandy magic

Packaging: 
electron-packager . --platform=win32 --arch=x64 "CPR Card Revealer" --asar --icon="C:\Users\Guest1\Desktop\Projects\CPR Card Reveal\src\img\ico-ver.ico"

Then you can turn it into an installer, the end, happy happy. (strongly recommend you just download exe)
```

Links: 
https://nmap.org/npcap/

# Support
If you need support, join this discord!
https://discord.gg/XsgAd3h4yw
