import { REFERRAL_URL } from "../lib/constants";
import { GiftIcon, UsersIcon } from "../components/icons/BenefitIcons";
import { TrendIcon } from "../components/icons/BusinessImpactIcons";

const BENEFITS = [
  {
    id: "invite",
    icon: UsersIcon,
    title: "Indique amigos",
    text: "É rápido e fácil",
  },
  {
    id: "earn",
    icon: GiftIcon,
    title: "Ganhe benefícios",
    text: "Descontos, bônus e muito mais",
  },
  {
    id: "grow",
    icon: TrendIcon,
    title: "Mais indicações",
    text: "Mais vantagens para você",
  },
] as const;

export default function ReferralSection() {
  return (
    <section className="section referral" aria-labelledby="referral-title">
      <div className="referral__decor" aria-hidden="true">
        <span className="referral__glow" />
        <svg className="referral__curve" viewBox="0 0 360 360" fill="none">
          <path
            d="M360 360C360 258 278 176 176 176"
            stroke="var(--brand-orange)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.18"
          />
          <circle cx="176" cy="176" r="5" fill="var(--brand-orange)" opacity="0.25" />
          <circle cx="300" cy="80" r="3" fill="var(--brand-orange)" opacity="0.3" />
          <circle cx="260" cy="230" r="3" fill="var(--brand-orange)" opacity="0.2" />
        </svg>
      </div>

      <div className="container referral__grid">
        <div className="referral__visual">
          <div className="referral__image-wrap">
            <img
              src="/media/indiqueeganhe.webp"
              alt="Amigos participando da campanha Indique e Ganhe da RedeSub"
              className="referral__image"
              width={1122}
              height={1402}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="referral__content">
          <h2 className="referral__title" id="referral-title">
            <span className="referral__title-line referral__title-line--first">
              Indique
              <img
                src="/media/icone-indique-e-ganhe.webp"
                alt=""
                aria-hidden="true"
                className="referral__icon-3d"
                width={1312}
                height={1199}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="referral__title-line referral__title-highlight">
              e Ganhe
            </span>
          </h2>
          <span className="referral__title-rule" aria-hidden="true" />
          <p className="referral__desc">
            Indique amigos para a RedeSub e participe da nossa campanha de
            indicação. Quanto mais indicações, mais chances de ganhar
            benefícios exclusivos.
          </p>

          <a
            href={REFERRAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary btn--lg referral__cta"
          >
            Participar agora
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <ul className="referral__benefits">
            {BENEFITS.map(({ id, icon: Icon, title, text }) => (
              <li key={id}>
                <span className="referral__benefit-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
