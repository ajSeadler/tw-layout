import React from "react";

interface CardData {
  title: string;
  description: string;
  ctaLabel: string;
  imageUrl: string;
}

const cards: CardData[] = [
  {
    title: "Fast Connections",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ctaLabel: "Learn More",
    imageUrl:
      "https://plus.unsplash.com/premium_vector-1726290125904-36bf8aaf84da?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFzdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Card Two",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ctaLabel: "Get Started",
    imageUrl:
      "https://images.unsplash.com/vector-1745866415910-9d6e23ce6fe0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxpbGx1c3RyYXRpb25zLWZlZWR8NDF8fHxlbnwwfHx8fHw%3D",
  },
  {
    title: "Card Three",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ctaLabel: "Discover",
    imageUrl: "https://source.unsplash.com/random/400x250?innovation",
  },
];

const CardGrid: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <article
            key={idx}
            className="flex flex-col rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-[rgb(var(--copy-primary))] mb-4">
                {card.title}
              </h3>
              <p className="text-[rgb(var(--copy-secondary))] flex-grow leading-relaxed">
                {card.description}
              </p>
              <button
                type="button"
                className="mt-6 self-start rounded-lg bg-[rgb(var(--cta))] px-6 py-3 font-semibold text-[rgb(var(--cta-text))] shadow-sm hover:bg-[rgb(var(--cta-active))] transition-colors duration-300"
              >
                {card.ctaLabel}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CardGrid;
