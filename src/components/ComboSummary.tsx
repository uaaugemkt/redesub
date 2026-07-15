import { Link } from "react-router-dom";
import { getAppDisplayName } from "../config/apps";
import { useSelection } from "../context/SelectionContext";
import { getRegionById } from "../lib/plans";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";
export default function ComboSummary() {
  const { regionId, regionName, selectedPlanId, selectedAddonIds } = useSelection();
  const region = regionId ? getRegionById(regionId) : null;
  const plan = region?.plans.find((p) => p.id === selectedPlanId);
  const addonNames = selectedAddonIds.map((id) => getAppDisplayName(id));

  const message = WHATSAPP_MESSAGES.contractInquiry({
    region: regionName,
    planName: plan?.name ?? "a definir",
    speed: plan?.speed ?? "a definir",
    additionalApps: selectedAddonIds,
    coverageInterest: true,
  });

  return (
    <aside className="combo-summary" aria-labelledby="combo-summary-title">
      <h2 id="combo-summary-title" className="combo-summary__title">
        Resumo da sua escolha
      </h2>
      <dl className="combo-summary__list">
        <div>
          <dt>Região</dt>
          <dd>{regionName ?? "Não selecionada"}</dd>
        </div>
        <div>
          <dt>Plano</dt>
          <dd>{plan ? `${plan.name} | ${plan.speed}` : "Selecione um plano acima"}</dd>
        </div>
        <div>
          <dt>Adicionais</dt>
          <dd>
            {addonNames.length > 0 ? addonNames.join(", ") : "Nenhum selecionado"}
          </dd>
        </div>
      </dl>
      <p className="combo-summary__note">
        Valores finais e disponibilidade são confirmados pelo atendimento.
      </p>
      <div className="combo-summary__actions">
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary btn--md"
        >
          Enviar resumo pelo WhatsApp
        </a>
        {!regionId && (
          <p className="combo-summary__hint">Selecione sua região para personalizar a mensagem.</p>
        )}
      </div>
      <p className="combo-summary__addons-link">
        <Link to="/planos#adicionais">Escolher adicionais opcionais</Link>
      </p>
    </aside>
  );
}
