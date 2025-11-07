import jwt, { SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET no está definido en las variables de entorno");
}

export function generateToken(payload: object): string {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as `${number}h` | `${number}m` | `${number}s` | `${number}d`,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): object {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (err) {
    throw new Error("Token inválido o expirado");
  }
}