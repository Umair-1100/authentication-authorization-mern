import {
  Mail,
  AlertCircle,
  MailWarning,
  ServerCrash,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import AuthHeader from "@/components/auth/AuthHeader";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { useAppForm } from "@/hooks/useAppForm";
import { forgotPasswordSchema } from "@/lib/validations/auth.schema";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

const intialValues = {
  email: "",
};

const ForgotPassword = () => {
  // ============================================================
  // UI STATE EXAMPLES
  // Wire your own state management to these values later.
  // ============================================================
  // "idle"           - Normal form (default)
  // "loading"        - Loading button state
  // "invalid-email"  - Invalid email error
  // "email-not-found" - Email not found error
  // "too-many"       - Too many requests error
  // "server-error"   - Generic server error
  const activeState = "idle";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAppForm(forgotPasswordSchema, intialValues);

  const handleForgotPasswordSubmit = async (data) => {
    try {
      // Fake API delay test karne ke liye (2 second)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Yahan apni actual API call karein
      // await api.forgotPassword(data);

      console.log("OTP Sent Successfully!", data);
      toast.add({
        title: "OTP Sent Successfully",
        description: "A verification code has been sent to your email.",
      });

      // OTP page pe redirect karo email ke saath
      navigate(ROUTES.AUTH.VERIFY_OTP, { state: { email: data.email } });
    } catch (error) {
      console.error("Send OTP failed", error);
      toast.add({
        title: "Send OTP Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  // ============================================================
  // FORM STATE
  // ============================================================
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AuthHeader
        title="Forgot your password?"
        description="Enter your email address and we'll send you a verification code to reset your password."
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
        onSubmit={handleSubmit(handleForgotPasswordSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Email Field */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email address</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                className="h-10 pl-9"
                aria-describedby="email-error"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <FieldError id="email-error">{errors.email.message}</FieldError>
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
              Sending verification code...
            </>
          ) : (
            "Send verification code"
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
