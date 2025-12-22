import Image from "next/image";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 text-sm font-medium text-primary items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>459+ commands • 1.6ms avg • Zsh required</span>
          </div>
        </div>

        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          <div className="mb-3">Understand commands as you type</div>
          <div className="mb-3">Get real-time explanations with risk warnings</div>
          <div>Build terminal expertise for life</div>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="#installation"
            className="btn btn-primary btn-wide"
          >
            Install Now
          </a>
          <a
            href="/dashboard-preview"
            className="btn btn-outline btn-wide"
          >
            View Premium Dashboard
          </a>
        </div>

        <div className="flex flex-wrap gap-4 items-center text-sm opacity-70">
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No credit card</span>
          </div>
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No signup required</span>
          </div>
          <div className="flex gap-1 items-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Proprietary License</span>
          </div>
        </div>
      </div>
      <div className="lg:w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl"></div>
          <div className="relative bg-base-300 rounded-2xl p-6 font-mono text-sm">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="space-y-2">
              <div className="text-base-content/60 text-xs">// Real-time predictions as you type</div>
              <div className="text-primary">$ git st<span className="animate-pulse">█</span></div>
              <div className="text-success">🟢 SAFE - git status - Show working tree status</div>

              <div className="mt-3 text-primary">$ docker rm -f<span className="animate-pulse">█</span></div>
              <div className="text-error">🔴 DANGEROUS - Force remove containers (potential data loss)</div>

              <div className="mt-3 text-primary">$ aws s3 ls<span className="animate-pulse">█</span></div>
              <div className="text-success">🟢 SAFE - List S3 buckets and objects</div>

              <div className="mt-3 text-primary">$ kubectl delete<span className="animate-pulse">█</span></div>
              <div className="text-warning">🟡 CAUTION - Delete Kubernetes resources</div>

              <div className="mt-4 text-base-content/60 italic text-xs">// 1.6ms avg • 459+ commands • Learn as you type ✨</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
