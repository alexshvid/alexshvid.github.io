---

feed:
  enable: true
  title: Paperspace gives free GPU jupyter notebooks
  description: Public notebooks are free of charge.
  image: /images/notebooks.png
  date: 2019-10-10
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/notebooks.png)

# Paperspace gives free GPU jupyter notebooks

Free GPU public notebooks available by this [link](https://gradient.paperspace.com/free-gpu)

I already had tested and have got following results:

```
[name: "/device:CPU:0"
 device_type: "CPU"
 memory_limit: 268435456
 locality {
 }
 incarnation: 2747947754086435497, name: "/device:XLA_GPU:0"
 device_type: "XLA_GPU"
 memory_limit: 17179869184
 locality {
 }
 incarnation: 13608263606911692266
 physical_device_desc: "device: XLA_GPU device", name: "/device:XLA_CPU:0"
 device_type: "XLA_CPU"
 memory_limit: 17179869184
 locality {
 }
 incarnation: 2382052213133556090
 physical_device_desc: "device: XLA_CPU device", name: "/device:GPU:0"
 device_type: "GPU"
 memory_limit: 8026829620
 locality {
   bus_id: 1
   links {
   }
 }
 incarnation: 13249427477955116148
 physical_device_desc: "device: 0, name: Quadro M4000, pci bus id: 0000:00:05.0, compute capability: 5.2"]
```

Not bad, plus additionally they give preset datasets:

* celebA
* coco
* fastai
* lsun
* mnist
* openslr
* self-driving-demo-data
* selfie
* sentiment140
* stylegan
* tiny-imagenet-200

I like it!

Available local disk space on SSD is 32gb
