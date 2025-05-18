import React from "react";

const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.",
    name: "Jane Doe",
    title: "Chief Strategy Officer",
  },
  {
    quote:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod.",
    name: "Michael Smith",
    title: "Head of Product",
  },
  {
    quote:
      "Nullam quis risus eget urna mollis ornare vel eu leo. Vivamus sagittis lacus vel augue laoreet rutrum faucibus.",
    name: "Alina Rivers",
    title: "CTO, LoremTech Inc.",
  },
];

const TestimonialShowcase: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-center text-[rgb(var(--copy-primary))] mb-12">
        Trusted by Professionals
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow p-8 flex flex-col"
          >
            <blockquote className="text-[rgb(var(--copy-secondary))] italic mb-6">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-auto">
              <p className="text-[rgb(var(--copy-primary))] font-semibold">
                {testimonial.name}
              </p>
              <p className="text-sm text-[rgb(var(--copy-secondary))]">
                {testimonial.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialShowcase;
