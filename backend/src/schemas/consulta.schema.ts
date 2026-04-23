import { z } from "zod";

export const agendarConsultaSchema = z.object({
  medicoId: z.number().int().positive(),
  dataHora: z.string().datetime("Data/hora inválida."),
  tipo: z.enum(["presencial", "teleconsulta"]),
});

export type AgendarConsultaBody = z.infer<typeof agendarConsultaSchema>;
