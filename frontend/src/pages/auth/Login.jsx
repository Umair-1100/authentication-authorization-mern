import {
  Mail,
  AlertCircle,
  MailWarning,
  Ban,
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
  FieldSeparator,
} from "@/components/ui/field";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes.constants";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "@/lib/validations/auth.schema";
import { toast } from "@/components/ui/toast";
import { useAppForm } from "@/hooks/useAppForm";
import api from "@/api/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/auth.slice";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const Login = () => {
  const [activeState, setActiveState] = useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useAppForm(loginSchema, initialValues);

  const handleLoginSubmit = async (data) => {
    setActiveState("idle");
    try {
      const res = await api.post("/auth/login", data);
      console.log(res.data);

      localStorage.setItem("authToken", res.data.token);
      dispatch(setUser(res.data.user));

      toast.add({
        title: "Account Login Successfully",
        type: "success",
        description: "Welcome back!",
      });

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Login failed", error);
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (errorMessage.toLowerCase().includes("been disabled")) {
        setActiveState("disabled");
      } else if (status === 403) {
        setActiveState("unverified");
      } else if (status >= 500) {
        setActiveState("server-error");
      } else {
        setActiveState("invalid");
      }

      toast.add({
        title: "Login Failed",
        type: "error",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <AuthHeader
        title="Welcome back"
        description="Sign in to your account to continue."
      />

      {/* Invalid Credentials Error */}
      {activeState === "invalid" && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Invalid credentials</AlertTitle>
          <AlertDescription>
            The email or password you entered is incorrect. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Email Not Verified */}
      {activeState === "unverified" && (
        <Alert>
          <MailWarning className="size-4" />
          <AlertTitle>Email not verified</AlertTitle>
          <AlertDescription>
            Please check your inbox and verify your email address before signing
            in.
          </AlertDescription>
        </Alert>
      )}

      {/* Account Disabled */}
      {activeState === "disabled" && (
        <Alert variant="destructive">
          <Ban className="size-4" />
          <AlertTitle>Account disabled</AlertTitle>
          <AlertDescription>
            Your account has been disabled. Please contact support for
            assistance.
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

      {/* Social Authentication Buttons */}
      <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full h-10 text-sm font-medium">
          <svg className="size-4 shrink-0" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>

        <Button variant="outline" className="w-full h-10 text-sm font-medium">
          <svg
            className="size-4 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          Continue with GitHub
        </Button>
      </div>

      {/* Divider */}
      <FieldSeparator>OR</FieldSeparator>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
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
                name="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <FieldError id="email-error">{errors.email.message}</FieldError>
            )}
          </FieldContent>
        </Field>

        {/* Password Field */}
        <Field data-invalid={!!errors.password}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              to={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <FieldContent>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              aria-describedby="password-error"
              name="password"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <FieldError id="password-error">
                {errors.password.message}
              </FieldError>
            )}
          </FieldContent>
        </Field>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={watch("remember")}
            onCheckedChange={(checked) => setValue("remember", !!checked)}
          />
          <FieldLabel htmlFor="remember" className="cursor-pointer">
            Remember me
          </FieldLabel>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner className="size-4" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      {/* Account Creation CTA */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.AUTH.REGISTER}
          className="font-medium text-foreground underline-offset-4 hover:underline transition-colors"
        >
          Create an account
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

export default Login;
