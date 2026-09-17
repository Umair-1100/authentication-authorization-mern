import { useState, useEffect, useRef } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes.constants";
import api from "@/api/axios";
import { Spinner } from "@/components/ui/spinner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const userEmail = searchParams.get("email");
  const [activeState, setActiveState] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const isRequestSent = useRef(false);

  const verifyToken = async (verificationToken) => {
    try {
      setActiveState("verifying");
      const res = await api.get(
        `/auth/verify-email?token=${verificationToken}`,
      );

      if (res.data?.success) {
        setActiveState("success");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "";
      if (msg.toLowerCase().includes("already verified")) {
        setActiveState("already-verified");
      } else {
        setActiveState("failed");
        setErrorMessage(msg || "Verification failed or link expired.");
      }
    }
  };

  useEffect(() => {
    if (token && !isRequestSent.current) {
      isRequestSent.current = true;
      verifyToken(token);
    }
  }, [token]);

  // Resend Email Handler Function
  const handleResendEmail = async () => {
    if (!userEmail) {
      setResendMessage(
        "Email not found. Please try logging in or registering again.",
      );
      return;
    }

    try {
      setResendLoading(true);
      setResendMessage("");

      const res = await api.post("/auth/resend-verification", {
        email: userEmail,
      });

      setResendMessage(
        res.data?.message || "Verification email resent successfully!",
      );
    } catch (error) {
      setResendMessage(
        error.response?.data?.message ||
          "Failed to resend email. Please try again.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  // ============================================================
  // VERIFYING STATE
  // ============================================================
  if (activeState === "verifying") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Spinner className="size-7" />
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

        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          className="w-full h-10 text-sm font-semibold"
        >
          Continue to Login
        </Button>

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
              {errorMessage ||
                "The verification link is invalid or has expired."}
            </p>
          </div>
        </div>

        {/* Resend Button for Expired/Failed Links */}
        <Button
          type="button"
          onClick={handleResendEmail}
          disabled={resendLoading}
          className="w-full h-10 text-sm font-semibold"
        >
          {resendLoading ? (
            <Spinner className="size-4 mr-2" />
          ) : null}
          Resend verification email
        </Button>

        {resendMessage && (
          <p className="text-center text-xs text-muted-foreground mt-1">
            {resendMessage}
          </p>
        )}

        <div className="flex flex-col items-center gap-2">
          <Link
            to={ROUTES.AUTH.LOGIN}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            Back to sign in
          </Link>
        </div>

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

        <Button
          onClick={() => navigate(ROUTES.AUTH.LOGIN)}
          className="w-full h-10 text-sm font-semibold"
        >
          Continue to Login
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <ShieldCheck className="size-3.5" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // DEFAULT PENDING STATE (Registration ke baad wala default view)
  // ============================================================
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="size-7" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Verify your email
          </h1>
          <p className="text-sm text-muted-foreground max-w-[320px]">
            We&apos;ve sent a verification link to{" "}
            <span className="font-semibold text-foreground">
              {userEmail || "your email address"}
            </span>
            . Please check your inbox to verify your account.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          onClick={handleResendEmail}
          disabled={resendLoading}
          className="w-full h-10 text-sm font-semibold"
        >
          {resendLoading ? (
            <Spinner className="size-4 mr-2" />
          ) : null}
          Resend verification email
        </Button>

        <Link
          to={ROUTES.AUTH.LOGIN}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to sign in
        </Link>
      </div>

      {resendMessage && (
        <p className="text-center text-xs font-medium text-primary mt-1">
          {resendMessage}
        </p>
      )}

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
        <ShieldCheck className="size-3.5" />
        <span>Your information is securely encrypted</span>
      </div>
    </div>
  );
};

export default VerifyEmail;
