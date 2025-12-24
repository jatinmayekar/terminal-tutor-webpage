"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What is Terminal Tutor?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Terminal Tutor is the world's first real-time command education tool.
        It provides instant command suggestions, descriptions, and safety warnings
        as you type in your terminal. Think of it as autocomplete + learning +
        safety net for the command line.
      </div>
    ),
  },
  {
    question: "How does ask mode work?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Ask mode uses OpenAI's API to translate natural language
          queries into terminal commands.
        </p>
        <p>
          <strong>Free tier:</strong> Bring your own OpenAI API key (~$2/month for typical usage)<br />
          <strong>Premium tier:</strong> Coming soon! (no API key needed, instant responses)
        </p>
        <p>
          Example: "how to list files" → suggests ls, ls -la, find commands
        </p>
      </div>
    ),
  },
  {
    question: "What are the requirements to use Terminal Tutor?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p><strong>⚠️ REQUIRED:</strong></p>
        <ul className="list-disc pl-5">
          <li><strong>Zsh shell</strong> - Real-time predictions ONLY work in Zsh (for now)</li>
          <li><strong>macOS or Linux</strong> - Unix-based systems only</li>
          <li><strong>Python 3.7+</strong> - Runtime environment</li>
        </ul>
        <p>
          <strong>Check your shell:</strong> Run <code className="bg-base-300 px-2 py-1 rounded">echo $SHELL</code> -
          must show <code className="bg-base-300 px-2 py-1 rounded">/bin/zsh</code>
        </p>
        <p className="text-sm opacity-70">
          <strong>Windows users:</strong> See the "Does Terminal Tutor work on Windows?" FAQ below for Git Bash setup.
          Bash/Fish support coming in future releases.
        </p>
      </div>
    ),
  },
  {
    question: "What if Terminal Tutor isn't working after installation?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p><strong>Run the automated diagnostic tool first:</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`terminal-tutor diagnose`}
        </pre>

        <p>This checks:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Shell compatibility (Zsh required for real-time)</li>
          <li>Integration installed in shell config</li>
          <li>ZLE widgets registered correctly</li>
          <li>Keybindings set properly</li>
          <li>Command functionality</li>
          <li>Performance metrics</li>
        </ul>

        <p><strong>For detailed diagnostics:</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`terminal-tutor diagnose --verbose`}
        </pre>

        <p>The diagnose command will tell you exactly what's wrong and how to fix it. If real-time predictions still don't work after following the recommendations, check the FAQ below about Zsh requirements.</p>
      </div>
    ),
  },
  {
    question: "How do I install Zsh if I don't have it?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p><strong>Step 1: Check if Zsh is installed</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`which zsh
# If it shows /bin/zsh → Zsh installed! Go to Step 3
# If blank or "not found" → Install in Step 2`}
        </pre>

        <p><strong>Step 2: Install Zsh (if needed)</strong></p>
        <p><strong>macOS:</strong> Zsh pre-installed on macOS 10.15+ (skip to Step 3)</p>

        <p><strong>Ubuntu/Debian/Linux Mint:</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`sudo apt update && sudo apt install zsh`}
        </pre>

        <p><strong>Fedora/RHEL/CentOS:</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`sudo dnf install zsh`}
        </pre>

        <p><strong>Step 3: Enter Zsh (choose one)</strong></p>
        <p><strong>Option A - Try it now (temporary):</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`zsh  # You're now in Zsh! Type 'exit' to return.`}
        </pre>

        <p><strong>Option B - Make it permanent (recommended after testing):</strong></p>
        <pre className="bg-base-300 p-3 rounded text-sm">
{`chsh -s $(which zsh)
# Will ask for your login password (this is normal!)
# If you see "no changes made" → Already on Zsh!
# Close and reopen terminal to apply`}
        </pre>

        <p className="text-sm opacity-70">
          💡 <strong>Recommended:</strong> Try Option A first to test Terminal Tutor, then use Option B to make it permanent.
        </p>
      </div>
    ),
  },
  {
    question: "Does Terminal Tutor work on Windows?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          <strong>Yes!</strong> Windows users can use Terminal Tutor via <strong>Git Bash</strong> (recommended) or WSL2.
        </p>

        <p><strong>Git Bash Setup (Easiest):</strong></p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Download <a href="https://git-scm.com/download/win" target="_blank" rel="noopener noreferrer" className="link link-primary">Git for Windows</a></li>
          <li>During installation, select "Use Git and optional Unix tools"</li>
          <li>Open "Git Bash" from Start menu</li>
          <li>Install Zsh: <code className="bg-base-300 px-2 py-1 rounded">pacman -S zsh</code></li>
          <li>Enter Zsh: <code className="bg-base-300 px-2 py-1 rounded">zsh</code></li>
          <li>Follow the normal installation steps from the Installation section above</li>
        </ol>

        <p><strong>Alternative:</strong> WSL2 with Ubuntu (full Linux environment on Windows)</p>

        <p className="text-sm opacity-70">
          ℹ️ Native PowerShell support is planned for 2026. Git Bash provides full Zsh compatibility today!
        </p>
      </div>
    ),
  },
  {
    question: "Does it work offline?",
    answer: (
      <p>
        Yes! All real-time predictions work 100% offline. The command database
        is local (459+ commands). Ask mode requires internet for Free tier (calls
        OpenAI API with your key) or Premium tier (calls our backend). You can
        also use local LLM (Ollama) for offline ask mode.
      </p>
    ),
  },
  {
    question: "What about privacy and security?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p><strong>Privacy-first design:</strong></p>
        <p>
          <strong>Free tier:</strong> 100% local predictions (no data sent anywhere).
          Ask mode: Your query → OpenAI API (with your key).
        </p>
        <p>
          We never see your commands.
        </p>
      </div>
    ),
  },
  {
    question: "Can I add my own custom commands?",
    answer: (
      <p>
        Yes! You can create custom commands locally at ~/.terminal_tutor_custom_commands.json.
        Your custom commands will appear in real-time predictions and work with all Terminal Tutor features.
      </p>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-100" id="faq">
      <div className="py-16 lg:py-24 px-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-16">
        <div className="flex flex-col text-left basis-2/5">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="text-3xl lg:text-5xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-3/5">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
