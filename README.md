# Boletim Escolar API

API REST desenvolvida em NestJS para gerenciamento de boletim escolar, permitindo consultar alunos, suas notas, médias e status de aprovação.

## 📋 Sobre o Projeto

Sistema de boletim escolar que oferece endpoints para:
- Listar todos os alunos com suas notas, médias e status
- Buscar aluno por ID
- Filtrar alunos por status (Aprovados, Recuperação, Reprovados)
- Calcular automaticamente a média e o status de aprovação baseado nas notas

Os dados dos alunos são armazenados em um arquivo JSON estático (`alunos.json`).

## 🛠️ Tecnologias Usadas

- **NestJS** - Framework Node.js para construção de aplicações server-side
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web (via @nestjs/platform-express)

## 📁 Estrutura do Projeto

```
boletim_escolar/
├── src/
│   ├── boletim_escolar/
│   │   ├── alunos.json              # Dados estáticos dos alunos
│   │   ├── boletim_escolar.controller.ts
│   │   ├── boletim_escolar.service.ts
│   │   └── boletim_escolar.module.ts
│   ├── app.module.ts
│   └── main.ts
├── dist/                            # Código compilado
├── nest-cli.json
├── package.json
└── tsconfig.json
```

## 🚀 Como Clonar e Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd boletim_escolar
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run start:dev
```

4. A API estará disponível em `http://localhost:3000`

### Scripts Disponíveis

- `npm run start` - Inicia o servidor
- `npm run start:dev` - Inicia em modo desenvolvimento (watch mode)
- `npm run build` - Compila o projeto para produção
- `npm run start:prod` - Inicia o servidor em modo produção

## 📡 Endpoints Disponíveis

- `GET /alunos/geral` - Lista todos os alunos
- `GET /alunos/id/:id` - Busca aluno por ID
- `GET /alunos/aprovados` - Lista alunos aprovados
- `GET /alunos/recuperacao` - Lista alunos em recuperação
- `GET /alunos/reprovados` - Lista alunos reprovados

## 🔮 Futuras Atualizações

- **Implementação de POST, PUT e DELETE** - Adicionar funcionalidades para criar, atualizar e deletar alunos
- **Readaptação para API RESTful** - Ajustar a arquitetura e endpoints para seguir completamente os padrões REST
- **Melhorias de robustez** - Transformar o projeto em uma solução mais completa e escalável, incluindo:
  - Integração com banco de dados não-relacional (MongoDB, etc.)
  - Validação de dados mais robusta
  - Autenticação e autorização
  - Documentação com Swagger/OpenAPI
  - Testes automatizados
