---
home: true
heroImage: /images/brain.jpg
heroText: Alex Shvid's Blog
tagline: Let's talk about Deep Learning
actionText: Get Started →
actionLink: /posts/
features:
- title: Simplicity First
  details: Model must be simple enough to understand in first 10 minutes.
- title: Minimalistic Design
  details: More data - better model, less features - better speed, do not overfit.
- title: Precision & Accuracy
  details: Bias is the king, make sure that you are in the right direction.
footer: San Jose, CA | Copyright © 2019-present Alex Shvid
---

### Quick Start

Allow thunderbolt3 eGPU device on Ubuntu
``` bash
sudo apt install thunderbolt-tools
tbtadm devices
tbtadm approve 0-1
```

Install Nvidia driver on Ubuntu
``` bash
sudo add-apt-repository ppa:graphics-drivers/ppa
ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
sudo reboot
nvidia-smi
```

Check available devices

``` python
from tensorflow.python.client import device_lib

device_lib.list_local_devices()
```

