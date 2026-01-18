# NetWorkLearn - Complete Questions & Answers Reference

This document contains all questions and answers from the game, organized by section.

---

## 📚 SECTION 1: OSI Model Foundations (Levels 1-10)

### Level 1: What is a Network?
**Concepts:**
- A network is a group of two or more computers connected together to share resources and communicate.
- Networks can be as small as two laptops connected via WiFi, or as large as the internet connecting billions of devices worldwide.
- Networks allow us to share files, printers, internet connections, and even play games together!

**Question:** What is the primary purpose of a computer network?
| Option | Answer |
|--------|--------|
| A | To make computers run faster |
| B | **To connect devices and share resources** ✓ |
| C | To protect against viruses |
| D | To store data on hard drives |

---

### Level 2: Why Do We Need Models?
**Concepts:**
- The OSI (Open Systems Interconnection) model is a framework that describes how data travels across a network.
- It breaks down communication into 7 layers, making it easier to understand, troubleshoot, and design networks.
- Think of it like building a house - you need blueprints to ensure everyone works together correctly!

**Question:** The OSI model was created to standardize network communication.
| Option | Answer |
|--------|--------|
| A | **True** ✓ |
| B | False |

---

### Level 3: Physical Layer - Cables & Signals
**Concepts:**
- Layer 1 (Physical Layer) deals with the actual hardware: cables, connectors, and electrical signals.
- Common cable types include: Ethernet (Cat5/Cat6), Fiber Optic, and Coaxial cables.
- This layer converts data into electrical pulses, light signals, or radio waves for transmission.

**Question:** Which cable type uses light to transmit data?
| Option | Answer |
|--------|--------|
| A | Ethernet Cat5 |
| B | **Fiber Optic** ✓ |
| C | Coaxial |
| D | USB |

---

### Level 4: Physical Layer - Bits & Transmission
**Concepts:**
- At the Physical Layer, all data is converted to BITS - the smallest unit of data (0s and 1s).
- These bits travel through cables as electrical voltages or light pulses at incredible speeds.
- The Physical Layer also defines specifications like cable length limits and connector types.

**Question:** What is the smallest unit of data transmitted at the Physical Layer?
| Option | Answer |
|--------|--------|
| A | Byte |
| B | Packet |
| C | **Bit** ✓ |
| D | Frame |

---

### Level 5: Data Link Layer - MAC Addresses
**Concepts:**
- Layer 2 (Data Link) uses MAC addresses to identify devices on a local network.
- A MAC address is a unique 48-bit identifier burned into every network interface card (NIC).
- Format example: AA:BB:CC:DD:EE:FF - the first half identifies the manufacturer!

**Question:** Which format represents a valid MAC address?
| Option | Answer |
|--------|--------|
| A | 192.168.1.1 |
| B | **AA:BB:CC:DD:EE:FF** ✓ |
| C | www.example.com |
| D | 255.255.255.0 |

---

### Level 6: Data Link Layer - Frames & Switches
**Concepts:**
- The Data Link Layer packages data into FRAMES, adding source and destination MAC addresses.
- Switches operate at this layer, using MAC address tables to forward frames to the correct port.
- This layer also handles error detection using checksums to verify data integrity.

**Question:** What data unit is used at the Data Link Layer?
| Option | Answer |
|--------|--------|
| A | Bits |
| B | Packets |
| C | **Frames** ✓ |
| D | Segments |

---

### Level 7: Network Layer - IP Addresses
**Concepts:**
- Layer 3 (Network Layer) uses IP addresses to route data between different networks.
- IP addresses are logical addresses that can be changed, unlike physical MAC addresses.
- IPv4 format: 192.168.1.1 (four numbers from 0-255, separated by dots)

**Question:** Which is a valid IPv4 address format?
| Option | Answer |
|--------|--------|
| A | AA:BB:CC:DD:EE:FF |
| B | **192.168.1.1** ✓ |
| C | www.google.com |
| D | http://example.com |

---

### Level 8: Network Layer - Routing Basics
**Concepts:**
- Routers operate at Layer 3, determining the best path for data to travel between networks.
- They use routing tables to make forwarding decisions based on destination IP addresses.
- Routing is like GPS navigation - finding the optimal route from source to destination!

**Question:** What device operates primarily at the Network Layer to route data?
| Option | Answer |
|--------|--------|
| A | Hub |
| B | Switch |
| C | **Router** ✓ |
| D | Repeater |

---

### Level 9: Transport Layer - TCP vs UDP
**Concepts:**
- Layer 4 (Transport) manages end-to-end communication with two main protocols: TCP and UDP.
- TCP is reliable but slower - it guarantees delivery (like certified mail with tracking).
- UDP is fast but unreliable - no guarantee of delivery (like regular mail).

**Question:** Which protocol guarantees data delivery at the Transport Layer?
| Option | Answer |
|--------|--------|
| A | UDP |
| B | **TCP** ✓ |
| C | IP |
| D | HTTP |

---

### Level 10: Upper Layers Overview
**Concepts:**
- Layer 5 (Session) manages connections between applications - starting and ending conversations.
- Layer 6 (Presentation) handles data formatting, encryption, and compression.
- Layer 7 (Application) is where users interact - web browsers, email clients, etc.

**Question:** Which layer handles encryption and data formatting?
| Option | Answer |
|--------|--------|
| A | Session Layer (5) |
| B | **Presentation Layer (6)** ✓ |
| C | Application Layer (7) |
| D | Transport Layer (4) |

---

## 📚 SECTION 2: TCP/IP Model (Levels 11-18)

### Level 11: TCP/IP Model Overview
**Concepts:**
- The TCP/IP model is the practical implementation used on the internet today.
- It has 4 layers instead of OSI's 7: Network Access, Internet, Transport, and Application.
- This model was developed by the US Department of Defense and powers the modern internet!

**Question:** How many layers does the TCP/IP model have?
| Option | Answer |
|--------|--------|
| A | 3 |
| B | **4** ✓ |
| C | 5 |
| D | 7 |

---

### Level 12: OSI vs TCP/IP Comparison
**Concepts:**
- OSI is a theoretical framework with 7 layers; TCP/IP is practical with 4 layers.
- OSI's top 3 layers (Application, Presentation, Session) combine into TCP/IP's Application layer.
- OSI's Physical and Data Link combine into TCP/IP's Network Access layer.

**Question:** The TCP/IP Application layer combines how many OSI layers?
| Option | Answer |
|--------|--------|
| A | 1 |
| B | 2 |
| C | **3** ✓ |
| D | 4 |

---

### Level 13: Network Access Layer
**Concepts:**
- The Network Access Layer handles physical hardware and data framing.
- It combines OSI Layers 1 (Physical) and 2 (Data Link) into one layer.
- Protocols here include Ethernet, WiFi (802.11), and PPP.

**Question:** Which protocol operates at the Network Access Layer?
| Option | Answer |
|--------|--------|
| A | HTTP |
| B | TCP |
| C | **Ethernet** ✓ |
| D | DNS |

---

### Level 14: Internet Layer
**Concepts:**
- The Internet Layer handles logical addressing and routing between networks.
- Key protocols: IP (addressing), ICMP (error messages), ARP (address resolution).
- This layer corresponds to OSI Layer 3 (Network Layer).

**Question:** Which protocol is used for error messages at the Internet Layer?
| Option | Answer |
|--------|--------|
| A | IP |
| B | **ICMP** ✓ |
| C | TCP |
| D | UDP |

---

### Level 15: Transport Layer Deep Dive
**Concepts:**
- TCP provides reliable, ordered delivery with error checking and flow control.
- UDP provides fast, connectionless delivery without guarantees.
- Port numbers (0-65535) identify specific applications on a host.

**Question:** For video streaming, which protocol is typically preferred?
| Option | Answer |
|--------|--------|
| A | TCP |
| B | **UDP** ✓ |
| C | IP |
| D | ICMP |

---

### Level 16: Application Layer Overview
**Concepts:**
- The Application Layer is where user-facing services operate.
- Examples: HTTP (web), SMTP (email), FTP (file transfer), DNS (domain names).
- This layer handles data formatting and user interface functions.

**Question:** Which protocol is used for sending emails?
| Option | Answer |
|--------|--------|
| A | HTTP |
| B | FTP |
| C | **SMTP** ✓ |
| D | DNS |

---

### Level 17: Encapsulation Process
**Concepts:**
- Encapsulation is wrapping data with headers as it moves down the layers.
- Data → Segment (Transport) → Packet (Internet) → Frame (Network Access).
- Each layer adds its own control information to the data.

**Question:** What is the correct order of data encapsulation?
| Option | Answer |
|--------|--------|
| A | Frame → Packet → Segment → Data |
| B | **Data → Segment → Packet → Frame** ✓ |
| C | Packet → Frame → Data → Segment |
| D | Segment → Data → Frame → Packet |

---

### Level 18: Data Flow Through Layers
**Concepts:**
- When sending: data flows DOWN through layers (Application → Network Access).
- When receiving: data flows UP through layers (Network Access → Application).
- Each layer processes only its relevant information - this is called layer independence.

**Question:** When receiving data, which direction does it flow through the TCP/IP layers?
| Option | Answer |
|--------|--------|
| A | Down (Application to Network Access) |
| B | **Up (Network Access to Application)** ✓ |
| C | Sideways |
| D | It doesn't flow through layers |

---

## 📚 SECTION 3: IP Addressing (Levels 19-28)

### Level 19: What is an IP Address?
**Concepts:**
- An IP address is a unique numerical identifier for devices on a network.
- Think of it like a postal address - it tells the network where to deliver data.
- Every device connected to the internet needs an IP address to communicate.

**Question:** An IP address serves as a unique identifier for devices on a network.
| Option | Answer |
|--------|--------|
| A | **True** ✓ |
| B | False |

---

### Level 20: IPv4 Structure
**Concepts:**
- IPv4 addresses are 32 bits long, written as four decimal numbers (octets).
- Each octet ranges from 0 to 255, separated by dots (dotted decimal notation).
- Example: 192.168.1.100 - each number represents 8 bits (1 byte).

**Question:** How many bits are in an IPv4 address?
| Option | Answer |
|--------|--------|
| A | 16 |
| B | 24 |
| C | **32** ✓ |
| D | 64 |

---

### Level 21: IP Address Classes
**Concepts:**
- Class A: 1.0.0.0 - 126.255.255.255 (large networks, millions of hosts)
- Class B: 128.0.0.0 - 191.255.255.255 (medium networks, thousands of hosts)
- Class C: 192.0.0.0 - 223.255.255.255 (small networks, 254 hosts max)

**Question:** Which class is IP address 172.16.5.10?
| Option | Answer |
|--------|--------|
| A | Class A |
| B | **Class B** ✓ |
| C | Class C |
| D | Class D |

---

### Level 22: Public vs Private IP
**Concepts:**
- Public IPs are globally unique and routable on the internet.
- Private IPs are used within local networks and are not internet-routable.
- Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x

**Question:** Which IP address is a private address?
| Option | Answer |
|--------|--------|
| A | 8.8.8.8 |
| B | **192.168.1.1** ✓ |
| C | 1.1.1.1 |
| D | 74.125.224.72 |

---

### Level 23: Subnet Masks Basics
**Concepts:**
- A subnet mask separates the network portion from the host portion of an IP.
- Common masks: 255.255.255.0 (/24), 255.255.0.0 (/16), 255.0.0.0 (/8).
- The network portion identifies which network; the host portion identifies the device.

**Question:** What does a subnet mask help determine?
| Option | Answer |
|--------|--------|
| A | Internet speed |
| B | **Network vs host portion of IP** ✓ |
| C | Device manufacturer |
| D | Cable type |

---

### Level 24: Default Gateways
**Concepts:**
- A default gateway is the router IP that devices use to reach other networks.
- It's the 'door' to leave your local network and access the internet.
- Typically the first or last usable IP in a subnet (e.g., 192.168.1.1).

**Question:** What is the purpose of a default gateway?
| Option | Answer |
|--------|--------|
| A | Assign IP addresses |
| B | **Route traffic to other networks** ✓ |
| C | Block viruses |
| D | Store website data |

---

### Level 25: DHCP Basics
**Concepts:**
- DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses.
- Process: Discover → Offer → Request → Acknowledge (DORA).
- Eliminates manual IP configuration and prevents address conflicts.

**Question:** What does DHCP automatically assign to devices?
| Option | Answer |
|--------|--------|
| A | MAC addresses |
| B | **IP addresses** ✓ |
| C | Website URLs |
| D | Passwords |

---

### Level 26: Static vs Dynamic IP
**Concepts:**
- Static IPs are manually configured and never change - good for servers.
- Dynamic IPs are assigned by DHCP and may change over time - common for clients.
- Servers typically use static IPs so their address remains constant.

**Question:** Which type of IP is best for a web server?
| Option | Answer |
|--------|--------|
| A | Dynamic |
| B | **Static** ✓ |
| C | Private only |
| D | None |

---

### Level 27: IPv6 Introduction
**Concepts:**
- IPv6 uses 128 bits (vs IPv4's 32), providing virtually unlimited addresses.
- Written in hexadecimal: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- Created because IPv4 addresses are running out (only ~4.3 billion).

**Question:** How many bits are in an IPv6 address?
| Option | Answer |
|--------|--------|
| A | 32 |
| B | 64 |
| C | 96 |
| D | **128** ✓ |

---

### Level 28: IPv4 vs IPv6
**Concepts:**
- IPv4: 32-bit, decimal notation, NAT required, ~4.3 billion addresses.
- IPv6: 128-bit, hexadecimal, built-in security (IPsec), unlimited addresses.
- Both currently coexist, with gradual transition to IPv6 happening worldwide.

**Question:** Which IP version has built-in security features?
| Option | Answer |
|--------|--------|
| A | IPv4 |
| B | **IPv6** ✓ |
| C | Both equally |
| D | Neither |

---

## 📚 SECTION 4: Network Devices (Levels 29-42)

### Level 29: Network Interface Card
**Concepts:**
- A NIC (Network Interface Card) connects a computer to a network.
- Each NIC has a unique MAC address burned into its hardware.
- NICs can be wired (Ethernet) or wireless (WiFi adapters).

**Question:** What unique address does every NIC have?
| Option | Answer |
|--------|--------|
| A | IP address |
| B | **MAC address** ✓ |
| C | URL |
| D | DNS name |

---

### Level 30: Hubs - Simple Broadcasters
**Concepts:**
- A hub is a basic device that connects multiple computers in a network.
- It broadcasts data to ALL ports - inefficient and causes collisions.
- Hubs are outdated; switches have largely replaced them.

**Question:** A hub sends data to which ports?
| Option | Answer |
|--------|--------|
| A | Only the destination |
| B | **All ports** ✓ |
| C | Random ports |
| D | No ports |

---

### Level 31: Switches - Smart Traffic
**Concepts:**
- Switches learn MAC addresses and forward frames only to the correct port.
- They maintain a MAC address table for efficient data delivery.
- Much more efficient than hubs - no unnecessary traffic!

**Question:** Switches use which type of address for forwarding?
| Option | Answer |
|--------|--------|
| A | IP |
| B | **MAC** ✓ |
| C | URL |
| D | DNS |

---

### Level 32: Routers - Network Navigators
**Concepts:**
- Routers connect different networks and make routing decisions using IP addresses.
- They use routing tables to determine the best path for packets.
- Your home router connects your local network to your ISP's network.

**Question:** Routers operate at which OSI layer?
| Option | Answer |
|--------|--------|
| A | Layer 1 |
| B | Layer 2 |
| C | **Layer 3** ✓ |
| D | Layer 4 |

---

### Level 33: Hub vs Switch vs Router
**Concepts:**
- Hub: Broadcasts to all (Layer 1), Switch: Uses MAC addresses (Layer 2)
- Router: Uses IP addresses (Layer 3), connects different networks
- Each device operates at a different OSI layer with increasing intelligence.

**Question:** Which device is the most intelligent?
| Option | Answer |
|--------|--------|
| A | Hub |
| B | Switch |
| C | **Router** ✓ |
| D | Cable |

---

### Level 34: Modems - Digital to Analog
**Concepts:**
- A modem (modulator-demodulator) converts digital signals to analog and vice versa.
- Cable modems use coaxial cables; DSL modems use telephone lines.
- The modem is essential for connecting your home network to your ISP's infrastructure.

**Question:** What does a modem convert?
| Option | Answer |
|--------|--------|
| A | MAC addresses to IP addresses |
| B | **Digital signals to analog signals** ✓ |
| C | Packets to frames |
| D | Wireless to wired |

---

### Level 35: Access Points - Wireless Gateway
**Concepts:**
- An Access Point (AP) creates a wireless local area network (WLAN) for WiFi devices.
- It acts as a bridge between wireless clients and the wired network.
- APs use radio frequencies (2.4GHz or 5GHz) to communicate with devices.

**Question:** What does an Access Point create?
| Option | Answer |
|--------|--------|
| A | A VPN tunnel |
| B | **A wireless local area network** ✓ |
| C | IP addresses |
| D | Firewall rules |

---

### Level 36: Repeaters & Extenders
**Concepts:**
- Repeaters regenerate and amplify signals to extend network range.
- WiFi extenders receive weak signals and rebroadcast them at full strength.
- They help eliminate dead zones but may reduce overall network speed.

**Question:** What is the main purpose of a network repeater?
| Option | Answer |
|--------|--------|
| A | Filter malicious traffic |
| B | **Extend signal range** ✓ |
| C | Assign IP addresses |
| D | Store network data |

---

### Level 37: Bridges - Connecting Segments
**Concepts:**
- A bridge connects two network segments, filtering traffic based on MAC addresses.
- It reduces network congestion by creating separate collision domains.
- Bridges operate at Layer 2 and are the predecessors to modern switches.

**Question:** At which OSI layer does a bridge operate?
| Option | Answer |
|--------|--------|
| A | Layer 1 (Physical) |
| B | **Layer 2 (Data Link)** ✓ |
| C | Layer 3 (Network) |
| D | Layer 4 (Transport) |

---

### Level 38: Gateways - Protocol Translators
**Concepts:**
- A gateway translates between different network protocols or architectures.
- It operates at multiple OSI layers, performing complex data conversions.
- Examples include email gateways and VoIP gateways that convert voice to data.

**Question:** What is the primary function of a gateway?
| Option | Answer |
|--------|--------|
| A | Amplify signals |
| B | **Translate between different protocols** ✓ |
| C | Store backup data |
| D | Monitor network speed |

---

### Level 39: Firewalls - Network Guards
**Concepts:**
- A firewall monitors and controls incoming/outgoing network traffic based on rules.
- It creates a barrier between trusted internal networks and untrusted external ones.
- Firewalls can be hardware devices or software applications on computers.

**Question:** A firewall protects networks by doing what?
| Option | Answer |
|--------|--------|
| A | Speeding up internet connection |
| B | **Filtering traffic based on security rules** ✓ |
| C | Assigning MAC addresses |
| D | Compressing data packets |

---

### Level 40: Proxy Servers
**Concepts:**
- A proxy server acts as an intermediary between clients and destination servers.
- It can cache content, filter requests, and provide anonymity for users.
- Organizations use proxies to control internet access and improve security.

**Question:** What does a proxy server do?
| Option | Answer |
|--------|--------|
| A | Directly connects to the internet without intermediary |
| B | **Acts as an intermediary for requests** ✓ |
| C | Only handles email traffic |
| D | Replaces the need for a router |

---

### Level 41: Load Balancers
**Concepts:**
- Load balancers distribute network traffic across multiple servers.
- They improve performance, ensure high availability, and prevent server overload.
- Popular with high-traffic websites like Google, Netflix, and Amazon.

**Question:** What is the main purpose of a load balancer?
| Option | Answer |
|--------|--------|
| A | Encrypt all network traffic |
| B | **Distribute traffic across multiple servers** ✓ |
| C | Block unauthorized users |
| D | Store website backups |

---

### Level 42: Network Devices Review
**Concepts:**
- Layer 1: Repeaters, Hubs | Layer 2: Switches, Bridges | Layer 3: Routers
- Specialized devices: Firewalls (security), Load Balancers (performance), Proxies (intermediary).
- Modern networks use combinations of these devices for efficient, secure communication.

**Question:** Which device operates at Layer 1?
| Option | Answer |
|--------|--------|
| A | Switch |
| B | Router |
| C | **Repeater** ✓ |
| D | Firewall |

---

## 📚 SECTION 5: Core Protocols (Levels 43-55)

### Level 43: What is a Protocol?
**Concepts:**
- A protocol is a set of rules that govern how devices communicate on a network.
- Protocols define message format, timing, sequencing, and error handling.
- Without protocols, devices from different manufacturers couldn't communicate!

**Question:** What is a network protocol?
| Option | Answer |
|--------|--------|
| A | A type of network cable |
| B | **A set of communication rules** ✓ |
| C | A security firewall |
| D | A hardware device |

---

### Level 44: ARP - Address Resolution
**Concepts:**
- ARP (Address Resolution Protocol) maps IP addresses to MAC addresses.
- When sending data, the sender knows the IP but needs the MAC for delivery.
- ARP broadcasts 'Who has this IP?' and the owner replies with its MAC address.

**Question:** What does ARP resolve?
| Option | Answer |
|--------|--------|
| A | Domain names to IP addresses |
| B | **IP addresses to MAC addresses** ✓ |
| C | Port numbers to services |
| D | URLs to file paths |

---

### Level 45: ICMP - Ping & Traceroute
**Concepts:**
- ICMP (Internet Control Message Protocol) sends error messages and diagnostics.
- The 'ping' command uses ICMP to test if a host is reachable.
- 'Traceroute' uses ICMP to show the path packets take to a destination.

**Question:** Which command uses ICMP to test network connectivity?
| Option | Answer |
|--------|--------|
| A | ipconfig |
| B | **ping** ✓ |
| C | netstat |
| D | nslookup |

---

### Level 46: TCP - Reliable Delivery
**Concepts:**
- TCP (Transmission Control Protocol) provides reliable, ordered data delivery.
- It uses a 3-way handshake: SYN → SYN-ACK → ACK to establish connections.
- TCP retransmits lost packets and ensures data arrives in the correct order.

**Question:** What is the correct TCP 3-way handshake sequence?
| Option | Answer |
|--------|--------|
| A | ACK → SYN → SYN-ACK |
| B | **SYN → SYN-ACK → ACK** ✓ |
| C | SYN-ACK → ACK → SYN |
| D | ACK → ACK → ACK |

---

### Level 47: UDP - Fast Delivery
**Concepts:**
- UDP (User Datagram Protocol) provides fast, connectionless communication.
- No handshake required - just send and hope it arrives (fire and forget).
- Perfect for real-time applications where speed matters more than reliability.

**Question:** UDP is best described as:
| Option | Answer |
|--------|--------|
| A | Reliable but slow |
| B | **Fast but unreliable** ✓ |
| C | Encrypted by default |
| D | Only for email |

---

### Level 48: TCP vs UDP Scenarios
**Concepts:**
- TCP use cases: Web browsing (HTTP), email (SMTP), file transfer (FTP).
- UDP use cases: Video streaming, online gaming, VoIP, DNS queries.
- Choose TCP when accuracy matters; choose UDP when speed is critical.

**Question:** Which application typically uses UDP?
| Option | Answer |
|--------|--------|
| A | Email |
| B | File download |
| C | **Online video gaming** ✓ |
| D | Web browsing |

---

### Level 49: DNS - Domain Name System
**Concepts:**
- DNS translates human-readable domain names to IP addresses.
- Example: google.com → 142.250.80.14 (so you don't need to memorize numbers).
- DNS uses a hierarchical system: Root → TLD (.com) → Domain (google).

**Question:** What does DNS translate?
| Option | Answer |
|--------|--------|
| A | MAC addresses to IP addresses |
| B | **Domain names to IP addresses** ✓ |
| C | IP addresses to port numbers |
| D | Emails to usernames |

---

### Level 50: HTTP & HTTPS
**Concepts:**
- HTTP (HyperText Transfer Protocol) is used for web page communication.
- HTTPS adds SSL/TLS encryption for secure data transfer (the 'S' means Secure).
- HTTPS is essential for protecting passwords, payments, and personal data.

**Question:** What does the 'S' in HTTPS stand for?
| Option | Answer |
|--------|--------|
| A | Speed |
| B | **Secure** ✓ |
| C | Simple |
| D | Standard |

---

### Level 51: FTP & SFTP - File Transfer
**Concepts:**
- FTP (File Transfer Protocol) transfers files between client and server.
- SFTP (SSH File Transfer Protocol) adds encryption for secure file transfers.
- FTP uses ports 20 (data) and 21 (control); SFTP uses port 22.

**Question:** Which protocol provides secure file transfer?
| Option | Answer |
|--------|--------|
| A | FTP |
| B | **SFTP** ✓ |
| C | HTTP |
| D | Telnet |

---

### Level 52: SSH & Telnet
**Concepts:**
- Telnet provides remote command-line access but sends data in plain text (insecure).
- SSH (Secure Shell) encrypts all communication for secure remote access.
- SSH uses port 22; Telnet uses port 23. Always prefer SSH over Telnet!

**Question:** Which protocol is more secure for remote access?
| Option | Answer |
|--------|--------|
| A | Telnet |
| B | **SSH** ✓ |
| C | Both are equally secure |
| D | Neither provides remote access |

---

### Level 53: Email Protocols
**Concepts:**
- SMTP (Simple Mail Transfer Protocol) sends emails - port 25 or 587.
- POP3 downloads and removes emails from server - port 110.
- IMAP syncs emails across devices, keeping them on the server - port 143.

**Question:** Which protocol is used to SEND emails?
| Option | Answer |
|--------|--------|
| A | POP3 |
| B | IMAP |
| C | **SMTP** ✓ |
| D | HTTP |

---

### Level 54: SNMP - Network Management
**Concepts:**
- SNMP (Simple Network Management Protocol) monitors and manages network devices.
- It collects data on device health, performance, and errors.
- Network administrators use SNMP to detect problems before they cause outages.

**Question:** What is SNMP primarily used for?
| Option | Answer |
|--------|--------|
| A | Sending emails |
| B | Transferring files |
| C | **Monitoring network devices** ✓ |
| D | Creating websites |

---

### Level 55: Port Numbers
**Concepts:**
- Port numbers identify specific applications/services on a device (0-65535).
- Well-known ports (0-1023): HTTP=80, HTTPS=443, FTP=21, SSH=22, DNS=53.
- Ports allow multiple services to run on the same IP address simultaneously.

**Question:** Which port number is used by HTTPS?
| Option | Answer |
|--------|--------|
| A | 21 |
| B | 80 |
| C | **443** ✓ |
| D | 22 |

---

## 📚 SECTION 6: Network Attacks (Levels 56-65)

### Level 56: Introduction to Cyber Threats
**Concepts:**
- Cyber threats are malicious attempts to damage, disrupt, or steal network data.
- Attackers can be hackers, cybercriminals, nation-states, or even insiders.
- Understanding threats is the first step to building effective defenses.

**Question:** What is a cyber threat?
| Option | Answer |
|--------|--------|
| A | A software update |
| B | **A malicious attempt to damage or steal data** ✓ |
| C | A type of firewall |
| D | A network protocol |

---

### Level 57: DoS & DDoS Attacks
**Concepts:**
- DoS (Denial of Service) floods a target with traffic to make it unavailable.
- DDoS (Distributed DoS) uses thousands of infected computers (botnets) to attack.
- These attacks overwhelm servers, preventing legitimate users from accessing services.

**Question:** What does DDoS stand for?
| Option | Answer |
|--------|--------|
| A | Direct Domain of Service |
| B | **Distributed Denial of Service** ✓ |
| C | Data Destruction of Servers |
| D | Dynamic Distribution of Software |

---

### Level 58: Phishing Attacks
**Concepts:**
- Phishing tricks users into revealing sensitive information through fake emails/websites.
- Attackers impersonate trusted entities like banks, tech companies, or colleagues.
- Always verify sender addresses and never click suspicious links!

**Question:** What is the goal of a phishing attack?
| Option | Answer |
|--------|--------|
| A | Speed up network performance |
| B | **Trick users into revealing sensitive information** ✓ |
| C | Install system updates |
| D | Improve website security |

---

### Level 59: Man-in-the-Middle (MITM)
**Concepts:**
- MITM attacks intercept communication between two parties without their knowledge.
- The attacker can eavesdrop, modify, or inject malicious content.
- HTTPS and VPNs help protect against MITM attacks by encrypting traffic.

**Question:** In a MITM attack, the attacker positions themselves:
| Option | Answer |
|--------|--------|
| A | At the end of the network |
| B | **Between two communicating parties** ✓ |
| C | Inside the server |
| D | Outside the firewall only |

---

### Level 60: ARP Spoofing
**Concepts:**
- ARP spoofing sends fake ARP messages to link an attacker's MAC to a legitimate IP.
- This allows the attacker to intercept, modify, or stop data in transit.
- Defense: Use static ARP entries or ARP spoofing detection software.

**Question:** What does ARP spoofing manipulate?
| Option | Answer |
|--------|--------|
| A | DNS records |
| B | **MAC-to-IP address mappings** ✓ |
| C | Firewall rules |
| D | Password hashes |

---

### Level 61: DNS Poisoning
**Concepts:**
- DNS poisoning corrupts DNS cache to redirect users to malicious websites.
- Example: Typing 'bank.com' could take you to a fake site stealing your credentials.
- Defense: Use DNSSEC (DNS Security Extensions) and trusted DNS servers.

**Question:** DNS poisoning redirects users by corrupting:
| Option | Answer |
|--------|--------|
| A | IP address assignments |
| B | **DNS cache entries** ✓ |
| C | Firewall configurations |
| D | MAC address tables |

---

### Level 62: Password Attacks
**Concepts:**
- Brute Force: Tries every possible password combination until successful.
- Dictionary Attack: Uses lists of common words and passwords to guess.
- Defense: Strong passwords, account lockouts, and multi-factor authentication.

**Question:** Which attack tries every possible password combination?
| Option | Answer |
|--------|--------|
| A | Dictionary attack |
| B | **Brute force attack** ✓ |
| C | Phishing attack |
| D | Social engineering |

---

### Level 63: Firewall Rules & Defense
**Concepts:**
- Firewall rules define what traffic is allowed or blocked (allow/deny lists).
- Rules are based on: source/destination IP, port numbers, and protocols.
- Default deny: Block everything except explicitly allowed traffic (most secure).

**Question:** What is the most secure firewall default policy?
| Option | Answer |
|--------|--------|
| A | Allow all traffic |
| B | **Deny all traffic by default** ✓ |
| C | Allow traffic from unknown sources |
| D | No rules at all |

---

### Level 64: Encryption & VPNs
**Concepts:**
- Encryption scrambles data so only authorized parties can read it.
- VPNs (Virtual Private Networks) create encrypted tunnels over public networks.
- Types: Symmetric (same key for encrypt/decrypt) vs Asymmetric (public/private keys).

**Question:** What does a VPN create over public networks?
| Option | Answer |
|--------|--------|
| A | Unencrypted connections |
| B | **Encrypted tunnels** ✓ |
| C | Public websites |
| D | Faster speeds |

---

### Level 65: Security Best Practices
**Concepts:**
- Use strong, unique passwords and enable multi-factor authentication (MFA).
- Keep software updated, use firewalls, and encrypt sensitive data.
- Train users to recognize phishing and practice the principle of least privilege.

**Question:** Which is a security best practice?
| Option | Answer |
|--------|--------|
| A | Use the same password everywhere |
| B | Disable firewall for faster speeds |
| C | **Enable multi-factor authentication** ✓ |
| D | Share passwords with colleagues |

---

## 🏆 Badges Earned

| Badge | Requirement |
|-------|-------------|
| OSI Master | Complete Levels 1-10 |
| TCP/IP Expert | Complete Levels 11-18 |
| IP Guru | Complete Levels 19-28 |
| Hardware Hero | Complete Levels 29-42 |
| Protocol Pro | Complete Levels 43-55 |
| Security Champion | Complete Levels 56-65 |
| Grand Master | Complete ALL 65 Levels |

---

## 📊 Quick Reference: Correct Answer Index

| Level | Correct Answer Index | Answer |
|-------|---------------------|--------|
| 1 | 1 | B - To connect devices and share resources |
| 2 | 0 | A - True |
| 3 | 1 | B - Fiber Optic |
| 4 | 2 | C - Bit |
| 5 | 1 | B - AA:BB:CC:DD:EE:FF |
| 6 | 2 | C - Frames |
| 7 | 1 | B - 192.168.1.1 |
| 8 | 2 | C - Router |
| 9 | 1 | B - TCP |
| 10 | 1 | B - Presentation Layer (6) |
| 11 | 1 | B - 4 |
| 12 | 2 | C - 3 |
| 13 | 2 | C - Ethernet |
| 14 | 1 | B - ICMP |
| 15 | 1 | B - UDP |
| 16 | 2 | C - SMTP |
| 17 | 1 | B - Data → Segment → Packet → Frame |
| 18 | 1 | B - Up (Network Access to Application) |
| 19 | 0 | A - True |
| 20 | 2 | C - 32 |
| 21 | 1 | B - Class B |
| 22 | 1 | B - 192.168.1.1 |
| 23 | 1 | B - Network vs host portion of IP |
| 24 | 1 | B - Route traffic to other networks |
| 25 | 1 | B - IP addresses |
| 26 | 1 | B - Static |
| 27 | 3 | D - 128 |
| 28 | 1 | B - IPv6 |
| 29 | 1 | B - MAC address |
| 30 | 1 | B - All ports |
| 31 | 1 | B - MAC |
| 32 | 2 | C - Layer 3 |
| 33 | 2 | C - Router |
| 34 | 1 | B - Digital signals to analog signals |
| 35 | 1 | B - A wireless local area network |
| 36 | 1 | B - Extend signal range |
| 37 | 1 | B - Layer 2 (Data Link) |
| 38 | 1 | B - Translate between different protocols |
| 39 | 1 | B - Filtering traffic based on security rules |
| 40 | 1 | B - Acts as an intermediary for requests |
| 41 | 1 | B - Distribute traffic across multiple servers |
| 42 | 2 | C - Repeater |
| 43 | 1 | B - A set of communication rules |
| 44 | 1 | B - IP addresses to MAC addresses |
| 45 | 1 | B - ping |
| 46 | 1 | B - SYN → SYN-ACK → ACK |
| 47 | 1 | B - Fast but unreliable |
| 48 | 2 | C - Online video gaming |
| 49 | 1 | B - Domain names to IP addresses |
| 50 | 1 | B - Secure |
| 51 | 1 | B - SFTP |
| 52 | 1 | B - SSH |
| 53 | 2 | C - SMTP |
| 54 | 2 | C - Monitoring network devices |
| 55 | 2 | C - 443 |
| 56 | 1 | B - A malicious attempt to damage or steal data |
| 57 | 1 | B - Distributed Denial of Service |
| 58 | 1 | B - Trick users into revealing sensitive information |
| 59 | 1 | B - Between two communicating parties |
| 60 | 1 | B - MAC-to-IP address mappings |
| 61 | 1 | B - DNS cache entries |
| 62 | 1 | B - Brute force attack |
| 63 | 1 | B - Deny all traffic by default |
| 64 | 1 | B - Encrypted tunnels |
| 65 | 2 | C - Enable multi-factor authentication |
