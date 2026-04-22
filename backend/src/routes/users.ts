import { Router } from "express";
import type { Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usuarios } from "../db/schema";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import type { AuthRequest } from "../middlewares/auth";
import { updateMeSchema } from "../schemas/user.schema";
import type { UpdateMeBody } from "../schemas/user.schema";

const router = Router();

router.get("/me", authenticate, async (req: AuthRequest, res: Response) => {
  const [usuario] = await db
    .select({
      id: usuarios.id,
      nome: usuarios.nome,
      email: usuarios.email,
      tipo: usuarios.tipo,
      telefone: usuarios.telefone,
      fotoUrl: usuarios.fotoUrl,
      criadoEm: usuarios.criadoEm,
    })
    .from(usuarios)
    .where(eq(usuarios.id, req.user!.id));

  if (!usuario) {
    res.status(404).json({ message: "Usuário não encontrado." });
    return;
  }

  res.json(usuario);
});

router.put(
  "/me",
  authenticate,
  validate(updateMeSchema),
  async (req: AuthRequest, res: Response) => {
    const { nome, telefone, fotoUrl } = req.body as UpdateMeBody;

    const [usuario] = await db
      .update(usuarios)
      .set({ nome, telefone, fotoUrl })
      .where(eq(usuarios.id, req.user!.id))
      .returning({
        id: usuarios.id,
        nome: usuarios.nome,
        email: usuarios.email,
        tipo: usuarios.tipo,
        telefone: usuarios.telefone,
        fotoUrl: usuarios.fotoUrl,
        criadoEm: usuarios.criadoEm,
      });

    res.json(usuario);
  }
);

export default router;
