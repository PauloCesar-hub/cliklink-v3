import { NextRequest, NextResponse } from "next/server";
import { assinaturaSchema } from "@/lib/validations";
import { sendAssinaturaEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const { allowed, retryAfterSeconds } = rateLimit(
    `assinatura:${getClientIp(request)}`,
    3,
    60 * 60 * 1000
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente mais tarde." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();

    const parsed = assinaturaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const protocolo = `CLK-${Date.now()}`;

    await sendAssinaturaEmail({ ...data, protocolo });

    return NextResponse.json({
      success: true,
      message: "Solicitação recebida com sucesso! Nossa equipe entrará em contato em até 1 dia útil.",
      protocolo,
    });
  } catch (error) {
    console.error("[ASSINATURA] Erro:", error);
    return NextResponse.json(
      { error: "Erro interno. Por favor, tente novamente." },
      { status: 500 }
    );
  }
}
