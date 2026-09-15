const getStrength = (password = "") => {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  if (score === 1) return "weak";
  if (score === 2) return "medium";
  if (score === 3) return "strong";

  return "weak";
};

const levels = {
  weak: { label: "Weak", bars: 1, color: "bg-destructive" },
  medium: { label: "Medium", bars: 2, color: "bg-yellow-500" },
  strong: { label: "Strong", bars: 3, color: "bg-emerald-500" },
};

const PasswordStrength = ({ password = "" }) => {
  const strength = getStrength(password);

  if (!strength) return null;

  const { label, bars, color } = levels[strength];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-10 rounded-full transition-all duration-300 ${
              i <= bars ? color : "bg-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

export default PasswordStrength;
