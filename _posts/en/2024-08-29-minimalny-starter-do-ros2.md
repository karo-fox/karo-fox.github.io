---
layout: post
title: Minimal ROS 2 starter
description: Minimal starter for ROS 2 projects development in containerized environment.
date: 2024-08-29 11:19:29 +00:00
author: Karolina Kozubik
lang: en
---

Here's a minimal started for ROS 2 projects development with Docker. The code can be found on [my GitHub](https://github.com/karo-fox/minimal-ros2-starter).

## `Dockerfile`

```dockerfile
FROM ros:foxy

# Installing packages
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    git \
    cmake \
    # add more packages here
    && rm -rf /var/lib/apt/lists/*

# Creating an user and setting up privileges
RUN adduser --disabled-password --gecos '' docker && \
    adduser docker sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER docker

# Creating ROS working directory
WORKDIR /home/docker 
RUN mkdir -p ws/src
WORKDIR /home/docker/ws/src
ENV ROS_WORKSPACE=/home/docker/ws
RUN catkin init

WORKDIR $ROS_WORKSPACE

ENTRYPOINT [ "/ros_entrypoint.sh" ]
CMD ["/bin/bash"]
```

The image created will contain ready-to-go ROS environment.

## `scripts/setup.sh`

`/opt/ros/foxy/setup.bash` file has to be executed in the shell for ROS CLI to work. The same process has to be repeated in every terminal session we want to use ROS in. It is convenient to put the command in a script. We can also put additional commands to configure further packages in the project.

```sh
#!/bin/bash

source /opt/ros/foxy/setup.bash
# additional commands
```

## Running the environment
First, we have to build an image with:
```
docker build -t <image name> .
```

Then, we can run the container with:
```
docker run --rm -it \
    -e ROS_DOMAIN_ID=0 \
    -v .:<path/to/the/project> \
    <image name> /bin/bash
```

Some info about running the container:
- `i-` runs the container in interactive mode, `-t` let's us use the terminal 
- `-e ROS_DOMAIN_ID=0` sets the ROS domain ID
- `-v .:<path/to/the/project>` mount our local project files to the container
 
