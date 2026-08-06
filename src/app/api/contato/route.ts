import { NextRequest, NextResponse } from "next/server";
import { contatoSchema } from "@/lib/validations";
import { sendContatoEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const { allowed, retryAfterSeconds } = rateLimit(
    `contato:${getClientIp(request)}`,
    5,
    10 * 60 * 1000
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em alguns minutos." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();

    const parsed = contatoSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await sendContatoEmail(data);

    return NextResponse.json({
      success: true,
      message: "Mensagem recebida! Responderemos em até 1 dia útil.",
    });
  } catch (error) {
    console.error("[CONTATO] Erro:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
