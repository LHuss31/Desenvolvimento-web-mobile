import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres."),
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(6, "Senha deve ter ao menos 6 caracteres."),
  tipo: z.enum(["paciente", "medico"]),
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  senha: z.string().min(1, "Senha é obrigatória."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("E-mail inválido."),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
