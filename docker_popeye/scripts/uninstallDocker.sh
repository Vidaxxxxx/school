#!bin/bash
cat << "EOF"
  _               _         _     _
 | |   ___  _ __ / | _ __  | |_  | |__   _   _
/ __) / __|| '__|| || '_ \ | __| | '_ \ | | | |             
\__ \| (__ | |   | || |_) || |_  | |_) || |_| |             
(   / \___||_|   |_|| .__/  \__| |_.__/  \__, |             
 |_|_     ____      |_| _      _   _    _|___/ _   _  _   _ 
|  _ \   / __ \ __   __/ |  __| | | |  / __ \ | | | || \ | |
| | | | / / _` |\ \ / /| | / _` | | | / / _` || | | ||  \| |
| |_| || | (_| | \ V / | || (_| | | || | (_| || |_| || |\  |
|____/  \ \__,_|  \_/  |_| \__,_| | | \ \__,_| \___/ |_| \_|
         \____/                   |_|  \____/
EOF


sudo dnf remove docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
