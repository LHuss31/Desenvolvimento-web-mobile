import { eq, inArray } from "drizzle-orm";
import type { Response } from "express";
import { Router } from "express";
import { db } from "../db";
import { anamneses, consultas, usuarios } from "../db/schema";
import type { AuthRequest } from "../middlewares/auth";
import { authenticate } from "../middlewares/auth";
import { anamneseSchema } from "../schemas/anamnese.schema";

const router = Router();

router.use(authenticate);

// ─── GET / ────────────────────────────────────────────────────────────────────
// Paciente: retorna sua própria anamnese (ou null)
// Médico:   retorna lista de anamneses de todos os seus pacientes

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { id, tipo } = req.user!;

    if (tipo === "paciente") {
      const [anamnese] = await db
        .select()
        .from(anamneses)
        .where(eq(anamneses.pacienteId, id));

      res.json(anamnese ?? null);
      return;
    }

    // Médico: busca IDs distintos de pacientes que já tiveram consulta com ele
    const pacientesRows = await db
      .selectDistinct({ pacienteId: consultas.pacienteId })
      .from(consultas)
      .where(eq(consultas.medicoId, id));

    if (pacientesRows.length === 0) {
      res.json([]);
      return;
    }

    const pacienteIds = pacientesRows
      .map((r) => r.pacienteId)
      .filter(Boolean) as number[];

    const lista = await db
      .select({
        id: anamneses.id,
        pacienteId: anamneses.pacienteId,
        pacienteNome: usuarios.nome,
        idade: anamneses.idade,
        peso: anamneses.peso,
        altura: anamneses.altura,
        bmi: anamneses.bmi,
        condicoesSaude: anamneses.condicoesSaude,
        alergias: anamneses.alergias,
        horasSono: anamneses.horasSono,
        nivelAtividade: anamneses.nivelAtividade,
        tipoAlimentacao: anamneses.tipoAlimentacao,
        habitos: anamneses.habitos,
        objetivo: anamneses.objetivo,
        criadoEm: anamneses.criadoEm,
        atualizadoEm: anamneses.atualizadoEm,
      })
      .from(anamneses)
      .leftJoin(usuarios, eq(usuarios.id, anamneses.pacienteId))
      .where(inArray(anamneses.pacienteId, pacienteIds));

    res.json(lista);
  } catch (err) {
    console.error("[GET /anamneses]", err);
    res.status(500).json({ error: "Erro interno" });
  }
});

// ─── POST / ───────────────────────────────────────────────────────────────────
// Cria ou atualiza a anamnese do paciente autenticado (upsert)

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { id, tipo } = req.user!;

    if (tipo !== "paciente") {
      res.status(403).json({ error: "Apenas pacientes podem enviar anamnese" });
      return;
    }

    const parsed = anamneseSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const {
      idade,
      peso,
      altura,
      condicoesSaude,
      alergias,
      horasSono,
      nivelAtividade,
      tipoAlimentacao,
      habitos,
      objetivo,
    } = parsed.data;

    // Calcula BMI no back para garantir consistência
    const bmi =
      peso && altura
        ? parseFloat(
            (
              parseFloat(String(peso)) /
              Math.pow(parseFloat(String(altura)) / 100, 2)
            ).toFixed(1),
          )
        : null;

    const [existing] = await db
      .select({ id: anamneses.id })
      .from(anamneses)
      .where(eq(anamneses.pacienteId, id));

    if (existing) {
      await db
        .update(anamneses)
        .set({
          idade,
          peso: peso ? String(peso) : null,
          altura: altura ? String(altura) : null,
          bmi: bmi ? String(bmi) : null,
          condicoesSaude,
          alergias,
          horasSono: horasSono ? String(horasSono) : null,
          nivelAtividade,
          tipoAlimentacao,
          habitos,
          objetivo,
          atualizadoEm: new Date(),
        })
        .where(eq(anamneses.pacienteId, id));
    } else {
      await db.insert(anamneses).values({
        pacienteId: id,
        idade,
        peso: peso ? String(peso) : null,
        altura: altura ? String(altura) : null,
        bmi: bmi ? String(bmi) : null,
        condicoesSaude,
        alergias,
        horasSono: horasSono ? String(horasSono) : null,
        nivelAtividade,
        tipoAlimentacao,
        habitos,
        objetivo,
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[POST /anamneses]", err);
    res.status(500).json({ error: "Erro interno" });
  }
});

export default router;
