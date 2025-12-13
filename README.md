# Boletim Escolar API

API REST profissional desenvolvida com NestJS para facilitar o gerenciamento de boletins escolares. Com ela, você consulta alunos, acompanha notas por disciplina, recebe o cálculo automático das médias e um status detalhado de aprovação — tudo de forma prática e transparente.

---

## ⚡️ Release Notes (Resumo das Mudanças Recentes)

O projeto passou por uma grande atualização para trazer mais clareza, flexibilidade e robustez. Confira o que mudou, explicado de forma profissional e didática:

- **Modelo avançado de notas por disciplina:**  
  Agora as notas são organizadas dentro de cada matéria (português, matemática, história, geografia, inglês).  
  Exemplo de estrutura:
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
  - Sempre que criar, atualizar ou buscar aluno, siga esse formato.

- **Média automática por disciplina (2 casas decimais):**  
  O sistema calcula automaticamente a média de cada matéria, facilitando a visualização do desempenho individual.

- **Status de aprovação detalhado:**  
  O status final do aluno (Aprovado, Dependência, Recuperação ou Reprovado) agora é calculado de forma inteligente, considerando:
    - **Aprovado:** Todas as médias ≥ 7.
    - **Recuperação:** Quando 4 ou 5 disciplinas têm média entre 5 (inclusive) e 7 (exclusivo).
    - **Dependência:** Entre 1 e 3 disciplinas na faixa de média entre 5 e 6,99.
    - **Reprovação:** Uma ou mais disciplinas com média < 5.
  > A descrição de status mostra em quais disciplinas existe dependência, necessidade de recuperação ou reprovação.

- **Endpoints de filtro específicos para status:**  
  Filtre diretamente os alunos por situação:
    - `GET /alunos/aprovados`
    - `GET /alunos/dependentes`
    - `GET /alunos/recuperacao`
    - `GET /alunos/reprovados`

- **Validação profissional dos dados:**  
  As notas devem ser sempre números entre 0 e 10, obrigatoriamente, com checagens de tipo e tamanho. Qualquer erro retorna mensagens claras e objetivas.

- **Respostas padronizadas:**  
  Todas as respostas seguem o padrão:
    - Nome do aluno
    - ID
    - Notas (e médias detalhadas por disciplina)
    - Status descritivo e transparente

---

## 📋 Sobre o Projeto

Este sistema oferece um serviço completo para o gerenciamento escolar, incluindo:

- Listagem geral dos alunos (com notas, médias e status detalhado)
- Consulta de aluno pelo ID
- Filtragem avançada por status (Aprovados, Dependentes, Recuperação, Reprovados)
- Cadastro de novos alunos (POST), sempre utilizando a organização por disciplina
- Atualização flexível (PUT) do nome ou de notas específicas
- Remoção definitiva de alunos (DELETE)
- Todo o cálculo de médias e status é automático e baseado nas regras da escola

Todos os dados são gravados de forma persistente no arquivo `alunos.json`, local.

---

## 🛠️ Tecnologias Utilizadas

- **NestJS** — Framework robusto Node.js para backend escalável
- **TypeScript** — Tipagem estática para consistência e fácil manutenção
- **Node.js** — Execução moderna para APIs performáticas
- **Express** — Servidor HTTP integrado ao NestJS
- **Swagger/OpenAPI** — Interface profissional de documentação e testes da API
- **File System (fs)** — Persistência local simples e confiável

---

## 📁 Estrutura do Projeto

```
boletim_escolar/
├── src/
│   ├── boletim_escolar/
│   │   ├── alunos.json                   # Dados persistidos (não remova manualmente)
│   │   ├── dto/                          # Definições de tipos e validação
│   │   │   ├── criar_aluno.dto.ts
│   │   │   ├── atualizar_aluno.dto.ts 
│   │   │   └── aluno_response.dto.ts
│   │   ├── boletim_escolar.controller.ts # Endpoints REST, integrações e Swagger
│   │   ├── boletim_escolar.service.ts    # Toda a lógica de negócio
│   │   └── boletim_escolar.module.ts     # Módulo principal
│   ├── app.module.ts
│   └── main.ts                           # Bootstrap + configuração do Swagger
|
├──── scripts
|     └── seed-alunos.ts                  # Utilitário para tratar alunos.json
|                                         
|
├── dist/                                 # Código compilado
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js v18 ou superior
- Gerenciador de pacotes: npm ou yarn

### Passos rápidos:

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd boletim_escolar
```
2. Instale as dependências:
```bash
npm install
```
3. Inicialize o servidor:
```bash
npm run start:dev
```
4. Acesse a API em: http://localhost:3000  
5. Acesse a documentação interativa (Swagger): http://localhost:3000/api

---

## 📡 Endpoints Disponíveis

> Detalhes completos na [Documentação Swagger](#-documentação-swagger) (`http://localhost:3000/api`)

### GET
- `GET /alunos`                  — Lista todos os alunos, incluindo médias e status detalhado
- `GET /alunos/aprovados`        — Apenas alunos aprovados em todas as disciplinas
- `GET /alunos/dependentes`      — Alunos que têm disciplinas em dependência
- `GET /alunos/recuperacao`      — Alunos em regime de recuperação
- `GET /alunos/reprovados`       — Alunos reprovados (média < 5 em qualquer matéria)
- `GET /alunos/id/:id`           — Busca de aluno específico por ID

### POST
- `POST /alunos` — Cadastro de novo aluno  
  Exemplo de body:
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
  > Retorna o aluno criado, já com médias e status.

### PUT
- `PUT /alunos/id/:id` — Atualização de aluno  
  Pode alterar só o nome, só notas, ou ambos.
  Exemplos:
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
  ou ambos juntos.  
  > Responde com o aluno atualizado, médias recalculadas e status novo.

### DELETE
- `DELETE /alunos/id/:id`  
  Remove o aluno do sistema de modo permanente.

---

## 📚 Documentação Swagger

A API oferece documentação interativa, fácil de usar, explicando cada endpoint e mostrando exemplos reais de request e response.

### Como está implementado:
- `src/main.ts` — Configuração principal do SwaggerModule
- `boletim_escolar.controller.ts` — Endpoints documentados com decorators do Swagger
- DTOs (`criar_aluno.dto.ts`, `atualizar_aluno.dto.ts`, `aluno_response.dto.ts`) — Modelos fortemente tipados com exemplos

Acesse:  
`http://localhost:3000/api`

Basta clicar em **"Try it out"** no Swagger para testar requisições POST, PUT e DELETE com exemplos reais.

---

## 🔧 Exemplos de Uso: POST, PUT e DELETE

### Exemplos práticos para utilizar nos clientes HTTP (Swagger ou Postman):

#### POST - Criar Aluno
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

#### PUT - Atualizar Nome ou Notas
Atualize só a informação necessária, exemplo:
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

#### DELETE - Remover Aluno
Simplesmente acione o endpoint informando o ID do aluno.

---

## ✅ Funcionalidades Disponíveis

- CRUD completo: listar, buscar, cadastrar, atualizar e remover alunos
- Validação detalhada dos dados (nomes obrigatórios, todas as disciplinas e notas de 0 a 10)
- Média por disciplina calculada automaticamente (duas casas decimais)
- Status inteligente e transparente para cada aluno, detalhando cada disciplina
- Endpoints específicos para filtros por status escolar
- Documentação via Swagger com exemplos reais e UX padrão
- Mensagens de erro claras e responsivas

---

## 🔮 O que vem por aí

- Migração dos dados para banco de dados real (MongoDB)
- Autenticação de usuários e controle de acesso
- Deploy via Docker
- Testes automatizados e integração contínua (CI/CD)
- Melhorias nas regras escolares e histórico acadêmico (múltiplos anos)

---
