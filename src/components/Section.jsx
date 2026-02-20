export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-slate-300">{description}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
