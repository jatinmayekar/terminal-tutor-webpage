import CodeBlock from "./CodeBlock";

const Installation = () => {
  return (
    <section className="bg-base-100" id="installation">
      <div className="py-16 lg:py-24 px-8 max-w-3xl mx-auto">
        <div className="flex flex-col text-center mb-16">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">Installation</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-base-content">
            Get started in minutes
          </h2>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-content text-base-100 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-3">Install dependencies</h3>
              <CodeBlock code="sudo apt-get update && apt-get install -y zsh python3 python3-pip pipx netcat-openbsd" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-content text-base-100 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-3">Install Oh-My-Zsh <span className="font-normal text-base-content/60">(Optional)</span></h3>
              <CodeBlock code='sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended' />
              <p className="text-sm text-base-content/60 mt-2">Enhanced Zsh experience with themes & plugins</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-content text-base-100 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-3">Install Terminal Tutor</h3>
              <div className="space-y-3">
                <CodeBlock code="zsh" />
                <CodeBlock code="pipx install terminal-tutor" />
                <CodeBlock code='export PATH="$PATH:$HOME/.local/bin"' />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-base-content text-base-100 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-3">Setup</h3>
              <div className="space-y-3">
                <CodeBlock code="terminal-tutor install" />
                <CodeBlock code="exec zsh" />
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-medium">
              5
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-3">Try it</h3>
              <CodeBlock code="git st" />
              <p className="text-sm text-success mt-3 font-medium">
                You should see: SAFE - Show the working tree status
              </p>
            </div>
          </div>
        </div>

        {/* Success message */}
        <div className="mt-16 text-center">
          <p className="text-base-content/60">
            Real-time predictions will now appear as you type.
          </p>
        </div>

        {/* Other platforms - collapsible */}
        <div className="mt-12 border-t border-base-content/10 pt-8">
          <details className="group">
            <summary className="cursor-pointer list-none flex items-center justify-between py-3 text-base-content/80 hover:text-base-content transition-colors">
              <span className="font-medium">Other platforms (macOS, Windows, other Linux)</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="pt-4 space-y-8">
              <div>
                <h4 className="font-semibold mb-2">macOS</h4>
                <p className="text-sm text-base-content/60 mb-3">Zsh is pre-installed on macOS 10.15+</p>
                <div className="space-y-2">
                  <CodeBlock code="brew install pipx netcat && pipx install terminal-tutor" />
                  <CodeBlock code="terminal-tutor install && exec zsh" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Windows (via WSL2)</h4>
                <p className="text-sm text-base-content/60">Install Ubuntu on WSL2, then follow Ubuntu steps above</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Fedora/RHEL/CentOS</h4>
                <div className="space-y-2">
                  <CodeBlock code="sudo dnf install zsh python3 python3-pip pipx netcat" />
                  <CodeBlock code="pipx install terminal-tutor && zsh && terminal-tutor install && exec zsh" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Arch Linux</h4>
                <div className="space-y-2">
                  <CodeBlock code="sudo pacman -S zsh python python-pipx openbsd-netcat" />
                  <CodeBlock code="pipx install terminal-tutor && zsh && terminal-tutor install && exec zsh" />
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Help section - subtle */}
        <div className="mt-8 p-4 rounded-lg bg-base-200/50 border border-base-content/5">
          <p className="text-sm text-base-content/70">
            <span className="font-medium text-base-content">Need help?</span> Run <code className="text-sm bg-base-300 px-1.5 py-0.5 rounded mx-1">terminal-tutor diagnose</code> to identify issues, or check the <a href="#faq" className="text-primary hover:underline">FAQ</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Installation;
