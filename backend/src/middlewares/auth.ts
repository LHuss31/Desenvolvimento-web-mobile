import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export interface AuthPayload {
  id: number;
  email: string;
  tipo: "paciente" | "medico";
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido." });
    return;
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "secret") as AuthPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
}
