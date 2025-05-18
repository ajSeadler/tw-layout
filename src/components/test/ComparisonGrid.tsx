import React from "react";

const plans = [
  {
    name: "Starter",
    description: "Basic tools to get started with your workflow.",
    price: "$9",
    features: ["1 Project", "Basic Analytics", "Email Support"],
  },
  {
    name: "Professional",
    description: "Advanced features for growing teams and businesses.",
    price: "$29",
    features: ["Unlimited Projects", "Priority Analytics", "24/7 Support"],
  },
  {
    name: "Enterprise",
    description: "Custom solutions and hands-on support.",
    price: "Custom",
    features: ["Custom Integrations", "Dedicated Manager", "Uptime SLA"],
  },
];

const ComparisonGrid: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-2xl font-bold text-center text-[rgb(var(--copy-primary))] mb-12">
        Choose the plan that fits you
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow p-8"
          >
            <h3 className="text-2xl font-semibold text-[rgb(var(--copy-primary))] mb-1">
              {plan.name}
            </h3>
            <p className="text-[rgb(var(--copy-secondary))] mb-4">
              {plan.description}
            </p>
            <p className="text-4xl font-bold text-[rgb(var(--copy-primary))] mb-6">
              {plan.price}
              <span className="text-base font-medium text-[rgb(var(--copy-secondary))] ml-1">
                /mo
              </span>
            </p>
            <ul className="flex-1 mb-6 space-y-2 text-[rgb(var(--copy-primary))]">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[rgb(var(--cta))]" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full mt-auto py-3 font-medium bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] rounded-lg transition-colors duration-300">
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComparisonGrid;
