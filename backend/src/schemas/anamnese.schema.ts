import { z } from "zod";

export const anamneseSchema = z.object({
  idade: z.number().int().min(0).max(120).nullish(),
  peso: z.number().positive().nullish(),
  altura: z.number().positive().nullish(),
  condicoesSaude: z.array(z.string()).nullish(),
  alergias: z.string().nullish(),
  horasSono: z.number().min(0).max(24).nullish(),
  nivelAtividade: z
    .enum(["sedentario", "leve", "moderado", "intenso"])
    .nullish(),
  tipoAlimentacao: z.array(z.string()).nullish(),
  habitos: z.array(z.string()).nullish(),
  objetivo: z.string().nullish(),
});

export type AnamneseInput = z.infer<typeof anamneseSchema>;
