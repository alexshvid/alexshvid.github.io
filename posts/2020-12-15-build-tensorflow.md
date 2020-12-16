---

feed:
  enable: true
  title: Build tensorflow on Ubuntu 18.04
  description: How to build Tensorflow on Ubuntu 18.04
  image: /images/tensorflow.png
  date: 2020-12-15
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/tensorflow.png)

# How to build Tensorflow on Ubuntu 18.04

* Install Cuda 10.2 [here](/posts/2020-12-14-install-cuda-10.2.html)
* Install Basel 3.1.0
* Install Python3.7-dev [here](/posts/2020-12-13-install-python37.html)
* Install tensorflow 2.3.1 with additional python libs `pip3 install tensorflow==2.3.1`

Checkout tensorflow to local directory

```
git clone https://github.com/tensorflow/tensorflow
cd tensorflow
git checkout tags/v2.3.1
```

Configure tensorflow
```
./configure
```

Use my answers for CUDA 10.2 configure
```
ashvid@ashvid-MS-7C75:~/tensorflow$ ./configure
You have bazel 3.1.0 installed.
Please specify the location of python. [Default is /usr/bin/python3]:


Found possible Python library paths:
  /usr/lib/python3/dist-packages
  /usr/local/lib/python3.7/dist-packages
Please input the desired Python library path to use.  Default is [/usr/lib/python3/dist-packages]

Do you wish to build TensorFlow with OpenCL SYCL support? [y/N]: n
No OpenCL SYCL support will be enabled for TensorFlow.

Do you wish to build TensorFlow with ROCm support? [y/N]: n
No ROCm support will be enabled for TensorFlow.

Do you wish to build TensorFlow with CUDA support? [y/N]: y
CUDA support will be enabled for TensorFlow.

Do you wish to build TensorFlow with TensorRT support? [y/N]: n
No TensorRT support will be enabled for TensorFlow.

Found CUDA 10.2 in:
    /usr/local/cuda-10.2/targets/x86_64-linux/lib
    /usr/local/cuda-10.2/targets/x86_64-linux/include
Found cuDNN 7 in:
    /usr/lib/x86_64-linux-gnu
    /usr/include


Please specify a list of comma-separated CUDA compute capabilities you want to build with.
You can find the compute capability of your device at: https://developer.nvidia.com/cuda-gpus. Each capability can be specified as "x.y" or "compute_xy" to include both virtual and binary GPU code, or as "sm_xy" to only include the binary code.
Please note that each additional compute capability significantly increases your build time and binary size, and that TensorFlow only supports compute capabilities >= 3.5 [Default is: 6.1]:


Do you want to use clang as CUDA compiler? [y/N]: n
nvcc will be used as CUDA compiler.

Please specify which gcc should be used by nvcc as the host compiler. [Default is /usr/bin/gcc]:


Please specify optimization flags to use during compilation when bazel option "--config=opt" is specified [Default is -march=native -Wno-sign-compare]:


Would you like to interactively configure ./WORKSPACE for Android builds? [y/N]: n
Not configuring the WORKSPACE for Android builds.

Preconfigured Bazel build configs. You can use any of the below by adding "--config=<>" to your build command. See .bazelrc for more details.
--config=mkl         # Build with MKL support.
--config=monolithic   # Config for mostly static monolithic build.
--config=ngraph       # Build with Intel nGraph support.
--config=numa         # Build with NUMA support.
--config=dynamic_kernels # (Experimental) Build kernels into separate shared objects.
--config=v2           # Build TensorFlow 2.x instead of 1.x.
Preconfigured Bazel build configs to DISABLE default on features:
--config=noaws       # Disable AWS S3 filesystem support.
--config=nogcp       # Disable GCP support.
--config=nohdfs       # Disable HDFS support.
--config=nonccl       # Disable NVIDIA NCCL support.
Configuration finished
```

Build tensorflow
```
bazel build --config=opt --config=cuda //tensorflow/tools/pip_package:build_pip_package --verbose_failures
```

Time elapsed
```
INFO: Elapsed time: 2031.837s, Critical Path: 201.68s
INFO: 8526 processes: 8526 local.
INFO: Build completed successfully, 8548 total actions
```

Build whl file
```
bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg/
```

Download ready whl files
```
[v2.3.1-cuda10.2](https://github.com/alexshvid/tensorflow/releases/tag/v2.3.1-cuda10.2)
```
