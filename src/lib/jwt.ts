// src/lib/jwt.ts
import jwt, { SignOptions, Secret } from "jsonwebtoken";

// Validamos que la variable de entorno exista
const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // Ej: "1h", "30m"

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

/**
 * Genera un token JWT a partir de un payload.
 * @param payload Objeto con los datos a codificar en el token
 * @returns Token JWT como string
 */
export function generateToken(payload: object): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as `${number}h` | `${number}m` | `${number}s` | `${number}d`, 
    // Tipado seguro para TypeScript
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verifica un token JWT y retorna el payload decodificado.
 * @param token Token JWT a verificar
 * @returns Payload decodificado del token
 * @throws Error si el token es inválido o expiró
 */
export function verifyToken(token: string): object {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (err) {
    throw new Error("Token inválido o expirado");
  }
}