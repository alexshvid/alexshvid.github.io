---

feed:
  enable: true
  title: Python3.7 installer
  description: Install Python3.7 on Ubuntu 18.04
  image: /images/python37.png
  date: 2020-12-13
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/python37.png)

# Install Python3.7 on Ubuntu 18.04

Run it
```
sudo apt-get update \
  && apt-get -y install software-properties-common curl && add-apt-repository ppa:deadsnakes/ppa -y && apt-get update && apt-get -y install python3.7-dev \
  && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 1 \
  && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3 get-pip.py --force-reinstall && rm get-pip.py \
  && pip install --upgrade pip setuptools wheel
```
