# Boletim Escolar API

API REST desenvolvida em NestJS para gerenciamento de boletim escolar, permitindo consultar alunos, suas notas, médias e status de aprovação.

## 📋 Sobre o Projeto

Sistema de boletim escolar que oferece endpoints para:
- Listar todos os alunos com suas notas, médias e status
- Buscar aluno por ID
- Filtrar alunos por status (Aprovados, Recuperação, Reprovados)
- Criar novos alunos (POST)
- Atualizar dados de alunos existentes (PUT)
- Deletar alunos (DELETE)
- Calcular automaticamente a média e o status de aprovação baseado nas notas
- Documentação interativa da API com Swagger/OpenAPI

Os dados dos alunos são armazenados em um arquivo JSON estático (`alunos.json`).

## 🛠️ Tecnologias Usadas

- **NestJS** - Framework Node.js para construção de aplicações server-side
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web (via @nestjs/platform-express)
- **Swagger/OpenAPI** - Documentação interativa da API (via @nestjs/swagger)

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
5. A documentação Swagger estará disponível em `http://localhost:3000/api`

### Scripts Disponíveis

- `npm run start` - Inicia o servidor
- `npm run start:dev` - Inicia em modo desenvolvimento (watch mode)
- `npm run build` - Compila o projeto para produção
- `npm run start:prod` - Inicia o servidor em modo produção

## 📡 Endpoints Disponíveis

### Métodos GET
- `GET /alunos` - Lista todos os alunos
- `GET /alunos/aprovados` - Lista alunos aprovados
- `GET /alunos/recuperacao` - Lista alunos em recuperação
- `GET /alunos/reprovados` - Lista alunos reprovados
- `GET /alunos/id/:id` - Busca aluno por ID

### Método POST
- `POST /alunos` - Cria um novo aluno
  - Body: `{ "nome": "string", "notas": [number, number, ...] }`
  - Retorna o aluno criado com média e status calculados automaticamente
  
### Método PUT
- `PUT /alunos/id/:id` - Atualiza um aluno existente
  - Body: `{ "nome": "string" }` ou `{ "notas": [number, number, ...] }` ou ambos
  - Retorna o aluno atualizado com média e status recalculados

### Método DELETE
- `DELETE /alunos/id/:id` - Deleta um aluno
  - Retorna mensagem de confirmação

## 📚 Documentação Swagger

A API possui documentação interativa gerada automaticamente com Swagger/OpenAPI. A documentação foi implementada utilizando decoradores do `@nestjs/swagger` nos controllers e DTOs, permitindo uma documentação completa e sempre atualizada.

### Onde foi implementado o Swagger:

- **`src/main.ts`** - Configuração principal do Swagger com `DocumentBuilder` e `SwaggerModule`
- **`src/boletim_escolar/boletim_escolar.controller.ts`** - Decoradores `@ApiTags`, `@ApiOperation`, `@ApiResponse`, `@ApiParam` nos endpoints
- **DTOs** - Decoradores `@ApiProperty` e `@ApiPropertyOptional` em:
  - `src/boletim_escolar/dto/criar_aluno.dto.ts`
  - `src/boletim_escolar/dto/atualizar_aluno.dto.ts`
  - `src/boletim_escolar/dto/aluno_response.dto.ts`

### Como Acessar e Usar o Swagger:

1. **Inicie o servidor:**
```bash
npm run start:dev
```

2. **Acesse a documentação:**
Abra seu navegador e acesse: `http://localhost:3000/api`

3. **Interface do Swagger:**
A interface do Swagger oferece:
   - Lista completa de todos os endpoints disponíveis
   - Descrição detalhada de cada endpoint
   - Parâmetros esperados (path, query, body)
   - Exemplos de requisições e respostas
   - Possibilidade de testar os endpoints diretamente na interface

4. **Testando Endpoints no Swagger:**
   - Clique em um endpoint para expandir seus detalhes
   - Clique no botão **"Try it out"**
   - Preencha os parâmetros necessários (se houver)
   - Para requisições POST/PUT, edite o body JSON no exemplo fornecido
   - Clique em **"Execute"** para enviar a requisição
   - Visualize a resposta da API diretamente na interface

5. **Exemplo de uso no Swagger:**
   - Para criar um aluno: Expanda `POST /alunos`, clique em "Try it out", edite o JSON no campo "Request body" com seus dados e clique em "Execute"
   - Para buscar um aluno: Expanda `GET /alunos/id/{id}`, clique em "Try it out", informe o ID do aluno e clique em "Execute"
   - Para atualizar: Expanda `PUT /alunos/id/{id}`, clique em "Try it out", informe o ID e edite o body JSON
   - Para deletar: Expanda `DELETE /alunos/id/{id}`, clique em "Try it out", informe o ID e clique em "Execute"

### Vantagens do Swagger:

- ✅ Documentação sempre atualizada automaticamente
- ✅ Interface visual e intuitiva
- ✅ Teste de endpoints diretamente na interface
- ✅ Visualização de exemplos de requisições e respostas
- ✅ Documentação dos tipos de dados (DTOs) com exemplos
- ✅ Facilita o desenvolvimento e integração da API

## 🔧 Como Usar os Métodos POST, PUT e DELETE

### USANDO POSTMAN / INSOMNIA

#### POST - Criar Aluno
1. Método: `POST`
2. URL: `http://localhost:3000/alunos`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "nome": "João Silva",
  "notas": [8.5, 7.0, 9.0, 8.0]
}
```

#### PUT - Atualizar Aluno
1. Método: `PUT`
2. URL: `http://localhost:3000/alunos/id/n` (substitua `n` pelo ID do aluno específico)
3. Headers: `Content-Type: application/json`
4. Body (raw JSON) - Exemplos:
   - Atualizar apenas o nome:
   ```json
   {
     "nome": "João Silva Santos"
   }
   ```
   - Atualizar apenas as notas:
   ```json
   {
     "notas": [9.0, 8.5, 9.5, 8.5]
   }
   ```
   - Atualizar nome e notas:
   ```json
   {
     "nome": "João Silva Santos",
     "notas": [9.0, 8.5, 9.5, 8.5]
   }
   ```

#### DELETE - Deletar Aluno
1. Método: `DELETE`
2. URL: `http://localhost:3000/alunos/id/n` (substitua `n` pelo ID do aluno específico)
3. Não é necessário enviar Body


## ✅ Funcionalidades Implementadas

- ✅ **Todos os métodos HTTP** - GET, POST, PUT e DELETE estão totalmente implementados
- ✅ **CRUD completo** - Criar, ler, atualizar e deletar alunos
- ✅ **Validação de dados** - Validação de nome e notas (valores entre 0 e 10)
- ✅ **Cálculo automático** - Média e status de aprovação calculados automaticamente
- ✅ **Documentação Swagger/OpenAPI** - Documentação interativa completa da API com possibilidade de testar endpoints diretamente

## 🔮 Futuras Atualizações

- **Readaptação para API RESTful** - Ajustar a arquitetura e endpoints para seguir completamente os padrões REST
- **Melhorias de robustez** - Transformar o projeto em uma solução mais completa e escalável, incluindo:
  - Integração com banco de dados não-relacional (MongoDB)
  - Validação de dados mais robusta
  - Autenticação e autorização
  - Testes automatizados
- **Docker** - Implementar containerização com Docker para facilitar o deploy e o ambiente de desenvolvimento
