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
    2. Compile and install build tools: `sudo apt install npm cargo`
    3. Clone/compile/run [Johni0702/mumble-web-proxy](https://github.com/Johni0702/mumble-web-proxy)
2. Install webserver.  I used `nginx`: `sudo apt install nginx`
    1. Follow the example `nginx.default` at `/etc/nginx/sites-enabled/default`
## Intercom (Client) Software
1. Install [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) with desktop (not Lite, unless you know what you're doing).
2. Compile and install a custom version of Chromium.  Until [this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=257511#c_ts1549762643) is resolved, your touchscreen will not sleep.
    1. Install build tools: `sudo apt install 
