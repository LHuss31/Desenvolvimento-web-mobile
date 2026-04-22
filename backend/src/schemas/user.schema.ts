import { z } from "zod";

export const updateMeSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres.").optional(),
  telefone: z.string().min(8, "Telefone inválido.").optional(),
  fotoUrl: z.string().url("URL da foto inválida.").optional(),
});

export type UpdateMeBody = z.infer<typeof updateMeSchema>;
