import FAQ from "../../components/ui/FAQ";
import Reveal from "../../components/ui/Reveal";
import { getPublishedFaqItems } from "../../lib/faq";

export default function BusinessFAQSection() {
  const items = getPublishedFaqItems("business");

  if (items.length === 0) return null;

  return (
    <section className="section section--soft business-faq" aria-labelledby="business-faq-title">
      <div className="container container--narrow">
        <Reveal>
          <header className="business-faq__header">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="section__title" id="business-faq-title">
              Perguntas frequentes
            </h2>
          </header>
          <FAQ items={items} title="" className="business-faq__accordion" />
        </Reveal>
      </div>
    </section>
  );
}
