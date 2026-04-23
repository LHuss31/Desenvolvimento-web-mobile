# Curls de teste da API VitalGoal - Windows PowerShell
# Base URL: http://localhost:3000

# ─────────────────────────────────────────
# AUTH
# ─────────────────────────────────────────

Write-Host "=== REGISTRANDO PACIENTE ===" -ForegroundColor Green

$pacienteBody = @{
    nome = "Teste Silva"
    email = "teste@vitalgoal.com"
    senha = "123456"
    tipo = "paciente"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $pacienteBody

Write-Host "Paciente registrado!" -ForegroundColor Green
Write-Host ""

# ─────────────────────────────────────────

Write-Host "=== REGISTRANDO MÉDICO ===" -ForegroundColor Green

$medicoBody = @{
    nome = "Dr. Carlos Mendes"
    email = "carlos@vitalgoal.com"
    senha = "123456"
    tipo = "medico"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $medicoBody

Write-Host "Médico registrado!" -ForegroundColor Green
Write-Host ""

# ─────────────────────────────────────────

Write-Host "=== FAZENDO LOGIN (MÉDICO) ===" -ForegroundColor Green

$loginBody = @{
    email = "carlos@vitalgoal.com"
    senha = "123456"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $loginBody

$loginData = $loginResponse.Content | ConvertFrom-Json
$TOKEN = $loginData.token

Write-Host "Login realizado!" -ForegroundColor Green
Write-Host "Token: $TOKEN" -ForegroundColor Yellow
Write-Host ""

# ─────────────────────────────────────────
# PROTOCOLOS (requer token de médico)
# ─────────────────────────────────────────

Write-Host "=== CRIANDO PROTOCOLO DE EMAGRECIMENTO ===" -ForegroundColor Green

$protocoloEmagBody = @{
    pacienteId = 1
    titulo = "Protocolo de Emagrecimento"
    tipo = "dieta"
    conteudoExercicios = @(@{
        nome = "Caminhada"
        duracao = "30min"
        frequencia = "5x/semana"
    })
    conteudoDieta = @(@{
        refeicao = "Almoco"
        descricao = "Frango grelhado com salada"
    })
    caloriasTotal = 1800
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:3000/api/protocolos" `
  -Method POST `
  -Headers @{
    "Content-Type"="application/json"
    "Authorization"="Bearer $TOKEN"
  } `
  -Body $protocoloEmagBody

Write-Host "Protocolo de Emagrecimento criado!" -ForegroundColor Green
Write-Host ""

# ─────────────────────────────────────────

Write-Host "=== CRIANDO PROTOCOLO DE HIPERTROFIA ===" -ForegroundColor Green

$protocoloHiperBody = @{
    pacienteId = 1
    titulo = "Protocolo de Hipertrofia"
    tipo = "exercicio"
    conteudoExercicios = @(
        @{
            nome = "Supino"
            series = "4x12"
            carga = "60kg"
        },
        @{
            nome = "Agachamento"
            series = "4x10"
            carga = "80kg"
        }
    )
    conteudoDieta = @(
        @{
            refeicao = "Pre-treino"
            descricao = "Banana com aveia"
        },
        @{
            refeicao = "Pos-treino"
            descricao = "Whey protein com leite"
        }
    )
    caloriasTotal = 2800
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:3000/api/protocolos" `
  -Method POST `
  -Headers @{
    "Content-Type"="application/json"
    "Authorization"="Bearer $TOKEN"
  } `
  -Body $protocoloHiperBody

Write-Host "Protocolo de Hipertrofia criado!" -ForegroundColor Green
Write-Host ""

Write-Host "=== TESTES CONCLUÍDOS ===" -ForegroundColor Cyan
Write-Host "Todos os dados foram inseridos com sucesso!" -ForegroundColor Green
