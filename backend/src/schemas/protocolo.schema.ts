import { z } from "zod";

export const criarProtocoloSchema = z.object({
  pacienteId: z.number().int().positive(),
  titulo: z.string().min(2, "Título deve ter ao menos 2 caracteres."),
  tipo: z.string().min(2, "Tipo deve ter ao menos 2 caracteres.").optional(),
  conteudoExercicios: z.unknown().optional(),
  conteudoDieta: z.unknown().optional(),
  caloriasTotal: z.number().int().positive().optional(),
});

export type CriarProtocoloBody = z.infer<typeof criarProtocoloSchema>;
