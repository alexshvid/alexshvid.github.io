---

feed:
  enable: true
  title: Install Nvidia eGPU support on Ubuntu 19.04
  description: How to install NVidia drivers for eGPU on Ubuntu 19.04
  image: /images/egpu.jpeg
  date: 2019-12-09
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/egpu.jpeg)

# Install Nvidia eGPU support on Ubuntu 19.04

In Windows 10 installation process is staightforward. All you need is to download Nvidia drivers from nvidia.com and install them.
Additionally I would recommend to install CPU-Z for monitoring purposes.

In Ubuntu this process contains multiple steps and even after passing all of them there is no guarantee that something will work at the end.

Let's do steps that I found best for me.

First of all, Ubuntu asks you to manually approve any Thunderbolt3 device connected to the operation system. This is done for sequrity purposes, and we need to do this first.

1) Install thunderbolt-tools and allow your external eGPU device.

``` bash
sudo apt install thunderbolt-tools
```
To show all available devices run this command:

``` bash
tbtadm devices
```

My output is

```
tbtadm devices
0-1	Razer	Core X	authorized	not in ACL 
```

I have already authorized device, but you need to get first device id and autorize it by this command

```
tbtadm approve 0-1
```

2) Install Latest Nvidia drivers. 

Do not go to nvidia.com web-site, because thouse drivers are not optimal for your operation system. The better way is to install them by using package manager.

```
sudo add-apt-repository ppa:graphics-drivers/ppa
ubuntu-drivers devices
sudo ubuntu-drivers autoinstall
sudo reboot
```

You need to reboot, in order to have drivers in the system.

3) Install additional cuda tools, including prime

```
sudo apt install nvidia-cuda-toolkit
```

3) Register nvidia driver in X.

Make sure that nvidia-prime is installed and setup your intel as a primary device.
I did this because I am using Razer Core X, that does not have monitor, so, I still need to use intel driver to draw X.

```
prime-select intel
```

We need to generate config, or create it as empty file.
I would prefer to do mix of generated config and settings that I need.

```
sudo nvidia-xconfig
```

Finally, we need to edit config in order to have two drivers in the system

```
sudo nano /etc/X11/xorg.conf
```

This is my example config, for laptop with eGPU card. Here I am still using intel as a primary device, but also Allow Extenral GPU devices.

```
Section "ServerLayout"
    Identifier     "Layout0"
    Screen      0  "intel" 0 0
    InputDevice    "Keyboard0" "CoreKeyboard"
    InputDevice    "Mouse0" "CorePointer"
    Inactive       "nvidia"
EndSection

Section "Files"
EndSection

Section "InputDevice"
    # generated from default
    Identifier     "Mouse0"
    Driver         "mouse"
    Option         "Protocol" "auto"
    Option         "Device" "/dev/psaux"
    Option         "Emulate3Buttons" "no"
    Option         "ZAxisMapping" "4 5"
EndSection

Section "InputDevice"
    # generated from default
    Identifier     "Keyboard0"
    Driver         "kbd"
EndSection

Section "Monitor"
    Identifier     "Monitor0"
    VendorName     "Unknown"
    ModelName      "Unknown"
    Option         "DPMS"
EndSection

Section "Device"
    Identifier     "intel"
    Driver         "intel"
    VendorName     "Intel"
    Option "AllowExternalGpus"
EndSection

Section "Device"
    Identifier     "nvidia"
    Driver         "nvidia"
    VendorName     "NVIDIA Corporation"
    Option "AllowExternalGpus"
EndSection

Section "Screen"
    Identifier     "intel"
    Device         "intel"
    Monitor        "Monitor0"
    DefaultDepth    24
    SubSection     "Display"
        Depth       24
    EndSubSection
EndSection

```

I created this config as a mix of generated one and what settings I need.

Reboot

```
sudo reboot
```

4) Final step - Activation

In my case, after reboot, my nvidia driver still not activate. This is not a problem at all.

If you see this message:
```
nvidia-smi
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.
```

Run the following command to activate driver:

```
sudo modprobe nvidia-uvm
```

Now, after all those steps you can have this output

```
nvidia-smi
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 440.26       Driver Version: 440.26       CUDA Version: 10.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
...
```

Enjoy


