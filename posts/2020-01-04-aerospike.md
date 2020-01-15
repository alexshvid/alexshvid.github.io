---

feed:
  enable: true
  title: How to install Aerospike on Ubuntu 19.04
  description: How to install Aerospike on Ubuntu 19.04
  image: /images/aerospike.png
  date: 2020-01-04
  author:
    -
      name: Alex Shvid
      email: alex@shvid.com
      link: https://www.alexshvid.com
---

![](/images/aerospike.png)

# How to install Aerospike on Ubuntu 19.04

Download aerospike and AMC from vendor:
* https://www.aerospike.com/download/
* https://www.aerospike.com/download/amc/4.0.19/

Download by console:
```
wget https://www.aerospike.com/artifacts/aerospike-amc-community/4.0.27/aerospike-amc-community-4.0.27_amd64.deb
```

Unpack and install all .dep files by
```
sudo dpkg -i package_name.deb
```

Update Aerospike config in `/etc/aerospike/aerospike.conf`
```
service {
	paxos-single-replica-limit 1 # Number of nodes where the replica count is automatically reduced to 1.
	proto-fd-max 15000
  node-id-interface docker0
}

logging {
	file /var/log/aerospike/aerospike.log {
		context any info
	}
	console {
		context any info
        }
}

network {
	service {
		address localhost
		port 3000
	}

	heartbeat {
		mode multicast
		multicast-group 239.1.99.222
		port 9918

		# To use unicast-mesh heartbeats, remove the 3 lines above, and see
		# aerospike_mesh.conf for alternative.

		interval 150
		timeout 10
	}

	fabric {
                address localhost
		port 3001
	}

	info {
                address localhost
		port 3003
	}
}

namespace cache {
	replication-factor 2
	memory-size 4G
	default-ttl 30d # 30 days, use 0 to never expire/evict.

	storage-engine memory
}

namespace storage {
	replication-factor 2
	memory-size 4G
	default-ttl 0

	# To use file storage backing, comment out the line above and use the
	# following lines instead.
	storage-engine device {
		device /dev/sdX
		write-block-size 256K
		data-in-memory true
	}
}

```

Replace `device /dev/sdX` by your disk number for aerospike data.
Replace `node-id-interface docker0` to your interface name or make sure that docker was already installed.

Create log directory and file:
```
sudo mkdir /var/log/aerospike
sudo touch /var/log/aerospike/aerospike.log

```

Enable aerospike startup on boot
```
sudo systemctl enable aerospike
```

Edit aerospike service startup descriptor
```
sudo nano /lib/systemd/system/aerospike.service
```

Start aerospike service after docker
```
[Unit]
Description=Aerospike Server
After=docker.service
Wants=docker.service
...
```

Edit AMC config
```
sudo nano /etc/amc/amc.conf
```

Change bind address
```
bind = "127.0.0.1:8081"
```

Add entries
```
[amc.clusters]

[amc.clusters.as1]
host = "localhost"
port = 3000
alias = "as1"
show_in_ui = true

```

Start AMC on boot
```
sudo systemctl enable amc
```

Disable telemetry (Optional)
```
python /opt/aerospike/telemetry/telemetry.py /etc/aerospike/telemetry.conf --disable
```

Add this entry to /etc/hosts (Optional)
```
127.0.0.1       telemetry.aerospike.com
```

Reboot
```
sudo reboot
```

After reboot both aerospike and AMC must be started and you can open browser to see cluster status
```
open http://localhost:8081
```
