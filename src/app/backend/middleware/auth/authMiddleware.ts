import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt';

export async function authMiddleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

  const token = authHeader.split(' ')[1];
  if (!token) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

  try {
    const user = verifyToken(token);
    // puedes pasar user en headers o en request si usas Express
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: 'Token inválido o expirado' }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/inventory/protected/:path*",
}