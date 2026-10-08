import React, { useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { ArrowUpRight, Menu, X, Play, MoveUpRight } from "lucide-react";
import gsap from "gsap";
import "./styles.css";

const projects = [
  { n: "01", title: "The Courtyard Residence", type: "Architectural Visualization", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85" },
  { n: "02", title: "Urban Heights", type: "Exterior CGI / Animation", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85" },
  { n: "03", title: "The Private Villa", type: "Interior / CGI", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85" }
];

function ArchitectureModel() {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.035;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.08;
    }
  });
  return (
    <group ref={group} rotation={[0, -0.55, 0]}>
      <RoundedBox args={[3.8, .45, 2.7]} radius={.08} smoothness={5} position={[0, 0, 0]}>
        <meshStandardMaterial color="#e7e0d4" roughness={.72} />
      </RoundedBox>
      <RoundedBox args={[3.1, 1.65, 2.25]} radius={.06} smoothness={4} position={[0, 1.02, 0]}>
        <meshStandardMaterial color="#eee9df" roughness={.64} />
      </RoundedBox>
      <mesh position={[0, 1.02, 1.14]}>
        <planeGeometry args={[2.35, 1.15]} />
        <meshStandardMaterial color="#161714" metalness={.4} roughness={.18} />
      </mesh>
      <mesh position={[0, 1.02, -1.14]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.35, 1.15]} />
        <meshStandardMaterial color="#161714" metalness={.4} roughness={.18} />
      </mesh>
      {[-1.35, 0, 1.35].map((x) => (
        <mesh key={x} position={[x, 1.02, 1.17]}>
          <boxGeometry args={[.055, 1.18, .08]} />
          <meshStandardMaterial color="#b7790a" metalness={.7} roughness={.25} />
        </mesh>
      ))}
      <RoundedBox args={[2.2, .12, 1.65]} radius={.02} position={[0, 1.88, 0]}>
        <meshStandardMaterial color="#111111" roughness={.42} />
      </RoundedBox>
      <mesh position={[0, 2.05, 0]}>
        <boxGeometry args={[1.35, .04, .85]} />
        <meshStandardMaterial color="#b7790a" metalness={.65} roughness={.25} />
      </mesh>
    </group>
  );
}

function Hero3D() {
  return (
    <div className="hero-canvas">
      <Canvas camera={{ position: [5, 3.2, 6.5], fov: 36 }} dpr={[1, 1.7]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 7, 4]} intensity={4} />
        <pointLight position={[-4, 2, -3]} intensity={3} color="#b7790a" />
        <Float speed={1.1} rotationIntensity={0.12} floatIntensity={.22}>
          <ArchitectureModel />
        </Float>
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}

function App() {
  const [open, setOpen] = React.useState(false);
  const root = useRef(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker", { y: 30, opacity: 0, duration: 1, delay: .2 });
      gsap.from(".hero-title span", { y: 90, opacity: 0, duration: 1.15, stagger: .12, ease: "power4.out", delay: .25 });
      gsap.from(".hero-copy", { y: 25, opacity: 0, duration: .9, delay: .8 });
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 55, opacity: 0, duration: 1,
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={root} className="site">
      <header className="nav">
        <button className="brand" onClick={() => go("home")}>ARCVRAX<span>®</span></button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {["work","services","studio","contact"].map((item) =>
            <button key={item} onClick={() => go(item)}>{item}</button>
          )}
        </nav>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid"></div>
          <div className="hero-left">
            <p className="eyebrow hero-kicker">ARCHITECTURAL VISUALIZATION / 3D / MOTION</p>
            <h1 className="hero-title">
              <span>WE VISUALIZE</span>
              <span>ARCHITECTURE</span>
              <span className="gold">BEFORE IT EXISTS.</span>
            </h1>
            <p className="hero-copy">ARCVRAX is a visual studio turning architectural ideas into cinematic, high-impact experiences for developers, architects and brands.</p>
            <button className="line-button" onClick={() => go("work")}>EXPLORE WORK <ArrowUpRight size={17}/></button>
          </div>
          <Hero3D />
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span><span className="scroll-line"></span><span>01 / 06</span>
          </div>
        </section>

        <section id="work" className="section work">
          <div className="section-head reveal">
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Spaces imagined<br/><i>with precision.</i></h2>
          </div>
          <div className="project-list">
            {projects.map((p, i) => (
              <article className="project reveal" key={p.n}>
                <div className="project-image">
                  <img src={p.image} alt={p.title}/>
                  <div className="project-overlay"><span>VIEW PROJECT</span><ArrowUpRight size={21}/></div>
                </div>
                <div className="project-meta"><span>{p.n}</span><div><h3>{p.title}</h3><p>{p.type}</p></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="showreel">
          <div className="showreel-inner">
            <p className="eyebrow">ARCVRAX / SHOWREEL 2026</p>
            <h2>SEE<br/><span>THE UNBUILT.</span></h2>
            <button className="play"><Play size={18} fill="currentColor"/> PLAY REEL</button>
          </div>
        </section>

        <section id="services" className="section services">
          <div className="section-head reveal">
            <p className="eyebrow">WHAT WE DO</p>
            <h2>From drawing<br/><i>to experience.</i></h2>
          </div>
          <div className="service-list">
            {[
              ["01","Architectural Visualization","Photorealistic exterior and interior CGI."],
              ["02","3D Walkthroughs","Cinematic walkthroughs designed to sell spaces."],
              ["03","Architectural Animation","Camera movement, environment and storytelling."],
              ["04","Real Estate Films","High-end promotional films for developments."],
              ["05","Interactive 3D","Web-based architectural experiences."],
              ["06","AI Visual Production","AI-assisted imagery and cinematic content."]
            ].map(([n,t,d]) => (
              <div className="service reveal" key={n}>
                <span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><MoveUpRight size={22}/>
              </div>
            ))}
          </div>
        </section>

        <section className="difference">
          <div className="difference-copy reveal">
            <p className="eyebrow">THE ARCVRAX DIFFERENCE</p>
            <h2>WE DON'T<br/>JUST RENDER<br/><i>BUILDINGS.</i></h2>
            <p>We build the experience around them — combining architectural accuracy, atmosphere, motion and storytelling.</p>
          </div>
          <div className="difference-word">EXPERIENCE</div>
        </section>

        <section className="before-after">
          <div className="section-head reveal">
            <p className="eyebrow">THE TRANSFORMATION</p>
            <h2>Imagination <i>→</i> reality.</h2>
          </div>
          <div className="ba-card reveal">
            <div className="ba-left"><span>ARCHITECT'S VISION</span><div className="wire"><div></div><div></div><div></div></div></div>
            <div className="ba-right"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85" alt="Architectural visualization"/></div>
            <div className="ba-divider"><span>ARCVRAX</span></div>
          </div>
        </section>

        <section className="walkthrough">
          <div className="walk-bg"></div>
          <div className="walk-copy reveal">
            <p className="eyebrow">3D WALKTHROUGHS</p>
            <h2>Walk through<br/><i>what doesn't exist yet.</i></h2>
            <button className="line-button light">EXPLORE WALKTHROUGHS <ArrowUpRight size={17}/></button>
          </div>
        </section>

        <section id="studio" className="section studio">
          <div className="studio-grid">
            <div className="reveal"><p className="eyebrow">ARCVRAX STUDIO</p><h2>Architecture.<br/>Visualization.<br/><i>Emotion.</i></h2></div>
            <div className="studio-copy reveal">
              <p>We are a visualization studio focused on transforming architectural ideas into cinematic experiences.</p>
              <div className="studio-stats"><div><b>01</b><span>VISION</span></div><div><b>02</b><span>PRECISION</span></div><div><b>03</b><span>EXPERIENCE</span></div></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <p className="eyebrow">START A PROJECT</p>
          <h2>Have a space<br/><i>worth visualizing?</i></h2>
          <a href="mailto:hello@arcvrax.com" className="contact-button">HELLO@ARCVRAX.COM <ArrowUpRight size={19}/></a>
        </section>
      </main>

      <footer>
        <div><strong>ARCVRAX<span>®</span></strong><p>ARCHITECTURAL VISUALIZATION STUDIO</p></div>
        <div className="footer-links"><a href="#work">WORK</a><a href="#services">SERVICES</a><a href="#studio">STUDIO</a><a href="#contact">CONTACT</a></div>
        <div className="footer-bottom"><span>© 2026 ARCVRAX STUDIO</span><span>HYDERABAD / INDIA</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
