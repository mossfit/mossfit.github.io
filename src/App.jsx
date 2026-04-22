import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Cpu,
  Shield,
  FileText,
  FolderOpen,
  Mail,
  ChevronRight,
  Lock,
  Unlock,
  Activity,
  Database,
  Search,
  Globe,
  Zap,
  X,
  Code,
  Share2,
  Command,
  Maximize2,
  Minus,
  Fingerprint,
  AlertTriangle,
  Info
} from 'lucide-react';

// --- DATA STRUCTURES ---

const SYSTEM_LOGS = [
  "[BOOT] Initializing secure kernel...",
  "[OK] Mounting research volumes...",
  "[OK] Loading neural network modules...",
  "[OK] Establishing secure connection to Gachon University...",
  "[WARN] PhD thesis status: COMPLETED",
  "[OK] User authenticated: MAINAK_BASAK",
  "[READY] System ready. Awaiting input..."
];

const BIO_DATA = {
  name: "Mainak Basak",
  role: "PhD. AI Software | AI Researcher | GenAI Vulnerability Analyst",
  status: "RESEARCHER",
  location: "Gachon University, South Korea",
  summary: "Specialist in adversarial machine learning and AI-driven cybersecurity. Over 5 years of experience architecting secure CI/CD pipelines for AI systems, developing network intrusion detection frameworks, and analyzing vulnerabilities in Generative AI architectures."
};

const EDUCATION = [
  {
    degree: "Ph.D. in Artificial Intelligence",
    school: "Gachon University",
    location: "Seongnam, South Korea",
    year: "2022 - 2025",
    status: "Completed",
    focus: "AI Security Lab • Adversarial Robustness"
  },
  {
    degree: "M.Sc. in Software Engineering",
    school: "Gachon University",
    location: "Seongnam, South Korea",
    year: "2019 - 2022",
    status: "Completed",
    focus: "Deep Learning for Network Security"
  },
  {
    degree: "B.Sc. in Automobile Engineering",
    school: "MAKAUT",
    location: "Kolkata, India",
    year: "2012 - 2016",
    status: "Completed",
    focus: "Core Automotive Development"
  }
];

const EXPERIENCE = [
  {
    role: "AI Security Researcher",
    org: "Gachon University AI Security Lab",
    period: "2022 - Present",
    type: "Research",
    desc: "Leading research on prompt injection mitigation strategies and adversarial robustness in LLMs. Publishing findings on vulnerability analysis of generative models."
  },
  {
    role: "Research Assistant & Lab Instructor",
    org: "Dept. of AI-Software, Gachon University",
    period: "2019 - 2022",
    type: "Academic",
    desc: "Instructed graduate-level courses in Deep Learning and Secure Software Development. Assisted in lab management and mentoring junior researchers."
  }
];

const PUBLICATIONS = [
  {
    title: "Explainable Intrusion Detection Framework for Knowledge Extraction from Dense Module Knowledge Graph Generation",
    authors: "M. Basak, et al.",
    venue: "IEEE TIFS",
    year: "Under Review",
    tags: ["Knowledge Graph", "IDS", "XAI"]
  },
  {
    title: "X-GANet: An Explainable Graph-Based Framework for Robust Network Intrusion Detection",
    authors: "M. Basak, et al.",
    venue: "Appl. Sci.",
    year: "2025",
    tags: ["Graph Neural Networks", "Robustness", "Security"]
  },
  {
    title: "Attention-Based Malware Detection Model by Visualizing Latent Features Through Dynamic Residual Kernel Network",
    authors: "M. Basak, M. Han",
    venue: "Sensors",
    year: "2024",
    tags: ["Malware", "ResNet", "Attention"]
  },
  {
    title: "CyberSentinel: A Transparent Defense Framework for Malware Detection in High-Stakes Operational Environments",
    authors: "M. Basak, et al.",
    venue: "Sensors",
    year: "2024",
    tags: ["Transparency", "XAI", "Security"]
  },
  {
    title: "Explainable Lightweight Block Attention Module Framework for Network-Based IoT Attack Detection",
    authors: "M. Basak, et al.",
    venue: "Future Internet",
    year: "2023",
    tags: ["IoT", "Lightweight", "Attention"]
  },
  {
    title: "Interpretable Anomaly Detection in System Logs Using Attention-guided Prototypes",
    authors: "M. Basak, et al.",
    venue: "Knowledge-Based Systems",
    year: "2020",
    tags: ["Log Analysis", "Prototypes", "NLP"]
  },
  {
    title: "Bayesian Rule Modeling for Interpretable Mortality Classification of COVID-19 Patients",
    authors: "M. Basak, et al.",
    venue: "Computers, Materials & Continua",
    year: "2021",
    tags: ["Bayesian", "Healthcare", "Interpretable"]
  }
];

const PROJECTS = [
  {
    id: "PRJ-001",
    title: "Malware Detection Framework",
    category: "Cybersecurity",
    tech: ["Python", "PyTorch", "SHAP"],
    desc: "A deep learning pipeline utilizing Residual Networks and Attention mechanisms to classify zero-day malware, integrated with SHAP for explainability.",
    status: "COMPLETED"
  },
  {
    id: "PRJ-002",
    title: "Prompt Injection Attack Mitigation",
    category: "GenAI Security",
    tech: ["LLMs", "NLP", "Adversarial Training"],
    desc: "Developing defense layers against jailbreaking and prompt leakage in commercial LLMs through input sanitization and adversarial robustness training.",
    status: "ACTIVE"
  },
  {
    id: "PRJ-003",
    title: "Graph-Based Intrusion Detection",
    category: "Network Security",
    tech: ["GraphSAGE", "NetworkX", "Django"],
    desc: "Real-time anomaly detection system modeling network traffic as dynamic graphs to identify lateral movement and botnet activity.",
    status: "COMPLETED"
  },
  {
    id: "PRJ-004",
    title: "Anomaly Detection Dashboard",
    category: "Data Viz",
    tech: ["React", "D3.js", "FastAPI"],
    desc: "High-performance visualization dashboard for security operation centers (SOC) to monitor AI-predicted anomalies across distributed systems.",
    status: "COMPLETED"
  },
  {
    id: "PRJ-005",
    title: "AI Security Sandbox",
    category: "Infrastructure",
    tech: ["Docker", "Kubernetes", "TensorFlow"],
    desc: "Isolated containerized environment for testing adversarial attacks on ML models without risking production infrastructure.",
    status: "ACTIVE"
  },
  {
    id: "PRJ-006",
    title: "AI-Driven Data Visualization",
    category: "Research Tool",
    tech: ["Python", "Plotly", "Pandas"],
    desc: "Automated pipeline that converts raw security logs into interactive, narrative-driven visual reports for non-technical stakeholders.",
    status: "COMPLETED"
  }
];

// --- UTILITY COMPONENTS ---

const DecryptText = ({ text, delay = 0 }) => {
  const [display, setDisplay] = useState('');
  const chars = "!@#$%^&*()_+{}:<>?|[]-=/";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplay(text.split('').map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join(''));

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1/3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className="font-mono">{display}</span>;
};

const RetroStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Inter:wght@300;400;600&display=swap');

    :root {
      --bg-color: #020617;
      --terminal-bg: #0f172a;
      --text-main: #e2e8f0;
      --accent-green: #34d399;
      --accent-amber: #f59e0b;
      --accent-cyan: #22d3ee;
      --accent-red: #f43f5e;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      margin: 0;
    }

    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }

    .scanlines {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(255,255,255,0),
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.1) 50%,
        rgba(0,0,0,0.1)
      );
      background-size: 100% 4px;
      pointer-events: none;
      z-index: 100;
      opacity: 0.4;
    }

    .neural-grid {
      background-image:
        linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .hexagon-grid {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath fill-rule='evenodd' d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l11 6.35 11-6.35V17.9l-11-6.35L3 17.9z' fill='%2322d3ee' fill-opacity='0.05'/%3E%3C/svg%3E");
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 10px;
    }

    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `}</style>
);

const BackgroundAnimation = ({ type = 'neural' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 neural-grid opacity-20" />

      {type === 'neural' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 hexagon-grid"
        />
      )}

      {type === 'neural' && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0, scale: 0.5 }}
              animate={{
                y: [null, (Math.random() * 100) + "%"],
                x: [null, (Math.random() * 100) + "%"],
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ duration: Math.random() * 15 + 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"
            />
          ))}

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`ghost-${i}`}
              initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
              animate={{ opacity: [0, 0.3, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 5, repeatDelay: Math.random() * 5 }}
              className="absolute font-mono text-[10px] text-cyan-500/40 select-none"
            >
              {`0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`}
            </motion.div>
          ))}
        </>
      )}

      {type === 'data' && [...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100 + "%", y: -10, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.2, 0] }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
          className="absolute font-mono text-[8px] text-emerald-500 whitespace-nowrap"
        >
          {Math.random() > 0.5 ? '1' : '0'}
        </motion.div>
      ))}

      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-40 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent skew-y-6"
      />
    </div>
  );
};

// --- SYSTEM FEED COMPONENT ---

const SystemFeed = () => {
  const [events, setEvents] = useState([]);
  const eventPool = [
    { type: 'info', text: 'Neural weights integrity verified.' },
    { type: 'alert', text: 'Blocked unauthorized ping: IP 14.5.x.x' },
    { type: 'success', text: 'Research volume mount complete.' },
    { type: 'info', text: 'Gachon Node: Synchronizing data...' },
    { type: 'alert', text: 'GenAI Safety layer: Active' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        ...eventPool[Math.floor(Math.random() * eventPool.length)],
        id: Date.now()
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-14 left-6 z-[100] w-64 space-y-2 pointer-events-none hidden md:block">
      <AnimatePresence>
        {events.map((ev) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className={`p-2 bg-slate-950/80 border border-slate-800 rounded flex items-center gap-2 backdrop-blur-sm shadow-xl`}
          >
            {ev.type === 'alert' ? <AlertTriangle className="w-3 h-3 text-rose-500" /> : <Info className="w-3 h-3 text-cyan-500" />}
            <span className="text-[9px] font-mono text-slate-300 uppercase tracking-tighter">{ev.text}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- INTERACTIVE TERMINAL SHELL ---

const TerminalShell = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'Mainak Diagnostic Shell [v.4.2]' },
    { type: 'sys', text: 'Type "help" for available protocols.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `guest@mossfit:~# ${input}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'sys', text: 'Available: whoami, ls, clear, vuln_scan, contact, system_info, decrypt' });
          break;
        case 'whoami':
          newHistory.push({ type: 'sys', text: 'Mainak Basak. PhD Candidate. AI Researcher.' });
          break;
        case 'ls':
          newHistory.push({ type: 'sys', text: 'papers/  exploits/  training_sets/  .secure_keys' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'decrypt':
          newHistory.push({ type: 'sys', text: 'Attempting handshake...' });
          setTimeout(() => setHistory(p => [...p, { type: 'sys', text: 'KEY FOUND: 0x88F2... Accessing secure assets.' }]), 800);
          break;
        case 'vuln_scan':
          newHistory.push({ type: 'sys', text: 'Running adversarial check...' });
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'sys', text: '[SCAN] No direct injection points found on frontend.' }]);
          }, 1000);
          break;
        default:
          newHistory.push({ type: 'error', text: `Error: Command unknown.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      className="fixed bottom-20 right-6 w-full max-w-md h-[400px] z-[100] bg-slate-950/90 border border-cyan-500/30 rounded-lg shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col"
    >
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center cursor-default">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3 h-3 text-cyan-400" />
          <span className="text-[10px] font-mono text-slate-400 uppercase">Interactive_Shell</span>
        </div>
        <button onClick={onClose} className="hover:bg-red-500/20 rounded p-0.5"><X className="w-3 h-3 text-slate-500" /></button>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 font-mono text-[11px] overflow-y-auto custom-scrollbar space-y-1">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'user' ? 'text-slate-400' : line.type === 'error' ? 'text-rose-500' : 'text-cyan-400'}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2 text-slate-300 mt-2">
          <span>guest@mossfit:~#</span>
          <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleCommand} className="flex-1 bg-transparent outline-none border-none caret-cyan-400" />
        </div>
      </div>
    </motion.div>
  );
};

// --- NAVIGATION ---

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: TerminalIcon },
    { id: 'about', label: 'PROFILE', icon: Cpu },
    { id: 'edu', label: 'LOGS', icon: Database },
    { id: 'pubs', label: 'PAPERS', icon: FileText },
    { id: 'projects', label: 'SYSTEMS', icon: FolderOpen },
    { id: 'contact', label: 'COMMS', icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-mono text-sm font-bold text-emerald-400 tracking-widest uppercase">Secure_Terminal</span>
          </motion.div>
          <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-md text-[10px] sm:text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-3 h-3" />
                <span className="hidden xs:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- PAGES ---

const HomePage = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    let delay = 0;
    SYSTEM_LOGS.forEach((log, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
        if (index === SYSTEM_LOGS.length - 1) setTimeout(() => setShowPrompt(true), 500);
      }, delay);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center max-w-4xl mx-auto px-6 py-20 relative">
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-lg p-6 shadow-2xl backdrop-blur-sm font-mono text-xs sm:text-sm md:text-base relative z-10">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          <span className="ml-2 text-slate-500 text-[10px]">mainak@research-lab:~</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={log.includes("WARN") ? "text-amber-500" : log.includes("READY") ? "text-emerald-400 font-bold" : "text-slate-300"}>
              <span className="text-slate-600 mr-2">{`[${i.toString().padStart(3, '0')}]`}</span>
              {log}
            </motion.div>
          ))}
          {showPrompt && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-emerald-400 mb-2">ACCESS GRANTED.</div>
              <p className="text-slate-400 mb-6 text-sm">Welcome, Researcher <DecryptText text="Mainak Basak" />.</p>
              <button onClick={onComplete} className="group flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 transition-all rounded text-xs">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                INITIALIZE_INTERFACE
              </button>
            </motion.div>
          )}
          {!showPrompt && <div className="w-2 h-4 bg-emerald-500 mt-2 cursor-blink inline-block" />}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617]">
      <BackgroundAnimation type="neural" />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight uppercase tracking-widest">Profile_Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              {/* INTERACTIVE DRAGGABLE BADGE */}
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileHover={{ scale: 1.02, rotateY: 15 }}
                className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-xl relative overflow-hidden group shadow-2xl cursor-grab active:cursor-grabbing border-t-emerald-500/40 border-t-2"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-40 transition-opacity">
                  <Fingerprint className="w-24 h-24 text-cyan-500" />
                </div>

                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-cyan-500/30 mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 opacity-30 bg-[conic-gradient(from_0deg,#22d3ee_0%,transparent_40%)]" />
                  <div className="relative z-10 text-5xl select-none">👨‍💻</div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{BIO_DATA.name}</h3>
                <p className="text-cyan-400 font-mono text-[10px] mb-4 uppercase tracking-tighter">{BIO_DATA.role}</p>

                <div className="space-y-2 font-mono text-[10px] bg-black/40 p-3 rounded border border-slate-800">
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">ID_NODE</span>
                    <span className="text-emerald-500"><DecryptText text="NODE_9921_MB" delay={500} /></span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500">LEVEL</span>
                    <span className="text-amber-500">CLEARANCE_L5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AUTH</span>
                    <span className="text-emerald-400 font-bold animate-pulse">VERIFIED</span>
                  </div>
                </div>
              </motion.div>

              <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 p-4 rounded-lg shadow-xl">
                <h4 className="text-[10px] font-mono text-slate-500 mb-3 uppercase">Tech_Inventory</h4>
                <div className="flex flex-wrap gap-2">
                  {["Adversarial ML", "CI/CD", "Network Security", "LLM Safety", "Python"].map((skill) => (
                    <motion.span key={skill} whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 211, 238, 0.1)" }} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 cursor-default transition-colors">
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-lg shadow-xl relative group">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-500 rounded-full" />
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-emerald-400" />Executive Summary</h3>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {BIO_DATA.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Focus", value: "GenAI Vulnerabilities", icon: Shield, color: "text-emerald-400" },
                  { label: "Status", value: "Active PhD Researcher", icon: Activity, color: "text-amber-400" },
                  { label: "Experience", value: "5.4 Years Logged", icon: Zap, color: "text-cyan-400" },
                  { label: "Node", value: "Seoul Node", icon: Globe, color: "text-blue-400" },
                ].map((item) => (
                  <motion.div key={item.label} whileHover={{ x: 10, borderColor: "rgba(34, 211, 238, 0.4)" }} className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 p-4 rounded-lg flex items-start gap-3 transition-all shadow-lg">
                    <item.icon className={`w-5 h-5 mt-1 ${item.color}`} />
                    <div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase">{item.label}</div>
                      <div className="text-sm text-slate-200 font-medium tracking-tight"><DecryptText text={item.value} delay={1000} /></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-3"><Activity className="w-4 h-4 text-emerald-400 animate-pulse" /><span className="text-[10px] font-mono text-slate-400 uppercase">Neural_Network_Heartbeat: NOMINAL</span></div>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (<motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="w-1 bg-emerald-500/50 rounded-full" />))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EducationExperiencePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation type="data" />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-3 mb-8">
            <Database className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight uppercase tracking-widest">Chronological_Logs</h2>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-mono text-amber-500 mb-6 border-b border-slate-800 pb-2 flex items-center gap-2 uppercase tracking-widest">/Education_History</h3>
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-8">
                <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute -left-[3px] w-1 h-16 bg-gradient-to-b from-amber-500/0 via-amber-500 to-amber-500/0 z-20" />
                {EDUCATION.map((edu, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="pl-8 relative group">
                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-slate-950 transition-colors ${edu.status === "Completed" ? "border-emerald-500 shadow-[0_0_8px_#10b981]" : "border-amber-500 shadow-[0_0_8px_#f59e0b]"}`} />
                    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-lg group-hover:border-slate-500 transition-all cursor-default">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-bold text-sm sm:text-base"><DecryptText text={edu.degree} delay={i * 200} /></h4>
                        <span className={`text-[9px] font-mono px-2 py-1 rounded ml-2 ${edu.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>{edu.status.toUpperCase()}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 mb-2">{edu.school} • {edu.location}</div>
                      <div className="text-[10px] font-mono text-slate-500 mb-3">{edu.year}</div>
                      <div className="text-xs text-cyan-400/80 italic">{edu.focus}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-cyan-500 mb-6 border-b border-slate-800 pb-2 flex items-center gap-2 uppercase tracking-widest">/Experience_Vault</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-5 rounded-lg group hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[9px] font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded">{exp.type}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{exp.period}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors uppercase">{exp.role}</h4>
                    <div className="text-xs sm:text-sm text-slate-400 mb-4">{exp.org}</div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{exp.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PublicationsPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation type="neural" />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight uppercase tracking-widest">Research_Output</h2>
          </div>

          <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-lg overflow-hidden relative">
            <motion.div animate={{ top: ["-10%", "110%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-12 bg-emerald-500/5 border-t border-emerald-500/10 pointer-events-none z-20" />
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-slate-950/80 text-[10px] font-mono text-slate-500 uppercase z-10 relative">
              <div className="col-span-7 md:col-span-6">Asset_Title</div>
              <div className="col-span-3 hidden md:block">Principal_Authors</div>
              <div className="col-span-3 md:col-span-2">Venue</div>
              <div className="col-span-2 md:col-span-1 text-right">Year</div>
            </div>
            {PUBLICATIONS.map((pub, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group grid grid-cols-12 gap-4 p-4 border-b border-slate-800/50 hover:bg-emerald-500/5 transition-all items-center relative z-10">
                <div className="col-span-7 md:col-span-6">
                  <div className="text-xs sm:text-sm font-medium text-white group-hover:text-emerald-400 transition-colors mb-1">{pub.title}</div>
                  <div className="flex gap-2 flex-wrap mt-1">
                     {pub.tags.map(tag => (<span key={tag} className="text-[9px] bg-slate-800/50 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">#{tag}</span>))}
                  </div>
                </div>
                <div className="col-span-3 hidden md:block text-[11px] text-slate-400 font-mono tracking-tighter">{pub.authors}</div>
                <div className="col-span-3 md:col-span-2 text-[11px] text-slate-400 tracking-tighter">{pub.venue}</div>
                <div className="col-span-2 md:col-span-1 text-right text-[11px] font-mono text-emerald-500 tracking-widest">{pub.year}</div>
                <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation type="data" />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center gap-3 mb-8">
            <FolderOpen className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-mono font-bold text-white tracking-tight uppercase tracking-widest">Active_Repositories</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-slate-900/70 backdrop-blur-md border border-slate-800 p-5 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all group flex flex-col h-full overflow-hidden relative"
              >
                <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity"><Code className="w-24 h-24 text-white rotate-12" /></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-slate-500 tracking-widest">{project.id}</span>
                  <div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${project.status === "ACTIVE" ? "bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" : "bg-slate-600"}`} /></div>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                <p className="text-[10px] text-slate-500 font-mono mb-4 uppercase tracking-widest">{project.category}</p>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 relative z-10">
                  {project.tech.slice(0, 3).map(t => (<span key={t} className="text-[9px] bg-slate-800/80 text-cyan-300/80 px-2 py-1 rounded border border-cyan-500/10 font-mono">{t}</span>))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-950 border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)]" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur">
                <div className="flex items-center gap-3"><FolderOpen className="w-5 h-5 text-cyan-400" /><h3 className="text-lg font-bold text-white uppercase">{selectedProject.title}</h3></div>
                <button onClick={() => setSelectedProject(null)} className="bg-slate-800 p-2 rounded-full hover:bg-slate-700"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex gap-6 text-[10px] font-mono text-slate-400">
                  <div>STATUS: <span className={selectedProject.status === "ACTIVE" ? "text-emerald-400" : "text-slate-300"}>{selectedProject.status}</span></div>
                  <div>ID: <span className="text-slate-300">{selectedProject.id}</span></div>
                  <div>CAT: <span className="text-slate-300">{selectedProject.category}</span></div>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg leading-relaxed text-slate-300 text-sm">{selectedProject.desc}</div>
                <div>
                  <h4 className="text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-widest flex items-center gap-2"><Zap className="w-3 h-3 text-cyan-500" /> Stack_Validation</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (<motion.span whileHover={{ y: -2 }} key={t} className="px-4 py-1.5 bg-cyan-950/20 border border-cyan-500/30 text-cyan-400 text-xs rounded-full font-mono">{t}</motion.span>))}
                  </div>
                </div>
                <div className="pt-6 flex justify-end gap-3">
                  <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg flex items-center gap-2 tracking-widest"><Activity className="w-3 h-3" /> LOGS</button>
                  <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 tracking-widest uppercase"><Unlock className="w-3 h-3" /> Repo_Access</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage = () => {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation type="radar" />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2"><Mail className="w-5 h-5 text-emerald-400" /><span className="font-mono text-xs text-slate-300">SECURE_COMMS_CHANNEL.EXE</span></div>
            <div className="flex gap-1.5">{[...Array(3)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800" />))}</div>
          </div>
          <div className="p-8">
            {formState === 'sent' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-emerald-500/20 rounded-full" />
                  <Lock className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-widest uppercase">Encryption_Complete</h3>
                <p className="text-slate-400 text-sm mb-8">Packet dispatched to: <span className="text-emerald-400">contact@mossfit.site</span></p>
                <button onClick={() => setFormState('idle')} className="text-xs font-mono text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 px-4 py-2 rounded-full">NEW_TRANSMISSION</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase flex justify-between"><span>User_Identity</span><span className="text-emerald-500">REQ</span></label>
                    <input required type="text" placeholder="Callsign..." className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase flex justify-between"><span>Response_IP</span><span className="text-emerald-500">REQ</span></label>
                    <input required type="email" placeholder="email@domain.host" className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-500 uppercase flex justify-between"><span>Secure_Payload</span><span className="text-slate-700 text-[8px]">AES_256_ACTIVE</span></label>
                  <textarea required rows={5} placeholder="Compose data stream for contact@mossfit.site..." className="w-full bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-white font-mono text-sm focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-900 resize-none" />
                </div>
                <button disabled={formState === 'sending'} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-4 rounded-xl font-mono transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {formState === 'sending' ? (<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Cpu className="w-5 h-5" /></motion.div>) : (<><Zap className="w-4 h-4" /> INITIATE_HANDSHAKE</>)}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [booted, setBooted] = useState(false);
  const [isShellOpen, setIsShellOpen] = useState(false);

  const handleBootComplete = () => {
    setBooted(true);
    setActiveTab('about');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200 custom-scrollbar relative">
      <RetroStyles />
      <div className="scanlines" />

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {!booted && activeTab === 'home' && (
            <motion.div key="boot" exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 0.8 }}>
              <HomePage onComplete={handleBootComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {booted && (
          <AnimatePresence mode="wait">
            {activeTab === 'home' && <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><HomePage onComplete={() => setActiveTab('about')} /></motion.div>}
            {activeTab === 'about' && <motion.div key="a" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><AboutPage /></motion.div>}
            {activeTab === 'edu' && <motion.div key="e" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><EducationExperiencePage /></motion.div>}
            {activeTab === 'pubs' && <motion.div key="p" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><PublicationsPage /></motion.div>}
            {activeTab === 'projects' && <motion.div key="pr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><ProjectsPage /></motion.div>}
            {activeTab === 'contact' && <motion.div key="c" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><ContactPage /></motion.div>}
          </AnimatePresence>
        )}
      </main>

      {/* SYSTEM EVENT FEED (BOTTOM LEFT) */}
      {booted && <SystemFeed />}

      {/* FLOATING INTERACTIVE TERMINAL TOGGLE */}
      <AnimatePresence>
        {booted && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="fixed bottom-10 right-6 z-[110]">
            <button
              onClick={() => setIsShellOpen(!isShellOpen)}
              className="w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all group border-2 border-cyan-400"
            >
              {isShellOpen ? <Minus className="w-6 h-6" /> : <Command className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <TerminalShell isOpen={isShellOpen} onClose={() => setIsShellOpen(false)} />

      <footer className="fixed bottom-0 w-full bg-slate-950/95 backdrop-blur border-t border-slate-800 py-1 px-4 z-50 flex justify-between items-center text-[9px] font-mono text-slate-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]" /> SYS: ONLINE</span>
          <span className="hidden xs:inline uppercase">Region: Seoul_Cluster_01</span>
        </div>
        <div className="truncate ml-2 uppercase tracking-tighter text-slate-600">
          MAINAK_BASAK_SECURE_NODE // DEST: contact@mossfit.site
        </div>
      </footer>
    </div>
  );
}
