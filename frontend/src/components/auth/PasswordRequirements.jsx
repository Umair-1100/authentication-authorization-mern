import { Check } from "lucide-react";

const requirements = [
  { id: 1, text: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: 2, text: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: 3, text: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { id: 4, text: "One number", test: (p) => /[0-9]/.test(p) },
  { id: 5, text: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

const PasswordRequirements = ({ password = "" }) => {
  if (!password) return;

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs font-medium text-foreground mb-2">
        Your password should contain:
      </p>
      <ul className="grid gap-1.5">
        {requirements.map((req) => {
          const isMet = req.test(password);
          return (
            <li
              key={req.id}
              className={`flex items-center gap-2 text-xs transition-colors ${
                isMet ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isMet
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground/50 border border-border"
                }`}
              >
                {isMet && <Check className="size-2.5 stroke-3" />}
              </div>
              {req.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
