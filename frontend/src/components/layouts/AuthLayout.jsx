import { Outlet } from "react-router-dom";
import { ShieldCheck, Lock, Shield, Zap } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1fr_1fr]">
      {/* Brand Panel - Left side on desktop, hidden on mobile */}
      <div className="relative hidden bg-muted lg:flex lg:flex-col lg:justify-between overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-muted to-accent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_50%)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--primary)_0%,transparent_50%)] opacity-[0.05]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Decorative floating shapes */}
        <div className="absolute top-20 left-16 size-64 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-32 right-8 size-80 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 rounded-full border border-primary/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-87.5 rounded-full border border-primary/6" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-12">
          {/* Logo */}
          <div className="mb-10 flex items-center gap-3.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
              <div className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                <ShieldCheck className="size-8" strokeWidth={1.8} />
              </div>
            </div>
            <span className="text-3xl font-bold tracking-tight text-foreground">
              Auth App
            </span>
          </div>

          {/* Tagline */}
          <div className="max-w-md text-center">
            <h2 className="text-[1.65rem] font-bold leading-snug text-foreground mb-4 tracking-tight">
              Build secure applications
              <br />
              with confidence
            </h2>
            <p className="text-[0.9rem] leading-relaxed text-muted-foreground/80">
              Enterprise-grade authentication and authorization for modern web
              applications. Trusted by thousands of developers worldwide.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="mt-14 w-full max-w-sm space-y-3">
            <FeatureCard
              icon={<Lock className="size-4.5" strokeWidth={1.5} />}
              title="End-to-end encryption"
              description="Your data is protected at every stage"
            />
            <FeatureCard
              icon={<Shield className="size-4.5" strokeWidth={1.5} />}
              title="Industry-standard compliance"
              description="SOC 2, GDPR, and HIPAA ready"
            />
            <FeatureCard
              icon={<Zap className="size-4.5" strokeWidth={1.5} />}
              title="Lightning-fast performance"
              description="Sub-millisecond authentication checks"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between px-10 py-6 text-xs text-muted-foreground/60 border-t border-primary/6">
          <span>&copy; {new Date().getFullYear()} AuthApp. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-foreground transition-colors"
            >
              Help
            </a>
          </div>
        </div>
      </div>

      {/* Form Panel - Right side on desktop, full screen on mobile */}
      <div className="flex min-h-screen items-center justify-center bg-background p-6 sm:p-8">
        <div className="w-full max-w-95">
          {/* Mobile logo - only shown on small screens */}
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
              <ShieldCheck className="size-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Auth App
            </span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group flex items-start gap-3.5 rounded-xl border border-primary/6 bg-background/40 backdrop-blur-sm px-4 py-3.5 transition-all hover:bg-background/60 hover:border-primary/10">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug">
          {title}
        </p>
        <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default AuthLayout;
