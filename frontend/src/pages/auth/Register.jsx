import {
  User,
  Mail,
  Lock,
  MailWarning,
  ServerCrash,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { useAppForm } from "@/hooks/useAppForm";
import { registerSchema } from "@/lib/validations/auth.schema";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import api from "@/api/axios";
import { useState } from "react";

const intialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isAgreeTermsPolicy: false,
};

const Register = () => {
  const [activeState, setActiveState] = useState("idle");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useAppForm(registerSchema, intialValues);

  const passwordValue = watch("password", "");

  const handleRegisterSubmit = async (data) => {
    setActiveState("idle");
    try {
      const res = await api.post("/auth/register", data);
      console.log(res.data);
      toast.add({
        title: "Account Created!",
        type: "success",
        description:
          "Welcome onboard! Your account has been registered successfully.",
      });
      reset();
      navigate(ROUTES.AUTH.VERIFY_EMAIL);
    } catch (error) {
      console.error("Registration failed", error);

      const status = error.response?.status;

      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (status === 409) {
        setActiveState("email-exists");
      } else if (status >= 500) {
        setActiveState("server-error");
      } else {
        setActiveState("idle");
      }

      toast.add({
        title: "Registration Failed",
        type: "error",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AuthHeader
        title="Create your account"
        description="Join us and get started with your account."
      />

      {/* ============================================================
          ALERT STATES
          ============================================================ */}

      {/* Email Already Exists */}
      {activeState === "email-exists" && (
        <Alert variant="destructive">
          <MailWarning className="size-4" />
          <AlertTitle>Email already in use</AlertTitle>
          <AlertDescription>
            An account with this email address already exists. Please sign in or
            use a different email.
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

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit(handleRegisterSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Full Name Field */}
        <Field data-invalid={!!errors.fullName}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <FieldContent>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="h-10 pl-9"
                aria-describedby="name-error"
                aria-invalid={!!errors.fullName}
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <FieldError id="name-error">{errors.fullName.message}</FieldError>
            )}
          </FieldContent>
        </Field>

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
            {activeState === "invalid-input" && (
              <FieldError id="email-error">
                Please enter a valid email address.
              </FieldError>
            )}
          </FieldContent>
        </Field>

        {/* Password Field */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <PasswordInput
                id="password"
                placeholder="Create a password"
                aria-describedby="password-strength password-requirements"
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

        {/* Confirm Password Field */}
        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
          <FieldContent>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <PasswordInput
                id="confirm-password"
                placeholder="Confirm your password"
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

        {/* Terms & Conditions */}
        <Field
          orientation="horizontal"
          data-invalid={!!errors.isAgreeTermsPolicy}
        >
          <Checkbox
            checked={watch("isAgreeTermsPolicy")}
            aria-invalid={!!errors.isAgreeTermsPolicy}
            onCheckedChange={(checked) =>
              setValue("isAgreeTermsPolicy", !!checked)
            }
            id="isAgreeTermsPolicy"
            className="mt-0.5"
          />
          <FieldLabel
            htmlFor="isAgreeTermsPolicy"
            className={`text-sm leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.isAgreeTermsPolicy ? "text-destructive" : "text-muted-foreground"}`}
          >
            I agree to the{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
            >
              Privacy Policy
            </a>
            .
          </FieldLabel>
        </Field>
        {errors.isAgreeTermsPolicy && (
          <FieldError>{errors.isAgreeTermsPolicy.message}</FieldError>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      {/* Sign In CTA */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>

      {/* Security / Trust Indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border">
        <ShieldCheck className="size-3.5" />
        <span>Your information is securely encrypted</span>
      </div>
    </div>
  );
};

export default Register;
