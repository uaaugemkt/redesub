import WhatsAppButton from "../components/WhatsAppButton";
import ContactForm from "../components/ContactForm";
import Logo from "../components/Logo";
import { ADDRESS, PHONE_DISPLAY } from "../lib/constants";
import { WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function FinalCTASection() {
  return (
    <section className="final-cta section" id="contato">
      <div className="container">
        <div className="final-cta__card">
          <div className="final-cta__lead">
            <h2>Pronto para ter uma internet que acompanha sua casa?</h2>
            <p>
              Chame a RedeSub no WhatsApp, consulte disponibilidade e escolha o
              melhor plano para sua rotina.
            </p>
          </div>

          <ContactForm className="final-cta__form" />

          <div className="final-cta__actions">
            <WhatsAppButton size="lg" className="btn--hero" />
            <WhatsAppButton
              message={WHATSAPP_MESSAGES.availability}
              label="Consultar disponibilidade"
              variant="outline-light"
              size="lg"
            />
          </div>

          <div className="final-cta__info">
            <div>
              <strong>Telefone / WhatsApp</strong>
              <span>{PHONE_DISPLAY}</span>
            </div>
            <div className="final-cta__info--wide">
              <strong>Endereço</strong>
              <span>
                {ADDRESS.street}
                <br />
                {ADDRESS.neighborhood}, {ADDRESS.city}
              </span>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <Logo className="site-footer__logo" />
          <p>&copy; {new Date().getFullYear()} RedeSub Internet de Fibra. Todos os direitos reservados.</p>
          <p className="site-footer__tagline">
            Atendimento local para resolver de verdade.
          </p>
        </footer>
      </div>
    </section>
  );
}
