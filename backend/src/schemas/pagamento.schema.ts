import { z } from "zod";

export const pagamentoIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type PagamentoIdParams = z.infer<typeof pagamentoIdSchema>;
