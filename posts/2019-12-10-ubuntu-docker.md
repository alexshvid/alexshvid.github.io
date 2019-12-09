---

feed:
  enable: true
  title: Install Docker support on Ubuntu 19.04
  description: How to install Docker on Ubuntu 19.04
  image: /images/docker.png
  date: 2019-12-09
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

