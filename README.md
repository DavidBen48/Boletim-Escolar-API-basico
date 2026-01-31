[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[NEST__BADGE]: https://img.shields.io/badge/nest-7026b9?style=for-the-badge&logo=nest
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[NODE_BADGE]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white

<h1 align="center" style="font-weight: bold;">Boletim Escolar API</h1>

![typescript][TYPESCRIPT__BADGE]
![nest][NEST__BADGE]
![node][NODE_BADGE]
![express][EXPRESS__BADGE]

<details open="open">
<summary>Table of Contents</summary>

* [📌 Visão Geral](#overview)
* [🚀 Getting started](#started)

  * [Prerequisites](#prerequisites)
  * [Cloning](#cloning)
  * [Environment Variables](#environment-variables)
  * [Starting](#starting)
* [📍 API Endpoints](#routes)
* [📐 Regras de Negócio](#business-rules)
* [📊 Estrutura de Dados](#data-structure)
* [📘 Documentação Swagger](#swagger)

</details>

<p align="center">
  <b>API REST profissional para gerenciamento de boletins escolares, com cálculo automático de médias por disciplina, classificação acadêmica inteligente e respostas padronizadas.</b>
</p>

<h2 id="overview">📌 Visão Geral</h2>

A **Boletim Escolar API** foi desenvolvida para simular, de forma clara e profissional, o funcionamento de um sistema acadêmico real.
Ela permite o cadastro, consulta, atualização e remoção de alunos, além de realizar automaticamente:

* Cálculo de médias por disciplina
* Análise do desempenho geral do aluno
* Definição de status acadêmico com base em regras claras
* Filtros por situação escolar

O projeto foi estruturado com foco em **boas práticas de backend**, organização de código, regras de negócio bem definidas e documentação clara.

**Tecnologias utilizadas**

* NestJS
* TypeScript
* Node.js
* Express
* Swagger / OpenAPI
* File System (fs) para persistência local

<h2 id="business-rules">📐 Regras de Negócio</h2>

As regras aplicadas seguem um modelo próximo ao utilizado em sistemas escolares reais:

* As notas devem ser números entre 0 e 10
* Cada disciplina recebe um conjunto de notas
* A média de cada disciplina é calculada automaticamente com duas casas decimais
* O status acadêmico do aluno é definido com base no conjunto das médias:

  * **Aprovado**: todas as médias ≥ 7
  * **Dependência**: de 1 a 3 disciplinas com média entre 5 e 6,99
  * **Recuperação**: 4 ou mais disciplinas com média entre 5 e 6,99
  * **Reprovado**: qualquer disciplina com média < 5
* Os dados são persistidos localmente em um arquivo JSON

<h2 id="started">🚀 Getting started</h2>

Esta seção descreve como executar a Boletim Escolar API localmente para desenvolvimento e testes.

<h3 id="prerequisites">Prerequisites</h3>

Requisitos mínimos para execução do projeto:

* Node.js v18 ou superior
* npm ou yarn
* Git

<h3 id="cloning">Cloning</h3>

Clone o repositório para sua máquina local:

```bash
git clone <url-do-repositorio>
```

<h3 id="environment-variables">Environment Variables</h3>

Este projeto não depende de variáveis de ambiente obrigatórias.

A persistência dos dados é realizada localmente no arquivo:

```
src/boletim_escolar/alunos.json
```

<h3 id="starting">Starting</h3>

Execute os comandos abaixo para iniciar a aplicação em modo de desenvolvimento:

```bash
cd boletim_escolar
npm install
npm run start:dev
```

A API estará disponível em:
[http://localhost:3000](http://localhost:3000)

Documentação Swagger:
[http://localhost:3000/api](http://localhost:3000/api)

<h2 id="routes">📍 API Endpoints</h2>

Abaixo estão os principais endpoints disponíveis na API.

| route                              | description                                      |
| ---------------------------------- | ------------------------------------------------ |
| <kbd>GET /alunos</kbd>             | Lista todos os alunos com notas, médias e status |
| <kbd>GET /alunos/id/:id</kbd>      | Retorna um aluno específico pelo ID              |
| <kbd>GET /alunos/aprovados</kbd>   | Lista apenas alunos aprovados                    |
| <kbd>GET /alunos/dependentes</kbd> | Lista alunos em dependência                      |
| <kbd>GET /alunos/recuperacao</kbd> | Lista alunos em recuperação                      |
| <kbd>GET /alunos/reprovados</kbd>  | Lista alunos reprovados                          |
| <kbd>POST /alunos</kbd>            | Cadastra um novo aluno                           |
| <kbd>PUT /alunos/id/:id</kbd>      | Atualiza dados de um aluno                       |
| <kbd>DELETE /alunos/id/:id</kbd>   | Remove um aluno permanentemente                  |

<h3>POST /alunos</h3>

**REQUEST**

```json
{
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

**RESPONSE**

```json
{
  "id": 1,
  "nome": "Maria Souza",
  "notas": {
    "portugues": {
      "valores": [8, 6, 7],
      "media": 7.00
    },
    "matematica": {
      "valores": [7, 8, 6],
      "media": 7.00
    }
  },
  "status": "Aprovado"
}
```

<h3>PUT /alunos/id/:id</h3>

**REQUEST**

```json
{
  "notas": {
    "matematica": [9, 8, 9, 8]
  }
}
```

Permite atualização parcial, sendo possível alterar apenas o nome, apenas notas específicas ou ambos.

<h3>DELETE /alunos/id/:id</h3>

Remove definitivamente o aluno informado pelo ID.

<h2 id="data-structure">📊 Estrutura de Dados</h2>

Cada aluno segue um padrão consistente de dados:

* Identificador único
* Nome do aluno
* Conjunto de disciplinas
* Lista de notas por disciplina
* Média calculada automaticamente
* Status acadêmico descritivo

Esse padrão garante respostas previsíveis, claras e prontas para consumo por frontends ou outros serviços.

<h2 id="swagger">📘 Documentação Swagger</h2>

A API conta com documentação interativa gerada automaticamente via Swagger/OpenAPI.

No Swagger é possível:

* Visualizar todos os endpoints
* Testar requisições GET, POST, PUT e DELETE
* Ver exemplos reais de request e response
* Entender os DTOs e validações aplicadas

Acesse em:
[http://localhost:3000/api](http://localhost:3000/api)

Este projeto foi desenvolvido com foco em **clareza arquitetural**, **regras de negócio bem definidas** e **padrões profissionais de backend**, sendo ideal para estudos, portfólio e simulação de sistemas acadêmicos reais.
