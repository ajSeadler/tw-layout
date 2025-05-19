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

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-semibold">Budget Estimator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm">Lodging per night ($)</label>
          <input
            type="number"
            value={budgetInputs.lodgingPerNight}
            onChange={handle("lodgingPerNight")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Park fees (total $)</label>
          <input
            type="number"
            value={budgetInputs.parkFees}
            onChange={handle("parkFees")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Gas ($/mile)</label>
          <input
            type="number"
            value={budgetInputs.gasPerMile}
            onChange={handle("gasPerMile")}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimator;
