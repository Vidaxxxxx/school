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


sudo dnf remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine

sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
echo 'finished'
sudo docker version
