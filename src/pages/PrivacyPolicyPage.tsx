import "../styles/privacy-policy.css";
import InternalPageHero from "../components/layout/InternalPageHero";
import Reveal from "../components/ui/Reveal";
import { PAGE_META, SITE_CNPJ } from "../config/site";
import { usePageMeta } from "../hooks/usePageMeta";
import { PHONE_DISPLAY } from "../lib/constants";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "../lib/whatsapp";

export default function PrivacyPolicyPage() {
  usePageMeta(PAGE_META.privacidade);

  return (
    <>
      <InternalPageHero
        eyebrow="Privacidade"
        title="Política de Privacidade"
        breadcrumbs={[{ label: "Início", path: "/" }, { label: "Política de Privacidade" }]}
      />

      <section className="section">
        <div className="container container--narrow privacy-policy">
          <Reveal>
            <p className="privacy-policy__updated">Última atualização: setembro de 2026.</p>

            <p>
              Esta política explica como a RedeSub Internet de Fibra (CNPJ{" "}
              {SITE_CNPJ}) coleta, usa e protege os dados pessoais de quem
              utiliza este site, em conformidade com a Lei Geral de Proteção
              de Dados (Lei nº 13.709/2018 — LGPD).
            </p>

            <h2>Quais dados coletamos</h2>
            <p>
              Ao preencher formulários deste site — como a consulta de
              disponibilidade em "Atendimento" ou o envio de currículo em
              "Trabalhe conosco" — podemos coletar: nome, e-mail, telefone/
              WhatsApp, endereço ou cidade/estado, área de interesse,
              LinkedIn, mensagem enviada e, no caso de candidaturas, o
              arquivo do currículo (PDF, DOC ou DOCX).
            </p>
            <p>
              Formulários que abrem uma conversa no WhatsApp (como a consulta
              de planos e disponibilidade) apenas montam uma mensagem com os
              dados que você digitou e abrem o aplicativo do WhatsApp — esses
              dados são enviados diretamente para o WhatsApp da RedeSub e não
              ficam armazenados neste site.
            </p>

            <h2>Como usamos seus dados</h2>
            <p>
              Os dados enviados pelo formulário de "Trabalhe conosco" são
              usados exclusivamente para fins de recrutamento e seleção: sua
              candidatura fica disponível para nossa equipe avaliar
              oportunidades compatíveis com o seu perfil, agora ou no futuro.
              Não utilizamos esses dados para fins comerciais ou de
              marketing.
            </p>

            <h2>Onde seus dados ficam armazenados</h2>
            <p>
              Currículos e os dados da candidatura são armazenados em um
              ambiente de nuvem privado, sem URL pública de acesso. Apenas
              pessoas autorizadas da equipe RedeSub têm acesso a essas
              informações.
            </p>

            <h2>Por quanto tempo guardamos seus dados</h2>
            <p>
              Currículos ficam no nosso banco de talentos pelo tempo
              necessário para avaliação de oportunidades compatíveis. Você
              pode solicitar a exclusão dos seus dados a qualquer momento,
              conforme descrito abaixo.
            </p>

            <h2>Seus direitos</h2>
            <p>
              Conforme a LGPD, você pode solicitar, a qualquer momento:
              confirmação de que tratamos seus dados, acesso aos dados
              coletados, correção de dados incompletos ou desatualizados,
              exclusão dos seus dados e revogação do seu consentimento.
            </p>

            <h2>Como falar com a gente sobre seus dados</h2>
            <p>
              Para exercer qualquer um desses direitos, entre em contato pelo
              WhatsApp oficial da RedeSub:{" "}
              <a
                href={buildWhatsAppLink(WHATSAPP_MESSAGES.support)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {PHONE_DISPLAY}
              </a>
              .
            </p>

            <h2>Não coletamos</h2>
            <p>
              Não solicitamos CPF, RG, data de nascimento, sexo ou estado
              civil em nenhum formulário deste site.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
