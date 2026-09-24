// Pack-size picker for one parent seed. Out-of-stock sizes are shown but disabled.
export default function WeightSelector({ variants, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Pack size"
      className="flex flex-wrap gap-2"
    >
      {variants.map((v) => {
        const active = v.id === value;
        return (
          <button
            key={v.id}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={!v.inStock}
            onClick={() => onChange(v.id)}
            className={`min-h-11 px-4 py-2 rounded-full border text-sm font-medium transition ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-accent"
            } ${!v.inStock ? "opacity-50 line-through cursor-not-allowed" : ""}`}
          >
            {v.weight}
          </button>
        );
      })}
    </div>
  );
}
