import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Artha Revenue — Stop Losing Med Spa Leads" },
      {
        name: "description",
        content:
          "Performance-based lead conversion for med spas. Turn existing inquiries into booked appointments. You only pay when it works.",
      },
      { property: "og:title", content: "Artha Revenue — The Med Spa Booking System" },
      {
        property: "og:description",
        content:
          "Most med spas lose 30–50% of revenue to slow replies. We fix that. Pay only for booked appointments.",
      },
      { property: "og:url", content: "https://arthagrowth.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://arthagrowth.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Artha Revenue",
          url: "https://arthagrowth.lovable.app/",
          description:
            "Performance-based lead conversion service for med spas and aesthetic clinics.",
          areaServed: "Worldwide",
          serviceType: "Lead Conversion & Revenue Optimization",
        }),
      },
    ],
  }),
  component: Index,
});

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.9s ease-out ${delay}ms, transform 0.9s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <Problem />
      <Solution />
      <Offer />
      <Logic />
      <Process />
      <FinalCta />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse-dot" />
          <span className="font-display text-xl tracking-tight">Artha<span className="text-gold">.</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
          <a href="#solution" className="hover:text-foreground transition-colors">Solution</a>
          <a href="#offer" className="hover:text-foreground transition-colors">Offer</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
        </nav>
        <a
          href="https://calendly.com/shreyaasrapolu528/30min"
          target="_blank"
          rel="noreferrer"
          className="text-sm px-4 py-2 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
        >
          Free Audit
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 0%, var(--gold) 0%, transparent 60%)" }}
      />
      <div className="max-w-5xl mx-auto relative">
        <Reveal>
          <p className="eyebrow mb-8">For Med Spas & Aesthetic Clinics</p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl">
            You're not losing leads.
            <br />
            <span className="text-gold italic">You're ignoring them.</span>
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Most med spas lose 30–50% of potential revenue to slow replies and weak follow-up.
            We fix the leak — and you only pay when a lead becomes a booked appointment.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#solution"
              className="px-6 py-3 rounded-md bg-gold text-primary-foreground font-medium hover:bg-gold-soft transition-colors"
            >
              See How It Works
            </a>
            <a
              href="https://calendly.com/shreyaasrapolu528/30min"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-md border border-border text-foreground hover:border-gold hover:text-gold transition-colors"
            >
              Get a Free Audit →
            </a>
          </div>
        </Reveal>
        <Reveal delay={550}>
          <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground/70">
            Performance-based · No retainers · Zero risk
          </p>
        </Reveal>

        <Reveal delay={700} className="mt-24">
          <LeakDiagram />
        </Reveal>
      </div>
    </section>
  );
}

function LeakDiagram() {
  return (
    <div className="border border-border rounded-xl bg-surface/60 p-8 md:p-10">
      <div className="flex items-center justify-between gap-4 text-sm">
        <Node label="Lead in" sub="Form / call / DM" tone="foreground" />
        <Arrow label="5–30 min delay" warn />
        <Node label="Cold" sub="Intent drops 80%" tone="muted" />
        <Arrow label="No follow-up" warn />
        <Node label="Lost revenue" sub="Booked elsewhere" tone="destructive" />
      </div>
    </div>
  );
}

function Node({ label, sub, tone }: { label: string; sub: string; tone: "foreground" | "muted" | "destructive" }) {
  const ring = tone === "foreground" ? "border-gold/60" : tone === "destructive" ? "border-destructive/60" : "border-border";
  const color = tone === "foreground" ? "text-foreground" : tone === "destructive" ? "text-destructive" : "text-muted-foreground";
  return (
    <div className={`flex-1 min-w-0 border ${ring} rounded-lg px-4 py-5 bg-background/40`}>
      <div className={`font-medium ${color}`}>{label}</div>
      <div className="text-xs text-muted-foreground mt-1 truncate">{sub}</div>
    </div>
  );
}

function Arrow({ label, warn }: { label: string; warn?: boolean }) {
  return (
    <div className="hidden sm:flex flex-col items-center text-[10px] uppercase tracking-widest text-muted-foreground/80 w-28">
      <span className={warn ? "text-destructive/80" : ""}>{label}</span>
      <div className="relative w-full h-px bg-border mt-2 overflow-hidden">
        <span className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold to-transparent animate-flow" />
      </div>
    </div>
  );
}

function Problem() {
  const bullets = [
    { k: "5–30 min", v: "Average reply time. Intent collapses after 5." },
    { k: "1–2 only", v: "Follow-ups before silence. It takes 7–12." },
    { k: "0 tracking", v: "No visibility into where leads disappear." },
  ];
  return (
    <section id="problem" className="py-32 px-6 border-t border-border/60">
      <div className="max-w-5xl mx-auto">
        <Reveal><p className="eyebrow mb-6">The Problem</p></Reveal>
        <Reveal delay={100}>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">
            The hidden leak in your business.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-muted-foreground leading-relaxed">
            Leads come in every day. The system doesn't move fast enough to catch them.
            By the time someone replies, the prospect has already moved on.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {bullets.map((b, i) => (
            <Reveal key={b.k} delay={i * 120}>
              <div className="border border-border rounded-xl p-8 bg-surface/40 h-full">
                <div className="font-display text-4xl text-gold">{b.k}</div>
                <p className="mt-3 text-sm text-muted-foreground">{b.v}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <p className="mt-16 text-center font-display italic text-2xl md:text-3xl text-gold">
            "This is where most revenue is lost."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Solution() {
  const steps = [
    { n: "01", t: "Instant Response", d: "Every new lead gets a personal, qualified reply in under 60 seconds — day, night, weekend." },
    { n: "02", t: "Structured Follow-Up", d: "A 10–15 touch sequence across SMS, email and call. Nothing falls through." },
    { n: "03", t: "Booking Optimization", d: "Friction-free booking, reminders, and no-show recovery — straight onto your calendar." },
  ];
  return (
    <section id="solution" className="py-32 px-6 border-t border-border/60 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <Reveal><p className="eyebrow mb-6">The Fix</p></Reveal>
        <Reveal delay={100}>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">How we fix it.</h2>
        </Reveal>

        <div className="mt-16 space-y-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="grid grid-cols-[auto_1fr] gap-8 md:gap-12 border-b border-border/60 pb-8 items-start">
                <div className="font-display text-5xl md:text-6xl text-gold/80 leading-none">{s.n}</div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground max-w-2xl">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-16">
          <div className="border border-gold/30 rounded-xl p-6 bg-background/40">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <FlowStep>Lead</FlowStep>
              <FlowArrow />
              <FlowStep>Instant reply</FlowStep>
              <FlowArrow />
              <FlowStep>Follow-ups</FlowStep>
              <FlowArrow />
              <FlowStep highlight>Booking</FlowStep>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowStep({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`px-4 py-2 rounded-md border ${highlight ? "border-gold text-gold bg-gold/5" : "border-border text-foreground"}`}>
      {children}
    </div>
  );
}
function FlowArrow() {
  return (
    <div className="relative h-px w-12 bg-border overflow-hidden hidden sm:block">
      <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-gold to-transparent animate-flow" />
    </div>
  );
}

function Offer() {
  return (
    <section id="offer" className="py-32 px-6 border-t border-border/60">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal><p className="eyebrow mb-6">The Offer</p></Reveal>
        <Reveal delay={100}>
          <h2 className="display text-5xl md:text-7xl">
            Zero risk. <span className="italic text-gold">Pay for results.</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <div className="mt-12 grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {[
              { t: "No upfront fees", d: "We carry the build cost." },
              { t: "No retainers", d: "Cancel anytime, no claw-back." },
              { t: "Pay per booking", d: "Only when a lead books in." },
            ].map((c) => (
              <div key={c.t} className="bg-surface p-8">
                <div className="font-display text-2xl">{c.t}</div>
                <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={400}>
          <p className="mt-12 font-display italic text-2xl md:text-3xl text-gold">
            "If it doesn't work, you don't pay."
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Logic() {
  return (
    <section className="py-32 px-6 border-t border-border/60 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <Reveal><p className="eyebrow mb-6">The Math</p></Reveal>
        <Reveal delay={100}>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">
            You're already getting leads. <span className="italic text-gold">Convert more of them.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Reveal delay={150}>
            <Card label="Today" tone="muted">
              <Stat n="100" l="Leads / month" />
              <Stat n="15" l="Booked appointments" />
              <Stat n="15%" l="Conversion" muted />
            </Card>
          </Reveal>
          <Reveal delay={300}>
            <Card label="With Artha" tone="gold">
              <Stat n="100" l="Leads / month" />
              <Stat n="25" l="Booked appointments" gold />
              <Stat n="25%" l="Conversion" gold />
            </Card>
          </Reveal>
        </div>

        <Reveal delay={500}>
          <p className="mt-16 text-center font-display italic text-2xl md:text-3xl">
            That difference is <span className="text-gold">your upside.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ label, tone, children }: { label: string; tone: "muted" | "gold"; children: React.ReactNode }) {
  const border = tone === "gold" ? "border-gold/50" : "border-border";
  return (
    <div className={`border ${border} rounded-xl p-8 bg-background/50 h-full`}>
      <p className="eyebrow mb-6" style={tone === "muted" ? { color: "var(--muted-foreground)" } : undefined}>{label}</p>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
function Stat({ n, l, gold, muted }: { n: string; l: string; gold?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 pb-3">
      <span className={`font-display text-4xl ${gold ? "text-gold" : muted ? "text-muted-foreground" : "text-foreground"}`}>{n}</span>
      <span className="text-sm text-muted-foreground">{l}</span>
    </div>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Audit", d: "We map your current intake, response and follow-up flow. Find the leaks." },
    { n: "02", t: "Identify", d: "Pinpoint where leads die — response time, sequence gaps, booking friction." },
    { n: "03", t: "Implement", d: "Deploy the instant-response and structured follow-up system in 14 days." },
    { n: "04", t: "Track", d: "Live dashboard. Every lead, every reply, every booking — accounted for." },
  ];
  return (
    <section id="process" className="py-32 px-6 border-t border-border/60">
      <div className="max-w-5xl mx-auto">
        <Reveal><p className="eyebrow mb-6">The Process</p></Reveal>
        <Reveal delay={100}>
          <h2 className="display text-4xl md:text-6xl max-w-3xl">
            What working with us looks like.
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="flex gap-6">
                <div className="font-display text-3xl text-gold/80 leading-none w-12 shrink-0">{s.n}</div>
                <div>
                  <h3 className="font-display text-2xl">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="cta" className="py-40 px-6 border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 60%)" }}
      />
      <div className="max-w-4xl mx-auto text-center relative">
        <Reveal>
          <h2 className="display text-5xl md:text-7xl">
            You already have the leads.
            <br />
            <span className="italic text-gold">Let's fix the system.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/shreyaasrapolu528/30min"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-md bg-gold text-primary-foreground font-medium hover:bg-gold-soft transition-colors"
            >
              Book a Call
            </a>
            <a
              href="https://calendly.com/shreyaasrapolu528/30min"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-md border border-border hover:border-gold hover:text-gold transition-colors"
            >
              Request Free Audit
            </a>
          </div>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-8 text-sm text-muted-foreground">
            {"\n"}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-gold" />
          <span className="font-display text-3xl text-foreground tracking-tight">Artha<span className="text-gold">.</span></span>
        </div>
        <div className="flex items-center gap-8 text-sm text-muted-foreground">
          <a href="mailto:hello@artharevenue.co" className="hover:text-foreground transition-colors">{"\n"}</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">{"\n"}</a>
        </div>
        <p className="text-sm text-muted-foreground">{"\n"}</p>
      </div>
    </footer>
  );
}
