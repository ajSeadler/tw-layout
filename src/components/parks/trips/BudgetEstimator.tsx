import React from "react";

type Inputs = {
  lodgingPerNight: number;
  parkFees: number;
  gasPerMile: number;
};

type Props = {
  budgetInputs: Inputs;
  onChange: (newInputs: Inputs) => void;
};

const BudgetEstimator: React.FC<Props> = ({ budgetInputs, onChange }) => {
  const handle =
    (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...budgetInputs, [key]: parseFloat(e.target.value) || 0 });
    };

  const inputClass =
    "w-full rounded-xl border border-[rgb(var(--border))] bg-transparent px-4 py-2 text-sm text-[rgb(var(--copy-primary))] placeholder-[rgb(var(--copy-secondary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))]";

  return (
    <section className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 md:p-8 shadow-lg text-[rgb(var(--copy-primary))] space-y-6">
      <header>
        <h2 className="text-2xl font-bold leading-tight tracking-tight mb-1">
          Budget Estimator
        </h2>
        <p className="text-sm text-[rgb(var(--copy-secondary))]">
          Set your expected trip costs per category.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(var(--copy-secondary))]">
            Lodging per night
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={budgetInputs.lodgingPerNight}
            onChange={handle("lodgingPerNight")}
            className={inputClass}
            placeholder="e.g. 120"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(var(--copy-secondary))]">
            Park fees (total)
          </label>
          <input
            type="number"
            min={0}
            step={1}
            value={budgetInputs.parkFees}
            onChange={handle("parkFees")}
            className={inputClass}
            placeholder="e.g. 35"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[rgb(var(--copy-secondary))]">
            Gas cost per mile
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={budgetInputs.gasPerMile}
            onChange={handle("gasPerMile")}
            className={inputClass}
            placeholder="e.g. 0.18"
          />
        </div>
      </div>
    </section>
  );
};

export default BudgetEstimator;
