---

feed:
  enable: true
  title: Install Docker support on Ubuntu 19.04
  description: How to install Docker on Ubuntu 19.04
  image: /images/docker.png
  date: 2019-12-10
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/docker.png)

# Install Docker support on Ubuntu 19.04

Installing docker is simple procedure, but making it workinf is another challenge.

1) First of all let's install docker application

Make system up-to-date

```
sudo apt-get update upgrade -y
```

Uninstall old docker is needed

```
sudo apt-get remove docker docker-engine docker.io
```

Install docker

```
sudo apt install docker.io
```

Automate startup

```
sudo systemctl start docker
sudo systemctl enable docker
```

Does it work?

```
docker --version
```

2) Add current user to docker group

Do not start and stop container on root user. It is totally wrong.
Docker comes with pre-created user group `docker`, so add permitted users to this group.

```
sudo usermod -aG docker $USER
```

Log out and log back in so that your group membership is re-evaluated

3) Start Nvidia virtual machine to for end-to-end test.

Did you see my previous post how to install eGPU?
So, let's run docker container with eGPU support!

```
docker run --runtime=nvidia --rm nvidia/cuda nvidia-smi
```

Ooops, I am getting
```
docker: Error response from daemon: Unknown runtime specified nvidia.
See 'docker run --help'.
```

It looks like for the systems with Nvidia GPU cards, I need to install 'nvidia-docker', special version of the docker container.

### Optional

Installing nvidia-docker

1) Add Nvidia repo to apt-get

```
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
echo $distribution
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
```

2) Install nvidia-docker 

```
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

3) Check if everything fine

```
nvidia-container-cli -V
```

I have this output

```
version: 1.0.5
build date: 2019-09-06T16:59+00:00
build revision: 13b836390888f7b7c7dca115d16d7e28ab15a836
build compiler: x86_64-linux-gnu-gcc-7 7.4.0
build platform: x86_64
build flags: -D_GNU_SOURCE -D_FORTIFY_SOURCE=2 -DNDEBUG -std=gnu11 -O2 -g -fdata-sections -ffunction-sections -fstack-protector -fno-strict-aliasing -fvisibility=hidden -Wall -Wextra -Wcast-align -Wpointer-arith -Wmissing-prototypes -Wnonnull -Wwrite-strings -Wlogical-op -Wformat=2 -Wmissing-format-attribute -Winit-self -Wshadow -Wstrict-prototypes -Wunreachable-code -Wconversion -Wsign-conversion -Wno-unknown-warning-option -Wno-format-extra-args -Wno-gnu-alignof-expression -Wl,-zrelro -Wl,-znow -Wl,-zdefs -Wl,--gc-sections
```

Install nvidia-docker

```
sudo apt-get install nvidia-docker2
```

Make sure that installation was succesfull

```
nvidia-docker -v
Docker version 18.09.7, build 2d0083d
```

Reboot to make sure that everything reload.

```
sudo reboot
```

Or restart docker service.

```
sudo systemctl restart docker
```

4) Make sure that everything works

```
docker run --runtime=nvidia --rm nvidia/cuda nvidia-smi
```

You have to see similar output

```
Mon Dec  9 09:34:45 2019       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 440.26       Driver Version: 440.26       CUDA Version: 10.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
```

5) Optional

After playing with docker you probably end up with bunch of contrainers that eat your space on disk and does not give you any value - garbage.

In order to see the list of them run

```
docker ps -a
```

In order delete all exited container run

```
docker ps -q -f 'status=exited' | xargs docker rm
```


Enjoy
