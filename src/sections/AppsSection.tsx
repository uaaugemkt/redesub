import { getAppsByCategory, VITRINE_CATEGORIES } from "../config/apps";
import AppIcon from "../components/AppIcon";

export default function AppsSection() {
  return (
    <section className="apps section" id="apps">
      <div className="container">
        <div className="section__header section__header--center">
          <span className="eyebrow">Muito além da conexão</span>
          <h2 className="section__title">Seu plano pode ir além da internet.</h2>
          <p className="section__desc">
            Além da fibra, você pode personalizar seu plano com serviços de
            entretenimento, segurança, educação, saúde e vantagens.
          </p>
        </div>

        <div className="apps-showcase">
          <p className="apps-showcase__lead">
            Seu plano não é só internet — traz entretenimento, segurança, estudo,
            saúde e benefícios extras para o dia a dia da sua família.
          </p>

          <div className="apps-showcase__body">
            {VITRINE_CATEGORIES.map((cat) => {
              const apps = getAppsByCategory(cat.key);
              if (apps.length === 0) return null;

              return (
                <div
                  key={cat.key}
                  className={`apps-showcase__row apps-showcase__row--${cat.key}`}
                >
                  <div className="apps-showcase__row-label">
                    <span className="apps-showcase__row-icon" aria-hidden="true">
                      {cat.icon}
                    </span>
                    <span>{cat.label}</span>
                  </div>
                  <div className="apps-showcase__row-apps">
                    {apps.map((app) => (
                      <div key={app.id} className="apps-showcase__chip" title={app.name}>
                        <AppIcon app={app} size="sm" />
                        <span>{app.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
