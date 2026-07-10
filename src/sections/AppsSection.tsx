import { useMemo } from "react";
import {
  APP_CATALOG,
  getAppsByCategory,
  getAppDisplayName,
  NONE_APP_ID,
  VITRINE_CATEGORIES,
} from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
import AppIcon from "../components/AppIcon";

/** Apps que podem ser contratados como adicional (sem preço exibido) */
const ADDON_APP_IDS = APP_CATALOG.filter(
  (app) => app.id !== NONE_APP_ID && app.category === "entretenimento"
).map((app) => app.id);

export default function AppsSection() {
  const { regionName, selectedAddonIds, toggleAddon } = useSelection();

  const selectedNames = useMemo(
    () => selectedAddonIds.map((id) => getAppDisplayName(id)),
    [selectedAddonIds]
  );

  const whatsappHref = buildWhatsAppLink(
    WHATSAPP_MESSAGES.addonConsult(selectedNames, regionName)
  );

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

        <div className="apps-addons" aria-labelledby="apps-addons-title">
          <div className="apps-addons__header">
            <h3 id="apps-addons-title" className="apps-addons__title">
              Adicionais opcionais
            </h3>
            <p className="apps-addons__subtitle">
              Selecione os serviços de interesse. Valores e disponibilidade são
              confirmados pelo atendimento — sem preços estimados no site.
            </p>
          </div>

          <div className="apps-addons__legend">
            <span className="apps-addons__legend-item apps-addons__legend-item--included">
              Incluso no plano
            </span>
            <span className="apps-addons__legend-item apps-addons__legend-item--addon">
              Disponível como adicional
            </span>
          </div>

          <ul className="apps-addons__grid">
            {ADDON_APP_IDS.map((appId) => {
              const app = APP_CATALOG.find((a) => a.id === appId);
              if (!app) return null;
              const isSelected = selectedAddonIds.includes(appId);

              return (
                <li key={appId}>
                  <button
                    type="button"
                    className={`apps-addons__card ${isSelected ? "apps-addons__card--selected" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => toggleAddon(appId)}
                  >
                    <AppIcon app={app} size="md" />
                    <span className="apps-addons__card-name">{app.name}</span>
                    <span className="apps-addons__card-cta">
                      {isSelected ? "Selecionado" : "Adicionar ao meu plano"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selectedAddonIds.length > 0 && (
            <p className="apps-addons__selected" role="status">
              Selecionados:{" "}
              <strong>{selectedNames.join(", ")}</strong>
            </p>
          )}

          <div className="apps-addons__footer">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--md"
            >
              Consultar valor pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
