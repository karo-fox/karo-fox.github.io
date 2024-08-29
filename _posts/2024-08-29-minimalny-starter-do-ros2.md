---
layout: post
title: Minimalny starter do ROS 2
description: Minimalny starter do rozwoju projektów opartych o ROS 2 w skonteneryzowanym środowisku.
date: 2024-08-29 11:19:29 +00:00
author: Karolina Kozubik
---

Oto minimalny starter do rozwijania projektów opartych o ROS 2 za pomocą Dockera. Kod można znaleźć [na moim GitHubie](https://github.com/karo-fox/minimal-ros2-starter).

## `Dockerfile`

```dockerfile
FROM ros:foxy

# Instalowanie pakietów
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    git \
    cmake \
    # tutaj dodaj kolejne pakiety do zainstalowania
    && rm -rf /var/lib/apt/lists/*

# Tworzenie użytkownika i nadawanie mu uprawnień
RUN adduser --disabled-password --gecos '' docker && \
    adduser docker sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER docker

# Tworzenie katalogu roboczego dla ROS
WORKDIR /home/docker 
RUN mkdir -p ws/src
WORKDIR /home/docker/ws/src
ENV ROS_WORKSPACE=/home/docker/ws
RUN catkin init

WORKDIR $ROS_WORKSPACE

ENTRYPOINT [ "/ros_entrypoint.sh" ]
CMD ["/bin/bash"]
```

Utworzony obraz będzie zawierał gotowe do działania środowisko ROS.

## `scripts/setup.sh`

Żeby w danym terminalu mogły działać narzędzia konsolowe ROS, potrzebne jest wykonanie pliku `/opt/ros/foxy/setup.bash`. Proces ten należy powtórzyć w każdej sesji terminala, w której chcemy korzystać z ROSa. Wygodnie jest umieścić komendę w skrypcie. Możemy tu też umieścić własne komendy konfigurujące kolejne pakiety dodawane do projektu.

```sh
#!/bin/bash

source /opt/ros/foxy/setup.bash
# kolejne polecenia
```

## Uruchamianie środowiska
Najpierw budujemy obraz:
```
docker build -t <nazwa obrazu> .
```

Następnie można już uruchomić kontener:
```
docker run --rm -it \
    -e ROS_DOMAIN_ID=0 \
    -v .:<ścieżka/do/projektu> \
    <nazwa obrazu> /bin/bash
```

Kilka informacji dotyczących uruchamiania kontenera:
- `-i` uruchamia kontener w trybie interaktywnym, `-t` pozwala na korzystanie z terminala
- `-e ROS_DOMAIN_ID=0` ustawia ID domeny ROSa
- `-v .:<ścieżka/do/projektu>` podpina nasze lokalne pliki projektowe do kontenera
 
