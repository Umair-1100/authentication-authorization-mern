import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import AuthHeader from "@/components/auth/AuthHeader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { useAppForm } from "@/hooks/useAppForm";
import { verifyOTPSchema } from "@/lib/validations/auth.schema";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import api from "@/api/axios";
import { useState } from "react";

const initialValues = {
  otp: "",
};

const VerifyOTP = () => {
  const [activeState, setActiveState] = useState("idle");

  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "your email";

  const maskedEmail =
    emailFromState.length > 3
      ? emailFromState[0] + "***" + emailFromState.slice(-1)
      : "***";

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useAppForm(verifyOTPSchema, initialValues);

  const otpValue = watch("otp");

  const handleVerifyOTP = async (data) => {
    try {
      const res = await api.post("/auth/verify-otp", {
        email: emailFromState,
        ...data,
      });

      console.log(res.data);

      console.log("OTP Verified!", data.otp);
      toast.add({
        title: "OTP Verified Successfully",
        type: "success",
        description: "Your email has been verified.",
      });
    } catch (error) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      console.error("OTP verification failed", errorMessage);
      if (status === 400) {
        setActiveState("failed");
      } else if (status >= 500) {
        setActiveState("server-error");
      } else {
        setActiveState("idle");
      }

      toast.add({
        title: "OTP Verification Failed",
        type: "error",
        description: errorMessage,
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      setActiveState("loading");
      const res = await api.post("/auth/resend-otp", { email: emailFromState });

      console.log("OTP Resent!", res.data);
      toast.add({
        title: "OTP Resent",
        type: "success",
        description: "A new verification code has been sent to your email.",
      });

      setActiveState("idle");
    } catch (error) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      console.error("Resend OTP failed", errorMessage);
      if (status === 400) {
        setActiveState("failed");
      } else if (status >= 500) {
        setActiveState("server-error");
      } else {
        setActiveState("idle");
      }
      toast.add({
        title: "Resend OTP failed",
        type: "error",
        description: errorMessage,
      });
    }
  };

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verification successful
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Your email has been verified successfully.
            </p>
          </div>
        </div>

        <Link
          to={ROUTES.AUTH.RESET_PASSWORD}
          state={{ email: emailFromState, otp: otpValue }}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Continue to reset password
        </Link>

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
              The OTP you entered is invalid or has expired.
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="w-full h-10 text-sm font-semibold"
          onClick={handleResendOTP}
        >
          <RefreshCw className="size-4" />
          Resend OTP
        </Button>

        <Link
          to={ROUTES.AUTH.LOGIN}
          className="flex h-10 w-full items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to sign in
        </Link>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
          <ShieldCheck className="size-3.5" />
          <span>Your information is securely encrypted</span>
        </div>
      </div>
    );
  }

  // ============================================================
  // DEFAULT IDLE STATE - OTP FORM
  // ============================================================
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AuthHeader
        title="Verify your login"
        description={
          <>
            Enter the verification code we sent to your email address:{" "}
            <span className="font-medium text-foreground">{maskedEmail}</span>
          </>
        }
      />

      {/* ============================================================
          ALERT STATES
          ============================================================ */}

      {/* Invalid OTP */}
      {activeState === "failed" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid code</AlertTitle>
          <AlertDescription>
            The OTP you entered is incorrect. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Too Many Requests */}
      {activeState === "too-many" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Too many attempts</AlertTitle>
          <AlertDescription>
            You&apos;ve made too many attempts. Please wait before trying again.
          </AlertDescription>
        </Alert>
      )}

      {/* Generic Server Error */}
      {activeState === "server-error" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {/* OTP Form */}
      <form
        onSubmit={handleSubmit(handleVerifyOTP)}
        className="flex flex-col gap-4"
      >
        {/* Label + Resend */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Verification code
          </span>
          <button
            type="button"
            onClick={handleResendOTP}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RefreshCw
              className={`size-3.5 ${activeState === "loading" ? "animate-spin" : ""}`}
            />
            Resend Code
          </button>
        </div>

        {/* OTP Input */}
        <div className="flex flex-col items-center gap-2">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(val) => setValue("otp", val, { shouldValidate: true })}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors.otp && (
            <p className="text-sm text-destructive">{errors.otp.message}</p>
          )}
        </div>

        {/* No access to email */}
        <p className="text-center text-sm text-muted-foreground">
          I no longer have access to this email address.{" "}
          <button
            type="button"
            onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
            className="font-medium text-foreground underline-offset-4 hover:underline transition-colors cursor-pointer"
          >
            Use a different email
          </button>
        </p>

        {/* Verify Button */}
        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>

      {/* Troubleshooting */}
      <p className="text-center text-sm text-muted-foreground">
        Having trouble signing in?{" "}
        <button
          type="button"
          className="font-medium text-foreground underline-offset-4 hover:underline transition-colors cursor-pointer"
        >
          Contact support
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

export default VerifyOTP;
