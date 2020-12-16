---

feed:
  enable: true
  title: Install Nvidia-docker
  description: How to install nvidia docker on Ubuntu
  image: /images/docker.png
  date: 2020-12-17
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/nvidia-docker.png)

# How to install nvidia docker on Ubuntu

```
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add - 
distribution=$(. /etc/os-release;echo $ID$VERSION_ID) && echo $distribution
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update
sudo apt-get install -y nvidia-docker2
sudo systemctl restart docker
sudo systemctl status docker
```

Validate
```
docker run --runtime=nvidia --rm nvidia/cuda:10.2-base nvidia-smi
```
