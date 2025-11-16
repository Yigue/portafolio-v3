import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ message: "Datos incompletos" }, { status: 400 })
  }

  await new Promise((resolve) => setTimeout(resolve, 600))

  return NextResponse.json({ message: "Mensaje recibido" })
}
