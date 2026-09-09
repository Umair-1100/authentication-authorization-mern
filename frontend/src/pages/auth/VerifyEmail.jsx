import {
  Loader2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";

const VerifyEmail = () => {
  // ============================================================
  // UI STATE EXAMPLES
  // Wire your own state management to these values later.
  // ============================================================
  // "pending"         - Default: waiting for verification
  // "verifying"       - Loading state while verifying
  // "success"         - Successfully verified
  // "failed"          - Verification failed
  // "already-verified" - Already verified
  const activeState = "pending";

  // ============================================================
  // VERIFYING STATE
  // ============================================================
  if (activeState === "verifying") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Loader2 className="size-7 animate-spin" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verifying your email...
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Please wait while we verify your email address.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (activeState === "success") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Email verified
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Your email address has been verified successfully.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Continue
        </a>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <ShieldCheck className="size-3.5" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // FAILED STATE
  // ============================================================
  if (activeState === "failed") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verification failed
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              The verification link is invalid or has expired.
            </p>
          </div>
        </div>

        {/* Resend Button */}
        <Button type="button" className="w-full h-10 text-sm font-semibold">
          Resend verification email
        </Button>

        {/* Back to Sign In */}
        <div className="flex flex-col items-center gap-2">
          <Link
            to={ROUTES.LOGIN}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            Back to sign in
          </Link>
        </div>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <ShieldCheck className="size-3.5" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // ALREADY VERIFIED STATE
  // ============================================================
  if (activeState === "already-verified") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Email already verified
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Your email address has already been verified.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Continue
        </a>

        {/* Trust Indicator */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <ShieldCheck className="size-3.5" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // DEFAULT PENDING STATE
  // ============================================================
  return (
    <div className="flex flex-col gap-6">
      {/* Header with Icon */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="size-7" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Verify your email
          </h1>
          <p className="text-sm text-muted-foreground max-w-[320px]">
            We&apos;ve sent a verification link to your email address. Please
            check your inbox to verify your account.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button type="button" className="w-full h-10 text-sm font-semibold">
          Resend verification email
        </Button>

        <Link
          to={ROUTES.LOGIN}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to sign in
        </Link>
      </div>

      {/* Didn't receive email */}
      <p className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive the email?{" "}
        <button
          type="button"
          className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
        >
          Resend email
        </button>
      </p>

      {/* Trust Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
        <ShieldCheck className="size-3.5" />
        <span>Your information is securely encrypted</span>
      </div>
    </div>
  );
};

export default VerifyEmail;
