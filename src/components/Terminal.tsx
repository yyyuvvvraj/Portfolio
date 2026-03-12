import { useState, useEffect, useRef, type ReactNode } from "react";
import { audioSystem } from "../utils/audio";
import { useGame } from "../context/GameContext";
import ResumePDF from "../assets/Yuvraj_Resume.pdf";

export default function Terminal() {
  const { addScore, unlockRoute, unlockAll, isGameMode } = useGame();
  const [history, setHistory] = useState<{ id: number; command: string; output: string | ReactNode; isError?: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nextId, setNextId] = useState(1);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);

  // F1 Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      audioSystem.playSuccessBeep();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "c" && e.ctrlKey) {
       e.preventDefault();
       setInput("");
       setHistory([...history, { id: nextId, command: input + "^C", output: "" }]);
       setNextId(nextId + 1);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    const args = cmd.split(" ");
    const baseCmd = args[0].toLowerCase();

    let output: string | ReactNode = "";
    let isError = false;

    switch (baseCmd) {
      case "help":
        output = (
          <div className="text-gray-300">
            <div>Available commands:</div>
            <div className="ml-4 mt-1 overflow-x-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 max-w-[20rem] sm:max-w-lg">
                <span className="text-[var(--color-rbr-yellow)]">whoami</span><span>Print current user</span>
                <span className="text-[var(--color-rbr-yellow)]">ls</span><span>List directory contents</span>
                <span className="text-[var(--color-rbr-yellow)]">tree</span><span>List directory tree</span>
                <span className="text-[var(--color-rbr-yellow)]">cat</span><span>Read file contents</span>
                <span className="text-[var(--color-rbr-yellow)]">ping</span><span>Test network latency</span>
                <span className="text-[var(--color-rbr-yellow)]">nmap</span><span>Scan network ports</span>
                <span className="text-[var(--color-rbr-yellow)]">traceroute</span><span>Trace route to host</span>
                <span className="text-[var(--color-rbr-yellow)]">curl</span><span>Transfer a URL</span>
                <span className="text-[var(--color-rbr-yellow)]">ssh</span><span>OpenSSH remote login client</span>
                <span className="text-[var(--color-rbr-yellow)]">htop</span><span>Interactive process viewer</span>
                <span className="text-[var(--color-rbr-yellow)]">ifconfig</span><span>Configure a network interface</span>
                <span className="text-[var(--color-rbr-yellow)]">clear</span><span>Clear terminal screen</span>
                <span className="text-[var(--color-rbr-yellow)]">neofetch</span><span>Display system info</span>
                <span className="text-[var(--color-f1-red)] font-bold">get-resume</span><span className="text-[#87d23f]">Extract secure driver profile (PDF)</span>
              </div>
            </div>
            {isGameMode && (
              <div className="mt-4 p-2 border border-[#E10600]/30 bg-[#E10600]/10 text-[#E10600]">
                <div className="font-bold">SYSTEM NOTICE: SECTOR LOCKDOWN IN EFFECT.</div>
                <div className="text-xs mt-1">
                  Run <span className="font-mono bg-black/50 px-1">sudo bypass --recruit</span> to lift all security restrictions.
                </div>
              </div>
            )}
          </div>
        );
        break;

      case "whoami":
        output = "yuvraj_deshmukh";
        break;
      case "ls":
        output = (
          <div className="flex gap-4 text-blue-400 flex-wrap">
            <span>Desktop</span>
            <span>Documents</span>
            <span>Downloads</span>
            <span className="text-green-400 border-none">telemetry_data/</span>
            <span className="text-green-400 border-none">exploits/</span>
            <span className="text-white">driver_profile.txt</span>
            {isGameMode && <span className="text-[#E10600] animate-pulse">INIT_SENSORS.sh</span>}
          </div>
        );
        break;
      case "tree":
        output = (
          <div className="text-blue-400 whitespace-pre text-xs">
            {`.
├── Desktop
├── Documents
│   ├── research_paper.pdf
│   └── architecture.drawio
├── Downloads
├── telemetry_data
│   ├── trace.log
│   └── ecu_dump.bin
├── exploits
│   ├── payload.sh
│   └── bypass.py
├── driver_profile.txt
└── config.sys`}
          </div>
        );
        break;
      case "cat":
        if (args[1] === "driver_profile.txt") {
          output = (
            <div className="text-gray-300">
              <div className="text-[var(--color-f1-red)] font-bold">--- DRIVER_PROFILE.TXT ---</div>
              <div>NAME: Yuvraj Deshmukh</div>
              <div>ROLE: Lead Driver & Security Eng</div>
              <div>TEAM: Oracle Red Bull Racing <span className="text-[#FFC220] font-bold">(MV1)</span></div>
              <div>LOC: NIIT University (2023-2027)</div>
              <div>EXPERTISE: React, Node.js, AppSec, ML</div>
              <div>STATUS: <span className="text-[#87d23f]">ACTIVE (SECURE)</span></div>
              <div className="text-[var(--color-f1-red)] font-bold">--------------------------</div>
            </div>
          );
        } else if (args[1]) {
          output = `cat: ${args[1]}: Permission denied / File not found`;
          isError = true;
        } else {
          output = "cat: missing operand";
          isError = true;
        }
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "date":
        output = new Date().toString();
        break;
      case "echo":
        output = args.slice(1).join(" ");
        break;
      case "sudo":
        if (args[1] === "rm" && args[2] === "-rf") {
          output = (
            <div className="text-[var(--color-f1-red)] font-bold animate-pulse">
              [CRITICAL] UNAUTHORIZED SYSTEM DESTRUCTION ATTEMPT LOGGED.<br/>
              LOCKDOWN SEQUENCE INITIATED...<br/>
              Just kidding. Nice try.
            </div>
          );
          isError = true;
        } else if (args[1] === "bypass" && args[2] === "--recruit") {
          unlockAll();
          audioSystem.playSuccessBeep();
          output = (
            <div className="text-[#87d23f] font-bold border border-[#87d23f]/50 p-2 bg-[#87d23f]/10">
              [SUCCESS] ROOT OVERRIDE ACCEPTED.<br/>
              ALL SYSTEM SECTORS UNLOCKED. GAMIFICATION PROTOCOLS DISABLED.
            </div>
          );
        } else {
          output = "yuvraj is not in the sudoers file. This incident will be reported.";
          isError = true;
        }
        break;
      case "./init_sensors.sh":
      case "init_sensors":
        if (isGameMode) {
          unlockRoute('telemetry');
          addScore(100);
          audioSystem.playSuccessBeep();
          output = (
            <div className="text-[#87d23f]">
              <div className="font-bold text-lg mb-1">SCORE +100: SENSORS ONLINE</div>
              <div>[OK] Booting F1 ECU interfaces...</div>
              <div>[OK] Streaming data packets...</div>
              <div>[SUCCESS] TELEMETRY DOCK ICON UNLOCKED.</div>
              <div className="mt-2 text-[#E10600] text-xs">HINT: Scan local subnets for active targets before proceeding.</div>
            </div>
          );
        } else {
          output = "Sensors already online.";
        }
        break;
      case "decrypt_projects":
        if (isGameMode) {
          unlockRoute('projects');
          addScore(200);
          audioSystem.playSuccessBeep();
          output = (
            <div className="text-[#87d23f]">
              <div className="font-bold text-lg mb-1">SCORE +200: DECRYPTION SUCCESS</div>
              <div>[OK] Brute forcing AES-256 vault...</div>
              <div>[OK] Keys recovered.</div>
              <div>[SUCCESS] PROJECTS DOCK ICON UNLOCKED.</div>
              <div className="mt-2 text-[#E10600] text-xs">HINT: A highly secured mainframe holds operation logs awaiting execution.</div>
            </div>
          );
        } else {
          output = "Vault already decrypted.";
        }
        break;
      case "hack_mainframe":
        if (isGameMode) {
          unlockRoute('logs');
          addScore(300);
          audioSystem.playSuccessBeep();
          output = (
            <div className="text-[#87d23f]">
              <div className="font-bold text-lg mb-1">SCORE +300: ROOT SHELL AQUIRED</div>
              <div>[OK] Exploiting CVE-2024-2193 on 10.0.0.99...</div>
              <div>[OK] Dropping reverse shell...</div>
              <div>[SUCCESS] OPERATION LOGS DOCK ICON UNLOCKED.</div>
            </div>
          );
        } else {
          output = "Mainframe already compromised.";
        }
        break;
      case "classified":
        output = (
          <div className="text-[var(--color-papaya)] font-mono text-xs">
            {`
  _____ ___  ____    ___  ____  ___ ____  ______ 
 |_   _/ _ \\|  _ \\  / _ \\/ ___||_ _|  _ \\|  ____|
   | || | | | |_) | | | | |     | || |_) | |___  
   | || |_| |  __/  | |_| |___  | ||  __/|  ___| 
   |_| \\___/|_|      \\___/\\____|___|_|   | |     
            `}
            <br />
            &gt; PROJECT ZENITH: DECRYPTION KEY <span className="text-white bg-[var(--color-f1-red)] px-1">REDACTED</span><br />
            &gt; NEXT GEN TELEMETRY BYPASS: <span className="text-[#87d23f]">READY</span>
          </div>
        );
        break;
      case "matrix":
        output = (
          <div className="text-[#87d23f] font-mono break-all leading-none text-[8px] sm:text-xs">
            {Array(50).fill(0).map(() => Math.random().toString(36).substring(2, 15)).join(" ")}
            <br/>Wake up, Yuvraj...
            <br/>The Matrix has you...
          </div>
        );
        break;
      case "ping":
        output = (
          <div className="text-gray-300">
            <div>PING f1-telemetry.local (192.168.1.13) 56(84) bytes of data.</div>
            <div>64 bytes from 192.168.1.13: icmp_seq=1 ttl=64 time=1.23 ms</div>
            <div>64 bytes from 192.168.1.13: icmp_seq=2 ttl=64 time=0.98 ms</div>
            <div>64 bytes from 192.168.1.13: icmp_seq=3 ttl=64 time=1.05 ms</div>
            <div>--- f1-telemetry.local ping statistics ---</div>
            <div>3 packets transmitted, 3 received, 0% packet loss, time 2003ms</div>
          </div>
        );
        break;
      case "nmap":
        output = (
          <div className="text-[#87d23f]">
            <div>Starting Nmap 7.94 ( https://nmap.org ) at {new Date().toISOString()}</div>
            <div>Nmap scan report for target_sec_mainframe (10.0.0.99)</div>
            <div>Host is up (0.012s latency).</div>
            <div>Not shown: 996 closed tcp ports (reset)</div>
            <div className="mt-2 text-gray-300">PORT     STATE SERVICE</div>
            <div className="text-white">22/tcp   <span className="text-[#87d23f]">open</span>  ssh</div>
            <div className="text-white">80/tcp   <span className="text-[#87d23f]">open</span>  http</div>
            <div className="text-white">443/tcp  <span className="text-[#87d23f]">open</span>  https</div>
            <div className="text-white">8080/tcp <span className="text-[#87d23f]">open</span>  http-proxy</div>
            <div className="text-[#E10600] font-bold bg-[#E10600]/10">3306/tcp open  mysql (VULNERABLE: CVE-2024-2193)</div>
            <div className="text-[#E10600] font-bold bg-[#E10600]/10">6379/tcp open  redis (NO_AUTH)</div>
            <div className="mt-2">MAC Address: 00:1A:2B:3C:4D:5E (Unknown)</div>
            <div>Nmap done: 1 IP address (1 host up) scanned in 4.31 seconds</div>
          </div>
        );
        break;
      case "ifconfig":
      case "ip":
        output = (
          <div className="text-gray-300 whitespace-pre font-mono text-xs">
{`eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.105  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::21a:2bff:fe3c:4d5e  prefixlen 64  scopeid 0x20<link>
        ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)
        RX packets 1532412  bytes 1054320982 (1.0 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 854210  bytes 42301923 (42.3 MB)

tun0: flags=4305<UP,POINTOPOINT,RUNNING,NOARP,MULTICAST>  mtu 1500
        inet 10.8.0.12  netmask 255.255.255.255  destination 10.8.0.12
        inet6 fe80::abcd:efff:fe12:3456  prefixlen 64  scopeid 0x20<link>
        unspec 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00  txqueuelen 500
        RX packets 2412  bytes 120400 (120.4 KB)
        TX packets 3215  bytes 455000 (455.0 KB)`}
          </div>
        );
        break;
      case "htop":
      case "top":
        output = (
          <div className="text-gray-300 whitespace-pre font-mono text-[10px] leading-tight flex flex-col gap-1">
            <div><span className="text-[#87d23f]">CPU[</span>||||||||||||||||||||||                     <span className="text-[#87d23f]">42.1%]</span></div>
            <div><span className="text-[#87d23f]">Mem[</span>||||||||||||||||||||||||||||||||||         <span className="text-[#87d23f]">8.4G/32G]</span></div>
            <div><span className="text-[#87d23f]">Swp[</span>|                                          <span className="text-[#87d23f]">12M/4G]</span></div>
            <div className="text-black bg-white/80 mt-2 px-1">  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command</div>
            <div>    1 root       20   0  168M 11.2M 8.12M S  0.0  0.0  0:03.11 /sbin/init</div>
            <div className="text-[#E10600]"> 1337 yuvraj     20   0 4.21G  1.2G  210M R 25.0  3.8  2:14.50 node backend/server.js</div>
            <div> 1442 yuvraj     20   0 1.55G  342M  120M S 12.0  1.0  0:45.12 vite --port 3000</div>
            <div> 2891 root       20   0  850M  45M   22M  S  1.0  0.1  0:10.01 docker daemon</div>
            <div> 8492 root       20   0  210M  15M   10M  S  0.0  0.0  0:00.12 nginx: master process</div>
          </div>
        );
        break;
      case "traceroute":
        output = (
          <div className="text-gray-300 whitespace-pre font-mono text-xs">
            <div>traceroute to github.com (140.82.112.3), 30 hops max, 60 byte packets</div>
            <div> 1  router.asus.com (192.168.1.1)  0.312 ms  0.284 ms  0.251 ms</div>
            <div> 2  10.12.0.1 (10.12.0.1)  4.120 ms  4.011 ms  4.561 ms</div>
            <div> 3  isp-gateway-78.net (203.0.113.78)  12.451 ms  12.321 ms  11.984 ms</div>
            <div> 4  bb1-ams.github.com (198.51.100.12)  25.102 ms  24.981 ms  25.432 ms</div>
            <div> 5  github-lb.github.com (140.82.112.3)  25.891 ms  26.012 ms  25.751 ms</div>
          </div>
        );
        break;
      case "curl":
        if (args[1]) {
          output = (
            <div className="text-[#87d23f] break-all">
              {`HTTP/2 200 
server: nginx
content-type: application/json
date: ${new Date().toUTCString()}

{
  "status": "success",
  "message": "Payload delivered.",
  "target": "${args[1]}",
  "intercepted_data": "0xDEADBEEF_SECRET_KEY_EXPOSED"
}`}
            </div>
          );
        } else {
          output = "curl: try 'curl --help' or 'curl --manual' for more information";
          isError = true;
        }
        break;
      case "ssh":
        if (args[1]) {
          output = (
            <div className="text-[#ef6464]">
              <div>yuvraj@{args[1]}'s password: </div>
              <div>Permission denied, please try again.</div>
              <div>yuvraj@{args[1]}'s password: </div>
              <div>Permission denied, please try again.</div>
              <div>yuvraj@{args[1]}'s password: </div>
              <div>Permission denied (publickey,password).</div>
            </div>
          );
          isError = true;
        } else {
          output = "usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface] [-b bind_address]...";
          isError = true;
        }
        break;
      case "neofetch":
        output = (
          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-xs sm:text-sm">
             <div className="text-[#E10600] text-xl leading-none font-bold">
               <pre>{`         _
     ---(_)
   _/  ---  \\
  (_) |   |
    \\  --- _/
       ---(_)`}</pre>
            </div>
            <div>
              <div className="text-[var(--color-rbr-yellow)] font-bold">yuvraj@ubuntu</div>
              <div>----------------</div>
              <div><span className="text-[#E10600] font-bold">OS</span>: Ubuntu 24.04 LTS x86_64</div>
              <div><span className="text-[#E10600] font-bold">Host</span>: RB20-Telemetry-Engine</div>
              <div><span className="text-[#E10600] font-bold">Kernel</span>: 6.8.0-honda-rbpt-v6</div>
              <div><span className="text-[#E10600] font-bold">Uptime</span>: 99.9% Reliable (Max Spec)</div>
              <div><span className="text-[#E10600] font-bold">Shell</span>: bash 5.2.21</div>
              <div><span className="text-[#E10600] font-bold">DE</span>: GNOME 46.0</div>
              <div><span className="text-[#E10600] font-bold">Terminal</span>: F1-CyberSec-Term</div>
              <div className="mt-2 flex gap-1">
                <div className="w-3 h-3 bg-black"></div>
                <div className="w-3 h-3 bg-red-600"></div>
                <div className="w-3 h-3 bg-green-600"></div>
                <div className="w-3 h-3 bg-yellow-600"></div>
                <div className="w-3 h-3 bg-blue-600"></div>
                <div className="w-3 h-3 bg-purple-600"></div>
                <div className="w-3 h-3 bg-cyan-600"></div>
                <div className="w-3 h-3 bg-white"></div>
              </div>
            </div>
          </div>
        );
        break;
      case "get-resume":
        // Trigger the file download
        const link = document.createElement("a");
        link.href = ResumePDF;
        link.download = "Yuvraj_Deshmukh_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        audioSystem.playSuccessBeep();
        output = (
          <div className="text-[#87d23f] border border-[#87d23f]/30 bg-[#87d23f]/10 p-2 my-2 w-fit">
            <div className="font-bold flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-[#87d23f] rounded-full animate-pulse"></span>
              [SECURE TRANSFER INITIATED]
            </div>
            <div>&gt; Establishing encrypted channel...</div>
            <div>&gt; Accessing /vault/driver_profile.pdf...</div>
            <div>&gt; Decrypting payload...</div>
            <div className="text-white font-bold mt-2">DOWNLOAD COMPLETE.</div>
          </div>
        );
        break;
      default:
        output = `Command not found: ${baseCmd}. Type 'help' for available commands.`;
        isError = true;
    }

    setHistory([...history, { id: nextId, command: cmd, output, isError }]);
    setNextId(nextId + 1);
    setInput("");
  };

  return (
    <div 
      className="font-mono text-[10px] xs:text-xs md:text-sm bg-black/90 backdrop-blur-md text-white p-3 md:p-4 rounded-xl h-[400px] md:h-80 overflow-y-auto w-full relative shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 flex-shrink-0 f1-terminal-bg"
      onClick={() => inputRef.current?.focus()}
      ref={containerRef}
    >
      <div className="absolute inset-0 telemetry-grid opacity-20 pointer-events-none"></div>
      
      {/* F1 Header Bar */}
      <div className="flex items-center gap-2 mb-4 border-b border-[#E10600]/30 pb-2 z-10 sticky -top-4 bg-black/90 backdrop-blur-md pt-4 -mt-4 -mx-4 px-4">
        <div className="flex gap-2 font-display text-xs text-white/50 tracking-widest cursor-pointer select-none">
          <span className="hover:text-[#E10600]">[x]</span>
          <span className="hover:text-[#FFD700]">[-]</span>
          <span className="hover:text-[#87d23f]">[+]</span>
        </div>
        <div className="flex-1 text-center text-[#FFD700]/70 text-xs tracking-widest absolute w-full pointer-events-none select-none font-bold italic">
          RBR_TELEMETRY // SECURE_LINK
        </div>
      </div>

      <div className="relative z-10 space-y-2 pb-2">
        {isBooting ? (
          <div className="text-center py-8">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]"></div>
              <div className="w-4 h-4 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]"></div>
              <div className="w-4 h-4 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]"></div>
              <div className="w-4 h-4 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]"></div>
              <div className="w-4 h-4 rounded-full bg-[#E10600] shadow-[0_0_10px_#E10600]"></div>
            </div>
            <div className="font-mono text-[#E10600] animate-pulse font-bold tracking-widest text-xs">
              INITIALIZING TELEMETRY...
            </div>
          </div>
        ) : (
          <>
            <div className="text-gray-300 mb-4 whitespace-pre-wrap font-medium">
              <span className="text-[#FFD700] font-bold">BOOTING SECURE F1 TELEMETRY NODE...</span> {`\n`}
              * Engine Mapping:  AGGRESSIVE      * Type 'help' to see active commands.{`\n`}
              * Trace Route:     MASKED          * Link: ACTIVE
              {isGameMode && (
                 <div className="mt-6 border-l-4 border-[#E10600] bg-[#E10600]/5 p-4 mb-2">
                   <div className="text-[#E10600] font-bold flex items-center gap-2 mb-1">
                     <div className="w-2 h-2 bg-[#E10600] rounded-full animate-pulse" />
                     CRITICAL ALERT: SECURITY PROTOCOLS ENGAGED
                   </div>
                   <div className="text-gray-300 text-sm ml-4 font-mono leading-relaxed mt-2">
                     &gt; SYSTEM LOCKDOWN AWAITING OVERRIDE.<br/>
                     &gt; MISSION REQUIREMENT: RECRUIT DRIVER TO BYPASS SECURITY.<br/>
                     &gt; ACTION: TYPE <span className="text-black bg-[#87d23f] px-2 py-0.5 rounded font-bold ml-1 animate-pulse">sudo bypass --recruit</span> AND PRESS ENTER.
                   </div>
                 </div>
              )}
            </div>

        {history.map((entry) => (
          <div key={entry.id} className="mb-2">
            <div className="flex items-center gap-2 text-wrap break-all">
              <span className="text-[#FFD700] font-bold">[RBR-SECURE]</span>
              <span className="text-[#87d23f] font-bold">~/telemetry</span>
              <span className="text-[#E10600] font-bold">&gt;</span>
              <span className="ml-1 text-white font-medium">{entry.command}</span>
            </div>
            {entry.output && (
              <div className={`mt-1 ml-0 ${entry.isError ? 'text-[#ef6464]' : 'text-gray-300'}`}>
                {entry.output}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[#FFD700] font-bold">[RBR-SECURE]</span>
          <span className="text-[#87d23f] font-bold">~/telemetry</span>
          <span className="text-[#E10600] font-bold animate-pulse">&gt;</span>
          <form onSubmit={handleCommand} className="flex-1 inline-flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                audioSystem.playTypingSound();
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent border-none outline-none text-white font-medium w-full flex-1"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
            {isFocused && <span className="w-2 h-4 bg-[#FFD700] f1-rev-pulse ml-1 inline-block shadow-[0_0_8px_#FFD700]"></span>}
      </form>
          </div>
        </>
        )}
      </div>
    </div>
  );
}
