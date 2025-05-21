const BisonPhysicalCard = () => {
  return (
    <section
      aria-label="Bison Physical Characteristics"
      className=" mx-auto bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-xl p-6 flex flex-col space-y-5"
      style={{ minHeight: "auto" }}
    >
      <h3 className="text-xl font-semibold text-[rgb(var(--copy-primary))] tracking-wide">
        Physical Characteristics
      </h3>

      <div className="flex items-center space-x-4">
        <img
          src="https://images.unsplash.com/photo-1613744788621-05fdc92f9de2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymlzb258ZW58MHx8MHx8fDA%3D"
          alt="Close-up of a bison's head"
          className="w-24 h-auto rounded-lg object-cover shadow-md flex-shrink-0"
        />
        <dl className="grid grid-cols-2 gap-y-2 w-full text-sm text-[rgb(var(--copy-secondary))]">
          <div>
            <dt className="font-semibold text-[rgb(var(--copy-primary))]">
              Height
            </dt>
            <dd>5 to 6.5 ft (at shoulder)</dd>
          </div>
          <div>
            <dt className="font-semibold text-[rgb(var(--copy-primary))]">
              Weight
            </dt>
            <dd>900 to 2,200 lbs (males)</dd>
          </div>
          <div>
            <dt className="font-semibold text-[rgb(var(--copy-primary))]">
              Lifespan
            </dt>
            <dd>10-20 years in the wild</dd>
          </div>
          <div>
            <dt className="font-semibold text-[rgb(var(--copy-primary))]">
              Coat
            </dt>
            <dd>Thick dark brown fur, sheds in spring</dd>
          </div>
        </dl>
      </div>

      <p className="text-sm text-[rgb(var(--copy-secondary))] leading-relaxed">
        Bison have a distinctive hump and massive head which helps them survive
        harsh winters by plowing snow to reach grasses beneath.
      </p>

      <button
        type="button"
        className="self-start px-5 py-2 rounded-lg bg-[rgb(var(--cta))] hover:bg-[rgb(var(--cta-active))] text-[rgb(var(--cta-text))] font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--cta))] focus:ring-offset-2"
      >
        Learn More
      </button>
    </section>
  );
};

export default BisonPhysicalCard;
