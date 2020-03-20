---

feed:
  enable: true
  title: Build open jdk on Ubuntu
  description: How to build open JDK on Ubuntu
  image: /images/build-jdk.jpg
  date: 2020-03-19
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/build-jdk.jpg)

# Build and compile Open JDK

First of all we need to select the version. I need Open-JDK 13, therefore, in my case the version is jdk-13-ga.

Before checking out the repo, you need to install mercurial.

```
sudo apt-get install mercurial
```

Next step is to checkout correct version
```
hg clone --verbose http://hg.openjdk.java.net/jdk/jdk -r jdk-13-ga
```

Then you need to install additional libraries:
```
sudo apt-get install libcups2-dev
sudo apt-get install libasound2-dev
```

Configure the project
```
bash configure
```

Compile
```
make images
```

Run
```
./build/linux-x86_64-server-release/jdk/bin/java --version
```




