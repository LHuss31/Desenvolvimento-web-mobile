#!/bin/bash
# Curls de teste da API VitalGoal
# Base URL: http://localhost:3000

# ─────────────────────────────────────────
# AUTH
# ─────────────────────────────────────────

# Registrar paciente
curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Silva","email":"teste@vitalgoal.com","senha":"123456","tipo":"paciente"}'

# Registrar médico
curl -s -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Dr. Carlos Mendes","email":"carlos@vitalgoal.com","senha":"123456","tipo":"medico"}'

# Login (salva token na variável)
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carlos@vitalgoal.com","senha":"123456"}' | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# ─────────────────────────────────────────
# PROTOCOLOS (requer token de médico)
# ─────────────────────────────────────────

# Criar protocolo de emagrecimento
curl -s -X POST http://localhost:3000/api/protocolos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "pacienteId": 1,
    "titulo": "Protocolo de Emagrecimento",
    "tipo": "dieta",
    "conteudoExercicios": [{"nome":"Caminhada","duracao":"30min","frequencia":"5x/semana"}],
    "conteudoDieta": [{"refeicao":"Almoco","descricao":"Frango grelhado com salada"}],
    "caloriasTotal": 1800
  }'

# Criar protocolo de hipertrofia
curl -s -X POST http://localhost:3000/api/protocolos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "pacienteId": 1,
    "titulo": "Protocolo de Hipertrofia",
    "tipo": "exercicio",
    "conteudoExercicios": [{"nome":"Supino","series":"4x12","carga":"60kg"},{"nome":"Agachamento","series":"4x10","carga":"80kg"}],
    "conteudoDieta": [{"refeicao":"Pre-treino","descricao":"Banana com aveia"},{"refeicao":"Pos-treino","descricao":"Whey protein com leite"}],
    "caloriasTotal": 2800
  }'
