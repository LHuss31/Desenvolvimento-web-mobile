import { Router } from "express";
import type { Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { consultas, documentosConsulta, usuarios } from "../db/schema";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import type { AuthRequest } from "../middlewares/auth";
import { agendarConsultaSchema } from "../schemas/consulta.schema";
import type { AgendarConsultaBody } from "../schemas/consulta.schema";

const router = Router();

router.use(authenticate);

router.get("/", async (req: AuthRequest, res: Response) => {
  const { id, tipo } = req.user!;

  const filtro =
    tipo === "paciente"
      ? eq(consultas.pacienteId, id)
      : eq(consultas.medicoId, id);

  const lista = await db
    .select({
      id: consultas.id,
      dataHora: consultas.dataHora,
      tipo: consultas.tipo,
      status: consultas.status,
      statusPagamento: consultas.statusPagamento,
      linkMeet: consultas.linkMeet,
      paciente: {
        id: usuarios.id,
        nome: usuarios.nome,
      },
    })
    .from(consultas)
    .leftJoin(usuarios, eq(usuarios.id, consultas.pacienteId))
    .where(filtro);

  res.json(lista);
});

router.post(
  "/",
  validate(agendarConsultaSchema),
  async (req: AuthRequest, res: Response) => {
    const { medicoId, dataHora, tipo } = req.body as AgendarConsultaBody;

    if (req.user!.tipo !== "paciente") {
      res.status(403).json({ message: "Apenas pacientes podem agendar consultas." });
      return;
    }

    const [medico] = await db
      .select({ id: usuarios.id })
      .from(usuarios)
      .where(eq(usuarios.id, medicoId));

    if (!medico) {
      res.status(404).json({ message: "Médico não encontrado." });
      return;
    }

    const [consulta] = await db
      .insert(consultas)
      .values({
        pacienteId: req.user!.id,
        medicoId,
        dataHora: new Date(dataHora),
        tipo,
      })
      .returning();

    res.status(201).json(consulta);
  }
);

router.get("/:id", async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const [consulta] = await db
    .select()
    .from(consultas)
    .where(eq(consultas.id, id));

  if (!consulta) {
    res.status(404).json({ message: "Consulta não encontrada." });
    return;
  }

  const pertenceAoUsuario =
    consulta.pacienteId === req.user!.id || consulta.medicoId === req.user!.id;

  if (!pertenceAoUsuario) {
    res.status(403).json({ message: "Acesso negado." });
    return;
  }

  res.json(consulta);
});

router.get("/:id/documentos", async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const [consulta] = await db
    .select({ pacienteId: consultas.pacienteId, medicoId: consultas.medicoId })
    .from(consultas)
    .where(eq(consultas.id, id));

  if (!consulta) {
    res.status(404).json({ message: "Consulta não encontrada." });
    return;
  }

  const pertenceAoUsuario =
    consulta.pacienteId === req.user!.id || consulta.medicoId === req.user!.id;

  if (!pertenceAoUsuario) {
    res.status(403).json({ message: "Acesso negado." });
    return;
  }

  const documentos = await db
    .select()
    .from(documentosConsulta)
    .where(eq(documentosConsulta.consultaId, id));

  res.json(documentos);
});

router.get("/:id/link", async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);

  const [consulta] = await db
    .select({
      pacienteId: consultas.pacienteId,
      medicoId: consultas.medicoId,
      linkMeet: consultas.linkMeet,
      status: consultas.status,
    })
    .from(consultas)
    .where(eq(consultas.id, id));

  if (!consulta) {
    res.status(404).json({ message: "Consulta não encontrada." });
    return;
  }

  const pertenceAoUsuario =
    consulta.pacienteId === req.user!.id || consulta.medicoId === req.user!.id;

  if (!pertenceAoUsuario) {
    res.status(403).json({ message: "Acesso negado." });
    return;
  }

  if (!consulta.linkMeet) {
    res.status(404).json({ message: "Link da reunião ainda não disponível." });
    return;
  }

  res.json({ linkMeet: consulta.linkMeet });
});

export default router;
