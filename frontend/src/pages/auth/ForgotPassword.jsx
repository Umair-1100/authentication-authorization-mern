import {
  Mail,
  Loader2,
  AlertCircle,
  MailWarning,
  ServerCrash,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import AuthHeader from "@/components/auth/AuthHeader";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";

const ForgotPassword = () => {
  // ============================================================
  // UI STATE EXAMPLES
  // Wire your own state management to these values later.
  // ============================================================
  // "idle"           - Normal form (default)
  // "loading"        - Loading button state
  // "success"        - Email sent success state
  // "invalid-email"  - Invalid email error
  // "email-not-found" - Email not found error
  // "too-many"       - Too many requests error
  // "server-error"   - Generic server error
  const activeState = "idle";

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (activeState === "success") {
    return (
      <div className="flex flex-col gap-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Check your email
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              If an account exists with this email, we&apos;ve sent instructions
              to reset your password.
            </p>
          </div>
        </div>

        {/* Resend & Back */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the email?{" "}
            <button
              type="button"
              className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
            >
              Resend email
            </button>
          </div>

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
  // FORM STATE
  // ============================================================
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email address and we'll send you a link to reset your password."
      />

      {/* ============================================================
          ALERT STATES
          ============================================================ */}

      {/* Invalid Email */}
      {activeState === "invalid-email" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid email</AlertTitle>
          <AlertDescription>
            Please enter a valid email address.
          </AlertDescription>
        </Alert>
      )}

      {/* Email Not Found */}
      {activeState === "email-not-found" && (
        <Alert variant="destructive">
          <MailWarning className="size-4" />
          <AlertTitle>Email not found</AlertTitle>
          <AlertDescription>
            No account was found with this email address. Please check and try
            again.
          </AlertDescription>
        </Alert>
      )}

      {/* Too Many Requests */}
      {activeState === "too-many" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Too many requests</AlertTitle>
          <AlertDescription>
            You&apos;ve made too many requests. Please wait a few minutes before
            trying again.
          </AlertDescription>
        </Alert>
      )}

      {/* Generic Server Error */}
      {activeState === "server-error" && (
        <Alert variant="destructive">
          <ServerCrash className="size-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* Reset Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4"
      >
        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-10 pl-9"
                aria-describedby="email-error"
              />
            </div>
          </FieldContent>
        </Field>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold"
          disabled={activeState === "loading"}
        >
          {activeState === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      {/* Back to Sign In */}
      <div className="flex flex-col items-center gap-2">
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
        >
          Back to sign in
        </Link>
      </div>

      {/* Security / Trust Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
        <ShieldCheck className="size-3.5" />
        <span>Your information is securely encrypted</span>
      </div>
    </div>
  );
};

export default ForgotPassword;
