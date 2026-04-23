# Backend - VitalGoal

Backend da aplicação VitalGoal construído com Express, TypeScript e PostgreSQL.

## Quick Start

```bash
# Terminal 1 - Inicia o banco de dados
docker-compose up

# Terminal 2 - Instala dependências e rodar migrations
npm install
npm run db:migrate

# Terminal 2 - Inicia o servidor em desenvolvimento
npm run dev
```

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose (para usar containers)
- PostgreSQL 14+ (se rodar localmente sem Docker)

## Setup Inicial

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do backend baseado em `.env.example`:

```bash
cp .env.example .env
```

Atualize as variáveis conforme necessário:

```env
DATABASE_URL=postgresql://vitalgoal:vitalgoal@localhost:5435/vitalgoal
PORT=3000
JWT_SECRET="your-secret-key-here"
```

### 3. Iniciar o banco de dados

O arquivo `docker-compose.yml` contém apenas a configuração do PostgreSQL:

```bash
docker-compose up
```

Isso irá:
- Iniciar o container PostgreSQL na porta 5435
- Criar o banco de dados `vitalgoal`
- Manter o banco rodando enquanto você desenvolve

### 4. Rodar as Migrations

Em outro terminal, após o PostgreSQL estar rodando, execute as migrations:

```bash
npm run db:generate  # Gera novas migrations (se houver mudanças no schema)
npm run db:migrate   # Executa as migrations pendentes
```

### 5. Iniciar o servidor em desenvolvimento

No mesmo terminal onde rodou as migrations:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

**Modo produção:**

```bash
npm run build
npm start
```

## Exemplos de uso

### Registrar um novo usuário

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "senha": "senha123",
    "nome": "Seu Nome"
  }'
```

Resposta esperada:
```json
{
  "message": "Usuário registrado com sucesso",
  "userId": 1
}
```

### Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "senha": "senha123"
  }'
```

Resposta esperada:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "nome": "Seu Nome"
  }
}
```

## Estrutura de pastas

```
backend/
├── src/
│   ├── server.ts          # Configuração principal do servidor
│   ├── routes/            # Rotas da aplicação
│   ├── schemas/           # Schemas de validação (Zod)
│   ├── db/                # Configuração do banco de dados
│   └── middleware/        # Middlewares
├── drizzle/               # Migrations geradas automaticamente
├── dist/                  # Código compilado (gerado)
├── .env.example           # Exemplo de variáveis de ambiente
├── docker-compose.yml     # Configuração Docker
├── Dockerfile             # Imagem Docker
├── package.json
└── tsconfig.json
```

## Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm start` | Inicia o servidor em modo produção |
| `npm run db:generate` | Gera novas migrations baseado no schema |
| `npm run db:migrate` | Executa as migrations pendentes |
| `npm run db:studio` | Abre o Drizzle Studio para gerenciar BD visualmente |

## Troubleshooting

### Erro de conexão com banco de dados

Verifique se:
- O PostgreSQL está rodando: `docker-compose ps`
- A `DATABASE_URL` está correta no `.env`
- O banco de dados foi criado

### Migrations com erro

Se as migrations falharem:

```bash
# Resetar banco de dados (⚠️ Deleta todos os dados)
docker-compose down -v
docker-compose up
npm run db:migrate
```

### Porta já em uso

Se a porta 3000 (ou 5435 para PostgreSQL) já está em uso, atualize no `.env` e `docker-compose.yml`.

## Desenvolvimento

Para adicionar novas rotas:

1. Crie o arquivo na pasta `src/routes/`
2. Importe e registre em `src/server.ts`
3. Use os schemas de validação em `src/schemas/`

Para modificar o schema do banco:

1. Edite os arquivos em `src/db/schema/`
2. Execute `npm run db:generate`
3. Execute `npm run db:migrate`
