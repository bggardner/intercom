# Background
My home ~~has~~ had an outdated intercom system (NuTone IM-3303) with a master station (with a tape deck!) and multiple room stations.  It still worked, but the faceplates had yellowed and the sound quality was poor.  Modern replacements systems are quite pricey, and probably wouldn't do everything I would want (and not be easily upgradable).  Being familiar with electronics and programming, I decided to try to create my own system out of Raspberry Pis.  This project describes how to recreate my system with the intent that others can reuse some or all of the components.

# Features
* Two-way voice
* Personalized dashboard (via PIN-based login)
* Weather

# Requirements
* Raspberry Pi
* Touchscreen
* Microphone/speaker/amplifier (for two-way voice)
* 3D Printer (for custom enclosure/faceplate)
* Server (dedicated recommended)
    * [Murmur/Mumble Server](https://wiki.mumble.info/wiki/Main_Page) (for two-way voice)
    * Webserver

# Installation
## Hardware
1. Install appropriate power wiring.  This can be done by replacing existing intercom wiring with properly rated electrical cabling or using PoE.  Consult your local codes or an electrician.
2. Assemble Raspberry Pi, touchscreen, microphone, speaker/amplifier, and 3D-printed housing/faceplate.
## Server Software
This guide assumes basic knowledge of a Debian-based operating system.  I used Ubuntu.
1. Install a Murmur/Mumble Server: `sudo apt install mumble-server` (for two-way voice)
    1. (optional) Configure at `/etc/mumble-server.ini`
2. Configure webserver.  I used `nginx`:
    1. Install: `sudo apt install nginx`
    2. Configure by using [etc.nginx.sites-enabled.default](server/etc.nginx.sites-enabled.default) as a reference and restart nginx: `sudo systemctl restart nginx`
    3. Link intercom path: `sudo ln -s /path/to/bggardner/intercom/server/www /var/www/html/intercom` (or copy it)
3.  Install [mumble-web-proxy](https://github.com/Johni0702/mumble-web-proxy):
    1. Compile and install build tools: `sudo apt install npm cargo`
    2. Follow [installation instructions](https://github.com/Johni0702/mumble-web-proxy/blob/master/README.md)
    3. Run at boot:
        1. Copy `server/mumble-web-proxy.service` to `/etc/systemd/system/`
        2. Edit `ExecStart` path to point to the compiled `mumble-web-proxy`
        3. `sudo systemctl daemon-reload`
        4. `sudo systemctl enable mumble-web-proxy.service`
        5. `sudo systemctl start mumble-web-proxy.service`
4. Compile [mumble-client](https://github.com/Johni0702/mumble-client) for the browser (from Node.js):
    1. `cd server/mumble-client-browser`
    2. `npm install`
    3. Link output: `sudo ln -s /path/to/bggardner/intercom/server/mumble-client-browser/dist/mumble-client-browser.js /var/www/html/intercom/mumble-client-browser.js` (or copy it)
## Intercom (Client) Software
1. Install [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) with desktop (not Lite, unless you know what you're doing).
2. Compile and install a custom version of Chromium.  Until [this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=257511#c_ts1549762643) is resolved, your touchscreen will not sleep.
    1. Install build dependencies: `sudo apt install g++-arm-linux-gnueabihf` (or maybe it was `g++-8-arm-linux-gnueabihf`)
    2. Follow the [Chromium build instructions](https://www.chromium.org/developers/how-tos/get-the-code) up until "Setting up the build"
    3. Set up the build for cross-compiling: `gn gen out/arm --args='target_cpu="arm" enable_nacl=false is_debug=false remove_webcore_debug_symbols=true'`
    4. Build: autoninja -C out/arm
    5. Copy binaries from `out/arm/` to `/opt/chromium/` on client: `chrome, icudtl.dat, *.bin, *.pak, locales/`
