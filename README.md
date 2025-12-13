# Boletim Escolar API

API REST desenvolvida em NestJS para gerenciamento de boletim escolar, permitindo consultar alunos, suas notas por disciplina, médias e status detalhado de aprovação.

---

## ⚡️ Mudanças Recentes (Release Notes)

Este projeto passou por uma reestruturação total visando clareza, robustez e funcionalidades mais avançadas:

- **Novo modelo de notas:**  
  Cada aluno agora possui notas separadas para cada disciplina (português, matemática, história, geografia, inglês).  
  Exemplo interno:
  ```json
  {
    "id": 1,
    "nome": "Maria Souza",
    "notas": {
      "portugues": [8, 6, 7],
      "matematica": [7, 8, 6],
      "historia": [9, 9, 8],
      "geografia": [7, 8, 7],
      "ingles": [6, 5, 7]
    }
  }
  ```
  - Todas as operações de criação, atualização e visualização de alunos consideram esse formato.

- **Cálculo automático de média por disciplina:**  
  Para cada disciplina é calculada a média (com duas casas decimais), tornando o status de aprovação mais transparente.

- **Status de aprovação detalhado e inteligente:**  
  O status do aluno reflete situações como:
  - Aprovado com Sucesso (todas as médias ≥ 7)
  - Recuperação (quando 4 ou 5 disciplinas ficam com média ≥5 e <7)
  - Dependência (1, 2 ou 3 disciplinas entre 5 e 6.99)
  - Reprovação total (qualquer disciplina reprovada)
  > O status descritivo informa em quais matérias houve dependência, recuperação ou reprovação.

- **EndPoints separados para cada status:**  
  Agora é possível filtrar por:
  - Alunos aprovados (`GET /alunos/aprovados`)
  - Alunos em dependência (`GET /alunos/dependentes`)
  - Alunos em recuperação (`GET /alunos/recuperacao`)
  - Alunos reprovados (`GET /alunos/reprovados`)

- **Validação aprimorada dos dados:**  
  Todos os campos de notas passam por checagem de tipo, tamanho mínimo e valores aceitáveis (0 a 10). Erros retornam mensagens claras.

- **Retorno padronizado dos alunos:**  
  Todas as respostas exibem:
    - Nome
    - ID
    - Notas por disciplina (incluindo médias)
    - Status calculado conforme regras da escola

---

## 📋 Sobre o Projeto

O sistema de boletim escolar oferece endpoints para:
- Listar todos os alunos (com notas, médias por disciplina e status detalhado)
- Buscar aluno pelo ID
- Filtrar alunos por status (Aprovados, Dependentes, Recuperação, Reprovados)
- Criar alunos individualmente (POST), fornecendo as notas organizadas por disciplina
- Atualizar nome e/ou apenas algumas notas específicas de um aluno (PUT)
- Deletar alunos (DELETE)
- Cálculo automático e determinístico dos resultados baseado nas médias de cada disciplina

Todos os dados dos alunos são armazenados de forma persistente em um arquivo JSON local (`alunos.json`).

---

## 🛠️ Tecnologias Usadas

- **NestJS** — Framework Node.js para estrutura modular e robusta
- **TypeScript** — Garantia de tipagem e manutenção do código
- **Node.js** — Runtime moderno e eficiente
- **Express** — Servidor via plataforma do NestJS
- **Swagger/OpenAPI** — Interface e documentação interativa da API
- **File System** (`fs`) — Persistência simples dos dados locais

---

## 📁 Estrutura do Projeto

```
boletim_escolar/
├── src/
│   ├── boletim_escolar/
│   │   ├── alunos.json                  # Dados persistidos (não apague manualmente)
│   │   ├── dto/                         # Tipos de dados e validação
│   │   │   ├── criar_aluno.dto.ts
│   │   │   ├── atualizar_aluno.dto.ts 
│   │   │   └── aluno_response.dto.ts
│   │   ├── boletim_escolar.controller.ts # Rotas REST e integração Swagger
│   │   ├── boletim_escolar.service.ts    # Lógica completa de negócio
│   │   └── boletim_escolar.module.ts     # Módulo principal
│   ├── app.module.ts
│   └── main.ts                          # Bootstrap + Swagger
|
├──── scripts
|     └── seed-alunos.ts                 # tratamento de dados no alunos.json
|                                        
|
├── dist/                                # Arquivos compilados
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🚀 Como Clonar e Executar

### Pré-requisitos
- Node.js (18+)
- npm ou yarn

### Instalação Rápida

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd boletim_escolar
```
2. Instale as dependências:
```bash
npm install
```
3. Execute:
```bash
npm run start:dev
```
4. API: http://localhost:3000  
5. Swagger: http://localhost:3000/api

---

## 📡 Endpoints Disponíveis

> Para detalhes, consulte a [Documentação Swagger](#-documentação-swagger) em `http://localhost:3000/api`

### Métodos GET
- `GET /alunos`                   — Lista todos os alunos (notas, médias e status)
- `GET /alunos/aprovados`         — Só alunos aprovados em todas as disciplinas
- `GET /alunos/dependentes`       — Alunos que têm matérias em dependência
- `GET /alunos/recuperacao`       — Alunos em regime de recuperação
- `GET /alunos/reprovados`        — Alunos reprovados
- `GET /alunos/id/:id`            — Busca um aluno específico

### POST
- `POST /alunos` — Cria novo aluno  
  Body:
  ```json
  {
    "nome": "string",
    "notas": {
      "portugues": [8, 6, 9, 8],
      "matematica": [7, 7, 8, 8],
      "historia": [10, 9, 8, 6],
      "geografia": [6, 8, 7, 5],
      "ingles": [8, 7, 8, 6]
    }
  }
  ```
  Retorna o aluno criado, com médias e status.

### PUT
- `PUT /alunos/id/:id` — Atualiza aluno  
  Body flexível:
  ```json
  {
    "nome": "Novo Nome"
  }
  ```
  ou
  ```json
  {
    "notas": {
      "matematica": [9, 8, 9, 8]
    }
  }
  ```
  ou ambos  
  Responde com aluno atualizado, médias recalculadas e status atualizado.

### DELETE
- `DELETE /alunos/id/:id`  
  Remove permanentemente o aluno

---

## 📚 Documentação Swagger

A documentação interativa está disponível automaticamente, detalhando todos os endpoints, parâmetros e exemplos de request/response.

### Implementação do Swagger:
- `src/main.ts` — Configuração do SwaggerModule
- `boletim_escolar.controller.ts` — Decoradores do Swagger em cada rota
- DTOs (`criar_aluno.dto.ts`, `atualizar_aluno.dto.ts`, `aluno_response.dto.ts`) — Tipagem e exemplos no Swagger

Acesse:  
`http://localhost:3000/api`

Use o botão **"Try it out"** no Swagger para testar POST, PUT ou DELETE diretamente no navegador, visualizando exemplos automáticos conforme o modelo real do projeto.

---

## 🔧 Como Usar os Métodos POST, PUT e DELETE

### Exemplo de Requisição (via Postman ou Swagger)

#### POST - Criar Aluno
Request:
```json
{
  "nome": "João Silva",
  "notas": {
    "portugues": [8, 9, 7.5, 8],
    "matematica": [7, 7, 8.5, 0],
    "historia": [9, 10, 8.5, 8],
    "geografia": [7, 7.5, 8, 5],
    "ingles": [6, 7, 7.5, 9]
  }
}
```

#### PUT - Atualizar Nome/Notas
Atualize só parte dos dados se quiser:
```json
{
  "nome": "João S. Andrade"
}
```
ou
```json
{
  "notas": {
    "ingles": [8, 8, 9, 8]
  }
}
```

#### DELETE - Deletar Aluno
Basta chamar o endpoint e passar o ID.

---

## ✅ Funcionalidades Implementadas

- CRUD completo (GET, POST, PUT, DELETE)
- Validação robusta (nomes obrigatórios, notas por disciplina exigidas, todos os valores de 0 a 10)
- Média calculada por disciplina (2 casas decimais)
- Status inteligente e descritivo por aluno, listando cada matéria no status
- Endpoints específicos para filtrar por aprovação, dependência, recuperação e reprovação
- Documentação interativa (Swagger) com exemplos reais de request/response
- Mensagens de erro claras e UX consistente

---

## 🔮 Futuras Atualizações

- Adaptar para persistência real em banco de dados (MongoDB)
- Autenticação de usuários e controle de permissões
- Deploy Docker
- Testes automatizados e CI/CD
- Melhorias nas regras escolares e histórico dos alunos (múltiplos anos)

---

