---

feed:
  enable: true
  title: Set Scaling Governor
  description: This post is about how to write a script to set scaling governor in your computer.
  image: /images/scaling-governor.jpg
  date: 2019-12-30
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/scaling-governor.jpg)

# Set Scaling Governor

Recently, I assembled a nice laptop based on barebone system from Eluktronics, NB50TZ.

This system is amazing and I really like an idea of concept to buy separately body, CPU, memory and SSD.

Right now, I am using this laptop to write this post. So, this is I finally built:

* Eluktronics, NB50TZ - $250 from Eluktronics.com
* Intel i7 9700 - $280 from MicroCenter.com
* CORSAIR Vengeance Performance 32GB (2x16GB) 260-Pin DDR4 SO-DIMM DDR4 2666 (PC4 21300) Laptop Memory Model CMSX32GX4M2A2666C18 - $128 from Amazon.com
* WD Blue 3D NAND 1TB Internal PC SSD - SATA III 6 Gb/s, M.2 2280, Up to 560 MB/s - WDS100T2B0B - $88 from Amazon.com
* Ubuntu 19.10 - FREE

Total cost of my assembly is $746 + tax.

In order to test performance on Ubuntu, I installed performance tests suite from [phoronix-test-suite](https://www.phoronix-test-suite.com/?k=downloads) with CPU tests.

Second step is the preparation for CPU tests. All programs have to be closed and CPU clock frequency have to be scaled up.

The following picture shows the range of frequencies that CPU is using by default.

![](/images/clock-frequency-scaling-strategy.png)

As we see, we need to limit range on upper possible frequency to get the best performance tests results.
I have 8 independent cores in my i7, therefore I wrote the script to change scaling governor for all of them.

Here is the python script:
```
#!/bin/python3

import multiprocessing
import os
import sys

def choice_parser(v):
    val = int(v)
    if val == 1:
        return 'powersave'
    elif val == 2:
        return 'performance'
    else:
        print('Wrong value: %s' % val)
        sys.exit()

cpu_count = multiprocessing.cpu_count()

print('Set scaling governor for #%s cpus' % cpu_count)
print('Select scaling governor:')
print('1 for powersave')
print('2 for performance')
val = input(">>")
mode = choice_parser(val)

print('Your choice is %s' % mode)

for i in range(cpu_count):
    print("Set cpu #%s" % i)
    cmd = 'echo %s > /sys/devices/system/cpu/cpu%s/cpufreq/scaling_governor' % (mode, i)
    print(cmd)
    os.system(cmd)

os.system('cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor')
```

Selecting in this script parameter 2, moves all my settings to performance and changes frequency of cpu cores.

```
root@XXXXXX:~# ./set_scaling_governor.py
Set scaling governor for #8 cpus
Select scaling governor:
1 for powersave
2 for performance
>>2
Your choice is performance
Set cpu #0
echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
Set cpu #1
echo performance > /sys/devices/system/cpu/cpu1/cpufreq/scaling_governor
Set cpu #2
echo performance > /sys/devices/system/cpu/cpu2/cpufreq/scaling_governor
Set cpu #3
echo performance > /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor
Set cpu #4
echo performance > /sys/devices/system/cpu/cpu4/cpufreq/scaling_governor
Set cpu #5
echo performance > /sys/devices/system/cpu/cpu5/cpufreq/scaling_governor
Set cpu #6
echo performance > /sys/devices/system/cpu/cpu6/cpufreq/scaling_governor
Set cpu #7
echo performance > /sys/devices/system/cpu/cpu7/cpufreq/scaling_governor
performance
performance
performance
performance
performance
performance
performance
performance
```

Let's check the frequencies:
```
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
```

My output is here:
```
root@XXXXXX:~# cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
4538651
4542060
4589555
4562472
4596662
4598009
4583924
4579725
```

As we see here, my CPU now hot is ready for performance tests.

Let's run performance tests:
```
phoronix-test-suite run pts/cpu
```

My results are here:
```
Phoronix Test Suite v9.2.1
System Information

  PROCESSOR:          Intel Core i7-9700 @ 4.70GHz
    Core Count:       8                                        
    Extensions:       SSE 4.2 + AVX2 + AVX + RDRAND + FSGSBASE
    Cache Size:       12288 KB                                 
    Microcode:        0xca                                     
    Scaling Driver:   intel_pstate performance                 

  GRAPHICS:           Intel HD 3GB
    Frequency:        1200MHz            
    OpenGL:           4.5 Mesa 19.0.8    
    Display Driver:   modesetting 1.20.4
    Monitor:          ED273UR            
    Screen:           4480x1440          

  MOTHERBOARD:        Notebook NB50TZ
    BIOS Version:     1.07.03                                   
    Chipset:          Intel Cannon Lake PCH                     
    Audio:            Realtek ALC269VB                          
    Network:          Realtek RTL8111/8168/8411 + Intel-AC 9560

  MEMORY:             32768MB

  DISK:               1000GB Western Digital WDS100T2B0B + 512GB WorkflowD512
    File-System:      ext4                          
    Mount Options:    errors=remount-ro relatime rw
    Disk Scheduler:   MQ-DEADLINE                   

  OPERATING SYSTEM:   Ubuntu 19.04
    Kernel:           5.0.0-37-generic (x86_64)                                                            
    Desktop:          GNOME Shell 3.32.2                                                                   
    Display Server:   X Server 1.20.4                                                                      
    Compiler:         GCC 8.3.0                                                                            
    Security:         itlb_multihit: KVM: Mitigation of Split huge pages                                   
                      + l1tf: Not affected                                                                 
                      + mds: Not affected                                                                  
                      + meltdown: Not affected                                                             
                      + spec_store_bypass: Mitigation of SSB disabled via prctl and seccomp                
                      + spectre_v1: Mitigation of usercopy/swapgs barriers and __user pointer sanitization
                      + spectre_v2: Mitigation of Enhanced IBRS IBPB: conditional RSB filling              
                      + tsx_async_abort: Mitigation of TSX disabled
```

Tests:
```
Rodinia 2.4:
    pts/rodinia-1.2.2 [Test: OpenMP LavaMD]
    Test 1 of 5
    Estimated Trial Run Count:    3                             
    Estimated Test Run-Time:      10 Minutes                    
    Estimated Time To Completion: 1 Hour, 2 Minutes [23:41 PST]
        Started Run 1 @ 22:40:17
        Started Run 2 @ 22:41:12
        Started Run 3 @ 22:42:04

    Test: OpenMP LavaMD:
        50.24
        48.828
        49.789

    Average: 49.619 Seconds
    Deviation: 1.45%

    Result compared to 2,967 OpenBenchmarking.org samples since 7 November 2013; median result: 126. Box plot of samples:
    [                 |-------------------*-----------------------------####*#*#*#*]
                                            This Result (71st Percentile): 49.619 ^
                    AMD Athlon 5150: 1127 ^          Intel Xeon E5-1680 v3: 101 ^
                                                     Intel Core i7-7700K: 158 ^
                                                   Intel Core i7-5775C: 213 ^

Rodinia 2.4:
    pts/rodinia-1.2.2 [Test: OpenMP CFD Solver]
    Test 2 of 5
    Estimated Trial Run Count:    3                      
    Estimated Test Run-Time:      10 Minutes             
    Estimated Time To Completion: 52 Minutes [23:34 PST]
        Started Run 1 @ 22:43:04
        Started Run 2 @ 22:43:39
        Started Run 3 @ 22:44:13

    Test: OpenMP CFD Solver:
        30.535
        30.024
        30.22

    Average: 30.260 Seconds
    Deviation: 0.85%

    Result compared to 2,419 OpenBenchmarking.org samples since 7 November 2013; median result: 48.08. Box plot of samples:
    [                            |-------*-------------------------------#*##*#*#*|]
                                           This Result (64th Percentile): 30.260 ^
                        ARMv7 rev 3: 467 ^           Intel Xeon E3-1280 v5: 54 ^
                                                    Intel Core i7-3615QM: 78 ^
                                                 Intel Core i7-5600U: 113 ^

NAMD 2.13b1:
    pts/namd-1.0.1
    Test 3 of 5
    Estimated Trial Run Count:    3                      
    Estimated Test Run-Time:      9 Minutes              
    Estimated Time To Completion: 43 Minutes [23:27 PST]
        Started Run 1 @ 22:44:53
        Started Run 2 @ 22:47:36
        Started Run 3 @ 22:49:40

    ATPase Simulation - 327,506 Atoms:
        2.6188
        2.65091
        2.64322

    Average: 2.63764 days/ns
    Deviation: 0.64%

    Result compared to 1,439 OpenBenchmarking.org samples since 19 September 2018; median result: 1.79. Box plot of samples:
    [                         |----------------*----------------------*-#*###*!##*|]
                                      This Result (40th Percentile): 2.63764 ^
                      AMD Athlon II X4 630: 13 ^    2 x Intel Xeon E5-2683 v4: 1 ^
                                               Intel Xeon Silver 4108: 4 ^
                                                Intel Core i7-3770: 5 ^

x265 3.0:
    pts/x265-1.1.0
    Test 4 of 5
    Estimated Trial Run Count:    3                      
    Estimated Test Run-Time:      31 Minutes             
    Estimated Time To Completion: 35 Minutes [23:25 PST]
        Started Run 1 @ 22:51:52
        Started Run 2 @ 22:52:14
        Started Run 3 @ 22:52:36

    H.265 1080p Video Encoding:
        33.73
        32.94
        33.09

    Average: 33.25 Frames Per Second
    Deviation: 1.26%

    Result compared to 1,047 OpenBenchmarking.org samples since 4 February 2019; median result: 24.13. Box plot of samples:
    [ |-----------####################!########*##*#####------------*-*------*----|]
             This Result (68th Percentile): 33.25 ^
                       Intel Core i7-8700K: 31 ^     Intel Core i9-7960X: 52 ^
                                              Intel Core i7-9700K: 47 ^
                                           Intel Core i9-7980XE: 46 ^

7-Zip Compression 16.02:
    pts/compress-7zip-1.7.0
    Test 5 of 5
    Estimated Trial Run Count:    3                     
    Estimated Time To Completion: 4 Minutes [22:56 PST]
        Started Run 1 @ 22:53:05
        Started Run 2 @ 22:53:38
        Started Run 3 @ 22:54:11

    Compress Speed Test:
        32049
        31907
        32138

    Average: 32031 MIPS
    Deviation: 0.36%

    Result compared to 5,705 OpenBenchmarking.org samples since 3 January 2012; median result: 18883. Box plot of samples:
    [-###*!####*####-----------------------*------*------------|     *             ]
               ^ This Result (66th Percentile): 32031
         ^ AMD FX-6300: 15759   AMD Ryzen Threadripper 3970X: 190119 ^
                 2 x Intel Xeon Gold 6138: 134793 ^
                                           ^ POWER9 altivec supported: 114005

    Percentile Classification Of Current Benchmark Run
    PROCESSOR
        Rodinia
            OpenMP LavaMD:                      71st
            OpenMP CFD Solver:                  64th
        NAMD
            ATPase Simulation - 327,506 Atoms:  40th
        x265
            H.2.1.V.E:                          68th
        7-Zip Compression
            C.S.T:                              66th
                                                OpenBenchmarking.org Percentile

```
