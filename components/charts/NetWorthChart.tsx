"use client";

import { useState, useMemo } from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  projectNetWorth,
  FinancialInputs,
  YearProjection,
} from "@/lib/finance/projectNetWorth";

const DUREES = [10, 20, 40, 60, 80, 100];

const COURBES = [
  { key: "patrimoineNet", label: "Valeur nette", color: "#6366f1" },
  { key: "epargne", label: "Épargne", color: "#06b6d4" },
  { key: "investissements", label: "Investissements", color: "#a855f7" },
  { key: "dettes", label: "Dettes", color: "#ef4444" },
] as const;

export default function NetWorthChart({ inputs }: { inputs: FinancialInputs }) {
  const [duree, setDuree] = useState(40);
  const [courbesActives, setCourbesActives] = useState<Set<string>>(
    new Set(["patrimoineNet"])
  );

  const data: YearProjection[] = useMemo(
    () => projectNetWorth(inputs, duree),
    [inputs, duree]
  );

  const tickInterval = duree <= 10 ? 1 : duree <= 40 ? 4 : duree <= 60 ? 9 : 19;

  const formatMoney = (value: number) =>
    value.toLocaleString("fr-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });

  const revenuMensuel = inputs.salaire_mensuel + inputs.autres_revenus;

  function toggleCourbe(key: string) {
    setCourbesActives((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
        <div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Évolution de ta situation financière
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] opacity-70">
            Basé sur ta situation actuelle, maintenue constante
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {DUREES.map((d) => (
            <button
              key={d}
              onClick={() => setDuree(d)}
              className={`text-xs px-2.5 py-1 rounded-full transition ${
                duree === d
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10"
              }`}
            >
              {d} ans
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 my-4">
        {COURBES.map((c) => (
          <button
            key={c.key}
            onClick={() => toggleCourbe(c.key)}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition ${
              courbesActives.has(c.key)
                ? "border-white/20 bg-white/10"
                : "border-white/5 opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c.color }}
            />
            {c.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="annee"
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            interval={tickInterval}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => v.toLocaleString("fr-CA")}
            width={80}
          />
<Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || payload.length === 0) return null;
              const point = payload[0].payload as YearProjection;
              const valeurs: Record<string, number> = {
                patrimoineNet: point.patrimoineNet,
                epargne: point.epargne,
                investissements: point.investissements,
                dettes: point.dettes,
              };
              return (
                <div className="bg-[#1a1f2e] border border-white/15 rounded-lg p-3 text-xs space-y-1">
                  <p className="font-semibold mb-1">Année {label}</p>
                  {COURBES.filter((c) => courbesActives.has(c.key)).map((c) => (
                    <p key={c.key} style={{ color: c.color }}>
                      {c.label} : {formatMoney(valeurs[c.key])}
                    </p>
                  ))}
                </div>
              );
            }}
          />
          {COURBES.filter((c) => courbesActives.has(c.key)).map((c) => (
            <Line
              key={c.key}
              type="monotone"
              dataKey={c.key}
              stroke={c.color}
              strokeWidth={2}
              dot={false}
              name={c.label}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}