import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usuarios } from "../db/schema";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
} from "../schemas/auth.schema";
import type { RegisterBody, LoginBody, ForgotPasswordBody } from "../schemas/auth.schema";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET ?? "secret";
const SALT_ROUNDS = 10;

router.post(
  "/register",
  validate(registerSchema),
  async (req: Request, res: Response) => {
    const { nome, email, senha, tipo } = req.body as RegisterBody;

    const [existente] = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    if (existente) {
      res.status(409).json({ message: "E-mail já cadastrado." });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS);

    const [usuario] = await db
      .insert(usuarios)
      .values({ nome, email, senhaHash, tipo })
      .returning({
        id: usuarios.id,
        nome: usuarios.nome,
        email: usuarios.email,
        tipo: usuarios.tipo,
      });

    const token = jwt.sign(
      { id: usuario!.id, email: usuario!.email, tipo: usuario!.tipo },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token, usuario });
  }
);

router.post(
  "/login",
  validate(loginSchema),
  async (req: Request, res: Response) => {
    const { email, senha } = req.body as LoginBody;

    const [usuario] = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    if (!usuario) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
    });
  }
);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  async (req: Request, res: Response) => {
    const { email } = req.body as ForgotPasswordBody;

    const [usuario] = await db
      .select()
      .from(usuarios)
      .where(eq(usuarios.email, email));

    // Sempre retornar 200 por seguranca
    if (!usuario) {
      res.json({ message: "Se o e-mail existir, você receberá as instruções." });
      return;
    }

    // TODO: talvez nao seja necessario implementar esse fluxo por completo, tem que ver com a lina

    res.json({ message: "Se o e-mail existir, você receberá as instruções." });
  }
);

export default router;
