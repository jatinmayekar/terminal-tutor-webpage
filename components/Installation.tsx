import CodeBlock from "./CodeBlock";

const Installation = () => {
  return (
    <section className="bg-base-200" id="installation">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center mb-12">
          <p className="inline-block font-semibold text-primary mb-4">Installation</p>
          <h2 className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Ubuntu/Debian - Quick Setup
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Single concise installation block */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="space-y-6">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-primary">1</div>
                    <h3 className="font-semibold">Install dependencies</h3>
                  </div>
                  <CodeBlock code="apt-get update && apt-get install -y zsh python3 python3-pip git curl" />
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-secondary">2</div>
                    <h3 className="font-semibold">Install Oh-My-Zsh (Optional)</h3>
                  </div>
                  <CodeBlock code='sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended' />
                  <p className="text-xs opacity-70 mt-1">Enhanced Zsh experience with themes & plugins</p>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-primary">3</div>
                    <h3 className="font-semibold">Install Terminal Tutor</h3>
                  </div>
                  <div className="space-y-2">
                    <CodeBlock code="zsh" />
                    <CodeBlock code="pip install terminal-tutor" />
                  </div>
                </div>

                {/* Step 4 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-primary">4</div>
                    <h3 className="font-semibold">Setup shell integration</h3>
                  </div>
                  <div className="space-y-2">
                    <CodeBlock code="terminal-tutor install" />
                    <CodeBlock code="exec zsh" />
                  </div>
                </div>

                {/* Step 5 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-primary">5</div>
                    <h3 className="font-semibold">Verify installation</h3>
                  </div>
                  <CodeBlock code="terminal-tutor diagnose" />
                  <p className="text-sm text-success mt-2">
                    ✨ Should show: "All systems operational!"
                  </p>
                </div>

                {/* Step 6 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="badge badge-primary">6</div>
                    <h3 className="font-semibold">Try it!</h3>
                  </div>
                  <CodeBlock code="git st  # Type slowly, watch prediction appear" />
                  <p className="text-sm text-success mt-2">
                    🟢 SAFE - Show the working tree status
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              <div className="text-center">
                <p className="text-lg font-semibold text-success">That's it! ✨</p>
                <p className="text-sm opacity-70 mt-2">Real-time predictions should now appear as you type.</p>
              </div>
            </div>
          </div>

          {/* Alternative installation methods */}
          <div className="mt-8">
            <div className="collapse collapse-arrow bg-base-100">
              <input type="checkbox" />
              <div className="collapse-title font-medium">
                Other platforms (macOS, Windows, other Linux)
              </div>
              <div className="collapse-content">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">macOS</h4>
                    <p className="text-sm opacity-70 mb-2">Zsh is pre-installed on macOS 10.15+</p>
                    <CodeBlock code="pip3 install terminal-tutor" />
                    <CodeBlock code="terminal-tutor install && exec zsh" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Windows (via WSL2)</h4>
                    <p className="text-sm opacity-70 mb-2">Install Ubuntu on WSL2, then follow Ubuntu steps above</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Fedora/RHEL/CentOS</h4>
                    <CodeBlock code="sudo dnf install zsh python3 python3-pip" />
                    <CodeBlock code="pip install terminal-tutor" />
                    <CodeBlock code="zsh && terminal-tutor install && exec zsh" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Arch Linux</h4>
                    <CodeBlock code="sudo pacman -S zsh python python-pip" />
                    <CodeBlock code="pip install terminal-tutor" />
                    <CodeBlock code="zsh && terminal-tutor install && exec zsh" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8">
            <div className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="font-bold">Need help?</h3>
                <div className="text-xs">
                  If predictions don't appear, run: <code className="text-xs bg-base-300 px-2 py-1 rounded">terminal-tutor diagnose</code>
                  <br />This will identify issues and provide fix suggestions.
                  <br />Check the <a href="#faq" className="link">FAQ section</a> below for more troubleshooting.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Installation;
