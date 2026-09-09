import { Check } from "lucide-react";

const requirements = [
  { id: 1, text: "At least 8 characters" },
  { id: 2, text: "One uppercase letter" },
  { id: 3, text: "One lowercase letter" },
  { id: 4, text: "One number" },
  { id: 5, text: "One special character" },
];

const PasswordRequirements = ({ checked = [] }) => {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <p className="text-xs font-medium text-foreground mb-2">
        Your password should contain:
      </p>
      <ul className="grid gap-1.5">
        {requirements.map((req) => {
          const isMet = checked.includes(req.id);
          return (
            <li
              key={req.id}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <div
                className={`flex size-3.5 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isMet
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground/50"
                }`}
              >
                {isMet && <Check className="size-2" />}
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
