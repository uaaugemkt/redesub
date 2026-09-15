import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import {
  MapPinIcon,
  MessageCircleIcon,
  WifiIcon,
} from "../../components/icons/BenefitIcons";
import Reveal from "../../components/ui/Reveal";

const PRINCIPLES: ReadonlyArray<{
  id: string;
  label: string;
  icon: ReactNode;
}> = [
  {
    id: "routine",
    label: "Conexão para a rotina.",
    icon: <WifiIcon />,
  },
  {
    id: "support",
    label: "Atendimento que orienta.",
    icon: <MessageCircleIcon />,
  },
  {
    id: "solutions",
    label: "Soluções para casas e negócios.",
    icon: <MapPinIcon />,
  },
];

const INTRO_SLIDES: ReadonlyArray<{
  id: string;
  src: string;
  alt: string;
}> = [
  {
    id: "equipe",
    src: "/media/quem-somos/redesub-quem-somos-1.webp",
    alt: "Técnicos da RedeSub em uma rua residencial instalando fibra óptica no poste, com o carro da empresa ao fundo",
  },
  {
    id: "sede",
    src: "/media/quem-somos/redesub-quem-somos-2.webp",
    alt: "Fachada da sede da RedeSub com a frota de carros adesivados estacionada em frente",
  },
];

// Ambas as imagens são 800x450 (16:9). Manter a proporção fixa evita
// layout shift e garante que nenhuma delas seja cortada.
const INTRO_SLIDE_WIDTH = 800;
const INTRO_SLIDE_HEIGHT = 450;
const INTRO_AUTOPLAY_MS = 4500;

/**
 * Crossfade automático entre as fotos institucionais. Pausa apenas com
 * mouse (hover no desktop) ou foco nos indicadores; no touch segue
 * automático. Com prefers-reduced-motion, fica parado no primeiro slide
 * e os indicadores continuam navegáveis.
 */
function AboutIntroSlider() {
  const slideCount = INTRO_SLIDES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slideCount < 2) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, INTRO_AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, reducedMotion, slideCount]);

  // Só o mouse pausa: no touch o pointerenter dispara no toque e não
  // teria um pointerleave correspondente, travando o autoplay.
  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setPaused(true);
  };
  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setPaused(false);
  };

  const activeSlide = INTRO_SLIDES[activeIndex];

  return (
    <div
      className="about-intro__image-wrap about-intro__slider"
      aria-roledescription="carrossel"
      aria-label="Fotos da RedeSub"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {INTRO_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={slide.id}
            id={`about-intro-slide-${slide.id}`}
            className={`about-intro__slide${isActive ? " is-active" : ""}`}
            aria-hidden={!isActive}
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${slideCount}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              width={INTRO_SLIDE_WIDTH}
              height={INTRO_SLIDE_HEIGHT}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="about-intro__image"
            />
          </div>
        );
      })}

      <div className="about-intro__image-glow" aria-hidden="true" />

      {slideCount > 1 && (
        <div
          className="about-intro__dots"
          role="tablist"
          aria-label="Selecionar foto"
        >
          {INTRO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`about-intro-slide-${slide.id}`}
              aria-label={`Foto ${index + 1} de ${slideCount}`}
              className={`about-intro__dot${index === activeIndex ? " is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {activeSlide.alt}
      </p>
    </div>
  );
}

export default function AboutIntroSection() {
  return (
    <section className="section about-intro" aria-labelledby="about-intro-title">
      <div className="container about-intro__grid">
        <Reveal className="about-intro__copy">
          <span className="eyebrow">A RedeSub</span>
          <h2 className="section__title" id="about-intro-title">
            Internet feita para a vida real.
          </h2>
          <p className="section__desc">
            A RedeSub conecta pessoas, famílias e negócios com internet de fibra e
            atendimento regional. Mais do que entregar velocidade, buscamos entender cada
            rotina e orientar cada cliente com clareza, proximidade e responsabilidade.
          </p>
          <p className="about-intro__secondary">
            Porque uma boa conexão precisa funcionar nos momentos que realmente importam:
            no trabalho, nos estudos, no atendimento aos clientes e no tempo compartilhado
            em família.
          </p>
          <ul className="about-intro__principles">
            {PRINCIPLES.map((item) => (
              <li key={item.id}>
                <span className="about-intro__principle-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="about-intro__visual">
          <AboutIntroSlider />
        </Reveal>
      </div>
    </section>
  );
}
