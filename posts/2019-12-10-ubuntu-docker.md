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


