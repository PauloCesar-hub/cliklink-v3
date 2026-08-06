import { Resend } from "resend";

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY não definida. Configure a variável de ambiente.");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const RECIPIENTS = ["contato@cliklink.com.br", "Guilherme.oliveira@cliklink.com.br"];
const FROM = "ClikLink <noreply@cliklink.com.br>";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
const BRAND_COLOR = "#F47B20";
const BRAND_DARK = "#0d0d0d";

function baseTemplate(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND_DARK};padding:28px 36px;border-bottom:3px solid ${BRAND_COLOR};">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Clik<span style="color:${BRAND_COLOR};">Link</span></span>
                    <span style="display:block;font-size:11px;color:#888888;margin-top:2px;font-weight:400;">Internet de Fibra Óptica · Araraquara, SP</span>
                  </td>
                  <td align="right">
                    <span style="background-color:rgba(244,123,32,0.15);color:${BRAND_COLOR};font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid rgba(244,123,32,0.3);">NOTIFICAÇÃO</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title bar -->
          <tr>
            <td style="background-color:#1a1a1a;padding:16px 36px;">
              <span style="font-size:16px;font-weight:700;color:#ffffff;">${title}</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 36px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9f9f9;border-top:1px solid #eeeeee;padding:20px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:11px;color:#999999;">Este e-mail foi gerado automaticamente pelo sistema ClikLink.</span><br />
                    <span style="font-size:11px;color:#999999;">ClikLink Internet · Araraquara, SP · <a href="https://cliklink.com.br" style="color:${BRAND_COLOR};text-decoration:none;">cliklink.com.br</a></span>
                  </td>
                  <td align="right">
                    <span style="font-size:10px;color:#bbbbbb;">${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function field(label: string, value: string, highlight = false): string {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
      <span style="font-size:11px;font-weight:600;color:#888888;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">${label}</span>
      <span style="font-size:14px;color:${highlight ? BRAND_COLOR : "#1a1a1a"};font-weight:${highlight ? "700" : "400"};">${value || "—"}</span>
    </td>
  </tr>`;
}

function sectionTitle(text: string): string {
  return `
  <tr>
    <td style="padding:20px 0 8px;">
      <span style="font-size:12px;font-weight:700;color:${BRAND_COLOR};text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid ${BRAND_COLOR};padding-bottom:4px;">${text}</span>
    </td>
  </tr>`;
}

// ── CONTATO ───────────────────────────────────────────────────────────────────

export interface ContatoEmailData {
  nome: string;
  email: string;
  telefone?: string;
  assunto: string;
  mensagem: string;
}

export async function sendContatoEmail(data: ContatoEmailData) {
  const nome = escapeHtml(data.nome);
  const email = escapeHtml(data.email);
  const telefone = escapeHtml(data.telefone ?? "Não informado");
  const assunto = escapeHtml(data.assunto);
  const mensagem = escapeHtml(data.mensagem);

  const body = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${sectionTitle("Dados do Contato")}
      ${field("Nome", nome)}
      ${field("E-mail", `<a href="mailto:${email}" style="color:${BRAND_COLOR};text-decoration:none;">${email}</a>`)}
      ${field("Telefone", telefone)}
      ${field("Assunto", assunto, true)}
      <tr><td style="height:16px;"></td></tr>
      ${sectionTitle("Mensagem")}
      <tr>
        <td style="padding:14px 0 0;">
          <div style="background-color:#f8f8f8;border-left:3px solid ${BRAND_COLOR};border-radius:4px;padding:16px 18px;font-size:14px;color:#333333;line-height:1.7;white-space:pre-wrap;">${mensagem}</div>
        </td>
      </tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="background-color:#fff8f3;border:1px solid rgba(244,123,32,0.2);border-radius:8px;padding:14px 18px;">
          <span style="font-size:12px;color:#888888;">Responda diretamente para <a href="mailto:${email}" style="color:${BRAND_COLOR};font-weight:600;text-decoration:none;">${email}</a></span>
        </td>
      </tr>
    </table>`;

  return getResend().emails.send({
    from: FROM,
    to: RECIPIENTS,
    replyTo: data.email,
    subject: `[Contato] ${data.assunto} — ${data.nome}`,
    html: baseTemplate(`Nova mensagem: ${assunto}`, body),
  });
}

// ── ASSINATURA ────────────────────────────────────────────────────────────────

export interface AssinaturaEmailData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeCondominio?: string;
  observacoes?: string;
  planoId: string;
  planoNome: string;
  planoPreco: number;
  protocolo: string;
}

export async function sendAssinaturaEmail(data: AssinaturaEmailData) {
  const preco = data.planoPreco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const nome = escapeHtml(data.nome);
  const email = escapeHtml(data.email);
  const cpf = escapeHtml(data.cpf);
  const telefone = escapeHtml(data.telefone);
  const planoNome = escapeHtml(data.planoNome);
  const protocolo = escapeHtml(data.protocolo);
  const endereco = escapeHtml(
    `${data.rua}, ${data.numero}${data.complemento ? ` — ${data.complemento}` : ""}, ${data.bairro}, ${data.cidade}/${data.uf} — CEP ${data.cep}`
  );

  const body = `
    <!-- Destaque do plano -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:linear-gradient(135deg,${BRAND_DARK} 0%,#1a1a1a 100%);border-radius:10px;padding:20px 24px;border:1px solid rgba(244,123,32,0.3);">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:11px;color:#888888;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Plano solicitado</span>
                <span style="display:block;font-size:22px;font-weight:900;color:#ffffff;margin-top:4px;">${planoNome}</span>
              </td>
              <td align="right">
                <span style="font-size:28px;font-weight:900;color:${BRAND_COLOR};">${preco}</span>
                <span style="display:block;font-size:11px;color:#888888;text-align:right;">/mês</span>
              </td>
            </tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">
            <tr>
              <td>
                <span style="font-size:11px;color:#888888;">Protocolo: <strong style="color:#ffffff;">${protocolo}</strong></span>
              </td>
              <td align="right">
                <span style="font-size:11px;color:#888888;">${new Date().toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${sectionTitle("Dados Pessoais")}
      ${field("Nome completo", nome)}
      ${field("CPF", cpf)}
      ${field("E-mail", `<a href="mailto:${email}" style="color:${BRAND_COLOR};text-decoration:none;">${email}</a>`)}
      ${field("Telefone", telefone)}
      ${data.dataNascimento ? field("Data de nascimento", escapeHtml(data.dataNascimento)) : ""}

      ${sectionTitle("Endereço de Instalação")}
      ${field("Endereço", endereco)}
      ${data.nomeCondominio ? field("Condomínio", escapeHtml(data.nomeCondominio), true) : ""}

      ${data.observacoes ? `${sectionTitle("Observações")}<tr><td style="padding:10px 0;"><div style="background-color:#f8f8f8;border-left:3px solid ${BRAND_COLOR};border-radius:4px;padding:14px 16px;font-size:14px;color:#333333;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.observacoes)}</div></td></tr>` : ""}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr>
        <td style="background-color:#fff8f3;border:1px solid rgba(244,123,32,0.2);border-radius:8px;padding:14px 18px;">
          <span style="font-size:12px;color:#888888;">Entre em contato com o cliente em <a href="mailto:${email}" style="color:${BRAND_COLOR};font-weight:600;text-decoration:none;">${email}</a> ou <a href="tel:${data.telefone.replace(/\D/g, "")}" style="color:${BRAND_COLOR};font-weight:600;text-decoration:none;">${telefone}</a></span>
        </td>
      </tr>
    </table>`;

  return getResend().emails.send({
    from: FROM,
    to: RECIPIENTS,
    replyTo: data.email,
    subject: `[Nova Assinatura] ${data.planoNome} — ${data.nome} · ${data.protocolo}`,
    html: baseTemplate(`Nova solicitação de assinatura`, body),
  });
}
