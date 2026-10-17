import { SKILLS, type SkillLevels } from "find-my-business-engine";

const LEVEL_LABEL = ["", "Some", "Strong"] as const;

export function SkillsPicker({
  skills,
  onChange,
  prompt,
}: {
  skills: SkillLevels;
  onChange: (skills: SkillLevels) => void;
  prompt: boolean;
}) {
  const cycle = (id: string) => {
    const next = (((skills[id] ?? 0) + 1) % 3) as 0 | 1 | 2;
    onChange({ ...skills, [id]: next });
  };

  return (
    <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
      <p className="font-medium">
        {prompt ? "Tell us what you already know." : "Your skills"}{" "}
        <span className="font-normal text-muted">Tap once for some experience, twice for strong.</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SKILLS.map((s) => {
          const level = skills[s.id] ?? 0;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => cycle(s.id)}
              aria-label={`${s.name}: ${level === 0 ? "none" : LEVEL_LABEL[level]}`}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                level === 2
                  ? "border-accent-ink bg-accent-ink text-surface"
                  : level === 1
                    ? "border-accent bg-accent-soft"
                    : "border-line hover:border-accent"
              }`}
            >
              {s.name}
              {level > 0 && <span className="ml-1 text-xs opacity-80">· {LEVEL_LABEL[level]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
