import type { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <>
      <section className="mt-10 mb-20 flex flex-col justify-center items-center  px-6 text-[rgb(var(--copy-primary))] bg-[rgb(var(--background))]">
        <div className="max-w-4xl text-center justify-center">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Hero Section
          </h1>

          <p className="text-lg mb-10 text-[rgb(var(--copy-secondary))] max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, dignissimos provident fuga quis molestias distinctio
            voluptatibus aliquid officiis unde molestiae deleniti a ab,
            asperiores accusantium velit, culpa eos? Eum, tempo
          </p>
          <button
            type="button"
            className="inline-flex items-center px-8 py-3 rounded-xl bg-[rgb(var(--cta))] text-[rgb(var(--cta-text))] font-semibold shadow-md hover:bg-[rgb(var(--cta-active))] transition-colors duration-300"
          >
            Check ’Em
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
