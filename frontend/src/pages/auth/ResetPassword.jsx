import {
  Lock,
  AlertCircle,
  ServerCrash,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrength from "@/components/auth/PasswordStrength";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { useAppForm } from "@/hooks/useAppForm";
import { resetPasswordSchema } from "@/lib/validations/auth.schema";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

const intialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  // ============================================================
  // UI STATE EXAMPLES
  // Wire your own state management to these values later.
  // ============================================================
  // "idle"           - Normal form (default)
  // "loading"        - Loading button state
  // "success"        - Password reset successful
  // "invalid-token"  - Invalid reset token error
  // "expired-link"   - Expired reset link error
  // "password-mismatch" - Password mismatch error
  // "weak-password"  - Weak password error
  // "server-error"   - Generic server error
  const activeState = "idle";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useAppForm(resetPasswordSchema, intialValues);

  const passwordValue = watch("password", "");

  const handleResetPasswordSubmit = async (data) => {
      try {
      // Fake API delay test karne ke liye (2 second)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Registered Successfully!", data);
      toast.add({
        title: "Passowrd Reset!",
        description:
          "Welcome onboard! Your password has been reset successfully.",
      });
    } catch (error) {
      console.error("Password Reset failed", error);
      toast.add({
        title: "Password Reset Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col gap-6">
        {/* Success Icon */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="size-7" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Password reset successful
            </h1>
            <p className="text-sm text-muted-foreground max-w-[320px]">
              Your password has been updated successfully.
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Continue to sign in
        </Link>

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
        title="Create a new password"
        description="Choose a strong password to secure your account."
      />

      {/* ============================================================
          ALERT STATES
          ============================================================ */}

      {/* Invalid Token */}
      {activeState === "invalid-token" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid link</AlertTitle>
          <AlertDescription>
            This password reset link is invalid. Please request a new one.
          </AlertDescription>
        </Alert>
      )}

      {/* Expired Link */}
      {activeState === "expired-link" && (
        <Alert variant="destructive">
          <KeyRound className="size-4" />
          <AlertTitle>Link expired</AlertTitle>
          <AlertDescription>
            This password reset link has expired. Please request a new one.
          </AlertDescription>
        </Alert>
      )}

      {/* Password Mismatch */}
      {activeState === "password-mismatch" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Passwords don&apos;t match</AlertTitle>
          <AlertDescription>
            The passwords you entered do not match. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Weak Password */}
      {activeState === "weak-password" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Weak password</AlertTitle>
          <AlertDescription>
            Your password does not meet the requirements. Please choose a
            stronger password.
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
        onSubmit={handleSubmit(handleResetPasswordSubmit)}
        className="flex flex-col gap-4"
      >
        {/* New Password Field */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="new-password">New password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <PasswordInput
                id="new-password"
                placeholder="Enter new password"
                aria-describedby="new-password-strength new-password-requirements"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
            </div>
            <div className="mt-2" id="password-strength">
              <PasswordStrength password={passwordValue} />
            </div>
            <div className="mt-2" id="password-requirements">
              <PasswordRequirements password={passwordValue} />
            </div>
          </FieldContent>
        </Field>

        {/* Confirm New Password Field */}
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirm-password">
            Confirm new password
          </FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <PasswordInput
                id="confirm-password"
                placeholder="Confirm new password"
                aria-describedby="confirm-password-error"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <FieldError id="confirm-password-error">
                {errors.confirmPassword.message}
              </FieldError>
            )}
          </FieldContent>
        </Field>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Resetting password...
            </>
          ) : (
            "Reset password"
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

export default ResetPassword;
