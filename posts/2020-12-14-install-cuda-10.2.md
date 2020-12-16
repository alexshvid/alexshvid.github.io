---

feed:
  enable: true
  title: Install CUDA 10.2 on Ubuntu 18.04
  description: How to install CUDA 10.2 on Ubuntu 18.04
  image: /images/cuda10.jpg
  date: 2020-12-14
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/cuda10.jpg)

# How to install CUDA 10.2 on Ubuntu 18.04

Download the 10-2 packages
```
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.2.89-1_amd64.deb
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub
sudo dpkg -i cuda-repo-ubuntu1804_10.2.89-1_amd64.deb
sudo apt-get update
wget http://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
sudo apt install ./nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
sudo apt-get update
```

Install the ubuntu drivers
```
sudo ubuntu-drivers autoinstall
```

Install the 10-2 versions of packages
```
apt-get install -y --no-install-recommends \
    cuda-10-2 \ 
    libcudnn7=7.6.5.32-1+cuda10.2  \
    libcudnn7-dev=7.6.5.32-1+cuda10.2 \
    libnvinfer7=7.0.0-1+cuda10.2 \
    libnvinfer-dev=7.0.0-1+cuda10.2 \
    libnvinfer-plugin7=7.0.0-1+cuda10.2\
    cuda-cudart-10-2
```
