import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./_group.css";

gsap.registerPlugin(ScrollTrigger);

const flavors = [
  ["Cacao nib", "Deep, rounded and quietly sweet. The first note to arrive, and the one that lingers."],
  ["Stone fruit", "A bright, apricot-like lift that keeps the cup moving."],
  ["Brown sugar", "A soft finish with the warmth of something just caramelised."],
  ["Black tea", "A clean, lightly tannic structure beneath the sweetness."],
];

const faqs = [
  ["How should I brew it?", "Start with a 1:16 ratio. We love a V60 at 94°C, but this coffee is remarkably forgiving. Let the water take its time."],
  ["When was this coffee roasted?", "Every pouch leaves our roastery within 48 hours of roast. The date is printed on the back of your bag."],
  ["Is this coffee seasonal?", "Yes. Point of View follows the harvest, not a calendar. When West Java changes, this page changes with it."],
];

const processSteps = [
  ["Bean", "Only the ripest cherries make the cut."],
  ["Roast", "Slow enough to keep the character intact."],
  ["Grind", "A precise pause before the water arrives."],
  ["Brew", "Let the cup take its time."],
  ["Cup", "Good things are worth noticing."],
];

type SceneProps = {
  id: string;
  index: number;
  className?: string;
  children: React.ReactNode;
};

function Scene({ id, index, className = "", children }: SceneProps) {
  return (
    <section className={`cs-scene ${className}`} data-scene={id}>
      <div className="cs-scene-stage">
        <div className="cs-scene-index">0{index} <span>/ 09</span></div>
        {children}
      </div>
    </section>
  );
}

function Pouch({ className = "", alt = "Point of View coral coffee pouch" }: { className?: string; alt?: string }) {
  return <img className={`cs-pouch ${className}`} src="/images/coffee-pouch.png" alt={alt} />;
}

export function CoffeeStory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flavor, setFlavor] = useState(0);
  const [faq, setFaq] = useState<number | null>(null);
  const [toast, setToast] = useState(false);
  const storyRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = storyRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(root.querySelectorAll(".cs-scene-element"), { clearProps: "all" });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 701px)", () => {
        const scenes = gsap.utils.toArray<HTMLElement>(".cs-scene");

        scenes.forEach((scene) => {
          const id = scene.dataset.scene;
          const stage = scene.querySelector(".cs-scene-stage");
          if (!stage || !id) return;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.15,
              pin: stage,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          });

          if (id === "product") {
            timeline
              .fromTo(".scene-product-copy", { x: 0, opacity: 1 }, { x: -90, opacity: 0, ease: "none" }, 0.12)
              .fromTo(".scene-product-pouch", { x: 0, y: 0, rotate: 0, scale: 1 }, { x: -110, y: -52, rotate: 4, scale: 1.54, ease: "none" }, 0.08)
              .fromTo(".scene-product-word", { y: 0, opacity: 0 }, { y: -200, x:-730, opacity: 0.5, ease: "none" }, 0.95)
              .fromTo(".scene-product-bg", { scale: 1, opacity: 1 }, { scale: 1.3, opacity: 0.1, ease: "none" }, 0.45)
              .fromTo(".scene-product-next", { x: 110, opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0.62);
          }

          if (id === "brand") {
            timeline
              .fromTo(".scene-brand-word", { y: 120, rotate: -7, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, stagger: 0.08, ease: "power2.out" }, 0)
              .fromTo(".scene-brand-pouch", { x: 240, rotate: 8, scale: 0.7, opacity: 0 }, { x: 0, rotate: -4, scale: 0.9, opacity: 0.9, ease: "none" }, 0.18)
              .to(".scene-brand-word", { x: -110, scale: 1.08, stagger: 0.04, ease: "none" }, 0.55)
              .to(".scene-brand-pouch", { x: -210, rotate: -12, scale: 1.42, opacity: 0.6, ease: "none" }, 0.62)
              .fromTo(".scene-brand-next", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.72);
          }

          if (id === "coffee") {
            timeline
              .fromTo(".scene-coffee-pouch", { x: 780, rotate: 8, scale: 0.72 }, { x: 100, rotate: -3, scale: 1, ease: "none" }, 0)
              .fromTo(".scene-coffee-heading", { x: 780, rotate: 0, scale: 1, opacity:0 }, { x: 0, rotate: 0, scale: 1, opacity: 1, ease: "none" }, 0)
              .fromTo(".scene-coffee-meta", { x: 100, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.07, ease: "power2.out" }, 0.22)
              .to(".scene-coffee-pouch", { x: 70, y: 12, rotate: 5,  scale: 0.88, ease: "none" }, 0.62)
              .to(".scene-coffee-heading", { y: 300, rotate: 0, scale: 1, opacity: 0, ease: "none" }, 1)
              .fromTo(".scene-coffee-next", { x: 180, opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0.7);
          }

          if (id === "flavor") {
            timeline
              .fromTo(".scene-flavor-word", { y: 100, opacity: 0, rotate: 4 }, { y: 0, opacity: 1, rotate: 0, stagger: 0.07, ease: "power2.out" }, 0)
              .fromTo(".scene-flavor-pouch", { x: -160, rotate: -8, scale: 0.72, opacity: 0.2 }, { y: -100, rotate: 2, scale: 1.9, opacity: 1, ease: "none" }, 0.2)
              .to(".scene-flavor-word", { x: (i) => (i % 2 === 0 ? -100 : 100), opacity: 0.18, stagger: 0.04, ease: "none" }, 0.62)
              .to(".scene-flavor-pouch", { y: -100, x: -120, rotate: 11, scale: 1.9, opacity: 1, ease: "none" }, 0.68)
              .fromTo(".scene-flavor-next", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.72);
          }

          if (id === "origin") {
            timeline
              .fromTo(".scene-origin-landscape", { x: 110, scale: 1.1 }, { x: -100, scale: 1, ease: "none" }, 0)
              .fromTo(".scene-origin-title", { scale: 1.35, x: 120, opacity: 0.2 }, { scale: 1, x: 0, opacity: 1, ease: "none" }, 0.1)
              .fromTo(".scene-origin-pouch", { x: -210, y: 80, rotate: -10, opacity: 0 }, { x: -400, y: -200, rotate: 3,scale: 1.7, opacity: 1, ease: "none" }, 0.28)
              .fromTo(".scene-origin-meta", { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, ease: "power2.out" }, 0.45)
              .to(".scene-origin-meta", { x: -700, opacity: 1, stagger: 0.05, ease: "power2.out" }, 1.36)
              .to(".scene-origin-title", { scale: 1, x: 0,  y: 400, opacity: 1, ease: "none" }, 0.76)
              .to(".scene-origin-pouch", { x: 70, y: -170, rotate: 8, scale: 1.82, ease: "none" }, 1);
          }

          if (id === "process") {
            timeline
              .fromTo(".scene-process-track", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", ease: "none" }, 0)
              .fromTo(".scene-process-dot", { x: 0 }, { x: "calc(100% - 18px)", ease: "none" }, 0)
              .fromTo(".scene-process-active", { x: 0 }, { x: 0, ease: "none" }, 0)
              .to(".scene-process-active", { x: "80%", ease: "none" }, 0.65)
              .fromTo(".scene-process-caption", { y: 80, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.28)
              .to(".scene-process-orbit", { rotate: 210, scale: 1.16, ease: "none" }, 0);
          }

          if (id === "packaging") {
            timeline
              .fromTo(".scene-package-pouch", { x: -480, y: 80, rotate: -18, scale: 0.62 }, { x: 0, y: 0, rotate: 0, scale: 1.35, ease: "none" }, 0)
              .fromTo(".scene-package-beans", { x: 280, y: 110, rotate: -30, opacity: 0 }, { x: 0, y: 0, rotate: 0, opacity: 1, ease: "none" }, 0.2)
              .fromTo(".scene-package-type", { x: 180, opacity: 0.1 }, { x: -70, opacity: 1, ease: "none" }, 0.18)
              .to(".scene-package-pouch", { x: 340, y: -20, rotate: 7, scale: 1.12, ease: "none" }, 0.62)
              .to(".scene-package-type", { x: -230, opacity: 0.15, ease: "none" }, 0.72);
          }

          if (id === "statement") {
            timeline
              .fromTo(".scene-statement-line", { x: 180, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, ease: "power2.out" }, 0)
              .to(".scene-statement-line", { x: (i) => (i === 1 ? -100 : i === 2 ? 90 : -40), opacity: 0.35, stagger: 0.04, ease: "none" }, 0.64)
              .fromTo(".scene-statement-note", { y: 100, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.52);
          }

          if (id === "final") {
            timeline
              .fromTo(".scene-final-pouch", { y: 100, rotate: -4, scale: 0.82, opacity: 0 }, { y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power2.out" }, 0)
              .fromTo(".scene-final-copy", { x: -100, opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0.25)
              .to(".scene-final-pouch", { y: -18, rotate: 2, scale: 1.05, ease: "none" }, 0.68)
              .fromTo(".scene-final-cta", { y: 70, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.62);
        }
      });
      });

      mm.add("(max-width: 700px)", () => {
        gsap.utils.toArray<HTMLElement>(".cs-scene").forEach((scene) => {
          const stage = scene.querySelector(".cs-scene-stage");
          if (!stage) return;
          gsap.timeline({
            scrollTrigger: { trigger: scene, start: "top top", end: "bottom bottom", scrub: 1, pin: stage, pinSpacing: false },
          }).fromTo(stage.querySelectorAll(".cs-scene-element"), { y: 35, opacity: 0.55 }, { y: 0, opacity: 1, stagger: 0.08, ease: "none" }, 0);
        });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  const shop = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 2800);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={storyRef} className="coffee-story">
      <nav className="cs-nav">
        <a className="cs-logo" href="#story">point <i>of</i> view</a>
        <div className="cs-scroll-meter"><span>SCROLL TO MOVE THROUGH THE STORY</span><i /></div>
        <button className="cs-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? "CLOSE" : "MENU"}</button>
        <div className={`cs-links ${menuOpen ? "open" : ""}`}>
          <a href="#story" onClick={closeMenu}>STORY</a><a href="#coffee" onClick={closeMenu}>COFFEE</a><a href="#origin" onClick={closeMenu}>ORIGIN</a><a href="#shop" onClick={closeMenu}>SHOP</a>
        </div>
      </nav>

      <Scene id="product" index={1} className="cs-scene-product" >
        <div className="scene-product-bg cs-scene-element" />
        <div className="scene-product-copy cs-scene-element">
          <div className="cs-kicker">A coffee with a point of view / opening scene</div>
          <h1>Look<br />closer.<br /><em>Taste</em><br />more.</h1>
          <p className="cs-hero-intro">A small-batch coffee for people who notice the details. Roasted with curiosity in mind.</p>
          <a className="cs-arrow" href="#coffee" aria-label="Move to the coffee scene">↓</a>
        </div>
        <div className="scene-product-art cs-scene-element"><Pouch className="scene-product-pouch" /><span className="cs-stamp">WEST JAVA · 2024 HARVEST</span><span className="scene-product-word">GunungHalu<br />Coffee</span></div>
        <div className="scene-product-next cs-scene-element">01 / THE PRODUCT BECOMES A STORY</div>
      </Scene>

      <div className="cs-marquee"><span>ORIGIN MATTERS &nbsp; / &nbsp; TAKE THE LONG WAY ROUND &nbsp; / &nbsp; COFFEE FOR THE CURIOUS &nbsp; / &nbsp; ORIGIN MATTERS &nbsp; / &nbsp; TAKE THE LONG WAY ROUND &nbsp; / &nbsp;</span></div>

      <Scene id="brand" index={2} className="cs-scene-brand">
        <div className="scene-brand-copy">
          <div className="cs-label cs-scene-element">02 / The brand</div>
          <div className="scene-brand-title"><span className="scene-brand-word cs-scene-element">COFFEE</span><span className="scene-brand-word cs-scene-element">WITH A</span><span className="scene-brand-word scene-brand-accent cs-scene-element">POINT OF VIEW.</span></div>
          <p className="scene-brand-next cs-scene-element">We roast to reveal what is already there. No dark disguises — just a patient conversation between bean, heat and time.</p>
        </div>
        <Pouch className="scene-brand-pouch cs-scene-element" />
        <span className="scene-brand-side cs-scene-element">ROASTED WITH CURIOSITY</span>
      </Scene>

      <Scene id="coffee" index={3} className="cs-scene-coffee">
        <div className="scene-coffee-heading cs-scene-element"><div className="cs-label">03 / The coffee</div><h2>The<br /><em>current</em><br />roast.</h2></div>
        <Pouch className="scene-coffee-pouch cs-scene-element" alt="Point of View current roast coffee pouch" />
        <div className="scene-coffee-meta">
          <p className="scene-coffee-intro cs-scene-element">A washed Ateng Super from the volcanic slopes of West Java. Clear, lively, and made to be found slowly.</p>
          {[["Origin", "West Java, Indonesia"], ["Process", "Washed / sun-dried"], ["Roast", "Light / expressive"], ["Size", "250 grams"]].map(([label, value]) => <div className="scene-coffee-row cs-scene-element" key={label}><small>{label}</small><strong>{value}</strong></div>)}
        </div>
        <div className="scene-coffee-next cs-scene-element">THE CUP OPENS INTO FLAVOR</div>
      </Scene>

      <Scene id="flavor" index={4} className="cs-scene-flavor">
        <div className="scene-flavor-header cs-scene-element"><div className="cs-label">04 / The tasting notes</div><h2>Move<br />through<br /><em>flavor.</em></h2></div>
        <div className="scene-flavor-words">{flavors.map((item, i) => <button key={item[0]} className={`scene-flavor-word cs-scene-element ${flavor === i ? "active" : ""}`} onClick={() => setFlavor(i)}>{item[0]}</button>)}</div>
        <Pouch className="scene-flavor-pouch cs-scene-element" alt="Point of View pouch surrounded by flavor notes" />
        <div className="scene-flavor-note cs-scene-element"><span>NOW TASTING</span><h3>{flavors[flavor][0]}</h3><p>{flavors[flavor][1]}</p></div>
        <div className="scene-flavor-next cs-scene-element">THE LANDSCAPE IS NEXT</div>
      </Scene>

      <Scene id="origin" index={5} className="cs-scene-origin">
        <div className="scene-origin-landscape cs-scene-element"><span /><span /><span /></div>
        <div className="scene-origin-title cs-scene-element"><div className="cs-label">05 / The origin</div><h2>West<br /><em>Java.</em></h2><p>Volcanic slopes. Cool nights. A canopy of banana and pine.</p></div>
        <Pouch className="scene-origin-pouch cs-scene-element" alt="Point of View coffee from West Java" />
        <div className="scene-origin-meta">
          {[["Altitude", "1,350—1,550 masl"], ["Varietal", "Ateng Super"], ["Harvest", "2024 / selective"], ["Process", "Washed / sun-dried"]].map(([label, value]) => <div className="scene-origin-meta-item cs-scene-element" key={label}><small>{label}</small><strong>{value}</strong></div>)}
        </div>
      </Scene>

      <Scene id="process" index={6} className="cs-scene-process">
        <div className="scene-process-copy cs-scene-element"><div className="cs-label">06 / The making</div><h2>From bean<br /><em>to cup.</em></h2><p>One visual stage. Five moments. The scroll is the timeline.</p></div>
        <div className="scene-process-orbit cs-scene-element"><div className="scene-process-bean bean-a" /><div className="scene-process-bean bean-b" /><div className="scene-process-bean bean-c" /><div className="scene-process-orbit-ring" /></div>
        <div className="scene-process-timeline cs-scene-element"><div className="scene-process-track" /><div className="scene-process-active" /><div className="scene-process-dot" />{processSteps.map(([name], i) => <div className="scene-process-step" style={{ left: `${i * 25}%` }} key={name}><span>0{i + 1}</span><strong>{name}</strong></div>)}</div>
        <div className="scene-process-caption cs-scene-element"><strong>BEAN</strong><span>{processSteps[0][1]}</span></div>
      </Scene>

      <Scene id="packaging" index={7} className="cs-scene-packaging">
        <div className="scene-package-type cs-scene-element"><span>PACKAGING</span><strong>MADE<br />TO BE<br /><em>HELD.</em></strong></div>
        <div className="scene-package-beans cs-scene-element"><i /><i /><i /><i /><i /><i /></div>
        <Pouch className="scene-package-pouch cs-scene-element" alt="Large cinematic view of the Point of View pouch" />
        <div className="scene-package-note cs-scene-element">A physical object for a physical ritual.<br />Take your time with it.</div>
      </Scene>

      <Scene id="statement" index={8} className="cs-scene-statement">
        <div className="scene-statement-copy">
          <div className="cs-label cs-scene-element">08 / A thought</div>
          <h2><span className="scene-statement-line cs-scene-element">GOOD COFFEE</span><span className="scene-statement-line cs-scene-element">SHOULDN&apos;T JUST</span><span className="scene-statement-line scene-statement-accent cs-scene-element">WAKE YOU UP.</span></h2>
          <p className="scene-statement-note cs-scene-element">It should make the ordinary feel worth looking at again.</p>
        </div>
      </Scene>

      <Scene id="final" index={9} className="cs-scene-final">
        <div className="scene-final-copy cs-scene-element"><div className="cs-label">09 / The next cup</div><h2>Ready for<br /><em>your next cup?</em></h2><p>One pouch. Plenty to discover.</p><button className="cs-shop-btn scene-final-cta cs-scene-element" onClick={shop}>DISCOVER THE COFFEE&nbsp; ↗</button></div>
        <Pouch className="scene-final-pouch cs-scene-element" alt="Point of View coffee pouch ready for your next cup" />
      </Scene>

      <section className="cs-faq cs-scene-element" aria-label="Frequently asked questions"><div className="cs-label">The small print</div><h2>Questions,<br /><em>answered.</em></h2>{faqs.map((item, i) => <div className="cs-faq-item" key={item[0]}><button className="cs-faq-button" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{item[0]}</span><span>{faq === i ? "−" : "+"}</span></button><div className={`cs-faq-answer ${faq === i ? "open" : ""}`}><div>{item[1]}</div></div></div>)}</section>
      <div className={`cs-toast ${toast ? "show" : ""}`} role="status">The shop is opening soon — we saved your spot.</div>
      <footer className="cs-footer"><span>© POINT OF VIEW / 2024</span><span>ROASTED WITH CURIOSITY</span><span>WEST JAVA → EVERYWHERE</span></footer>
    </main>
  );
}