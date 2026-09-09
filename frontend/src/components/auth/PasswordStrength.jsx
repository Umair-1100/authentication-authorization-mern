const PasswordStrength = ({ strength = "weak" }) => {
  const levels = {
    weak: { label: "Weak", bars: 1, color: "bg-destructive" },
    medium: { label: "Medium", bars: 2, color: "bg-yellow-500" },
    strong: { label: "Strong", bars: 3, color: "bg-emerald-500" },
  };

  const { label, bars, color } = levels[strength] || levels.weak;

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 w-10 rounded-full transition-colors ${
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
