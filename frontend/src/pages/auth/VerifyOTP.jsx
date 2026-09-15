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

const initialValues = {
  otp: "",
};

const VerifyOTP = () => {
  // ============================================================
  // UI STATE EXAMPLES
  // Wire your own state management to these values later.
  // ============================================================
  // "idle"            - Normal form (default)
  // "verifying"       - Loading state while verifying OTP
  // "success"         - OTP verified successfully
  // "failed"          - Invalid/expired OTP
  // "expired"         - OTP has expired
  // "too-many"        - Too many attempts
  // "server-error"    - Generic server error
  const activeState = "idle";

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
      // Fake API delay test karne ke liye (2 second)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Yahan apni actual API call karein
      // await api.verifyOTP({ otp: data.otp, email: emailFromState });

      console.log("OTP Verified!", data.otp);
      toast.add({
        title: "OTP Verified Successfully",
        description: "Your email has been verified.",
      });

      // Reset password page pe redirect karo
      navigate(ROUTES.AUTH.RESET_PASSWORD, {
        state: { email: emailFromState, otp: data.otp },
      });
    } catch (error) {
      console.error("OTP verification failed", error);
      toast.add({
        title: "OTP Verification Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      // Fake API delay test karne ke liye (2 second)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Yahan apni actual API call karein
      // await api.resendOTP({ email: emailFromState });

      console.log("OTP Resent!");
      toast.add({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      console.error("Resend OTP failed", error);
      toast.add({
        title: "Resend Failed",
        description: "Something went wrong. Please try again.",
      });
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
              Verifying your code...
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Please wait while we verify your OTP.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
      {activeState === "invalid-otp" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid code</AlertTitle>
          <AlertDescription>
            The OTP you entered is incorrect. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Expired OTP */}
      {activeState === "expired" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Code expired</AlertTitle>
          <AlertDescription>
            Your OTP has expired. Please request a new one.
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
            <RefreshCw className="size-3.5" />
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
