---

feed:
  enable: true
  title: Install Docker on Ubuntu 18.04
  description: How to install Docker on Ubuntu 18.04
  image: /images/docker.png
  date: 2020-12-18
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/docker.png)

# How to install Docker on Ubuntu 18.04

Prepare repository
```
sudo apt-get update && sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt-get update
apt-cache policy docker-ce
```

Install
```
sudo apt-get install docker-ce
sudo usermod -aG docker ${USER}
su - ${USER}
```

Validate
```
sudo systemctl status docker
docker info
```
