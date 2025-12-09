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

## 🔧 Como Usar os Métodos POST, PUT e DELETE

### Usando Postman

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

### Usando JavaScript/Fetch (Serviço Web)

#### POST - Criar Aluno
```javascript
fetch('http://localhost:3000/alunos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João Silva',
    notas: [8.5, 7.0, 9.0, 8.0]
  })
})
.then(response => response.json())
.then(data => console.log('Aluno criado:', data))
.catch(error => console.error('Erro:', error));
```

#### PUT - Atualizar Aluno
```javascript
// Atualizar apenas o nome
fetch('http://localhost:3000/alunos/id/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João Silva Santos'
  })
})
.then(response => response.json())
.then(data => console.log('Aluno atualizado:', data))
.catch(error => console.error('Erro:', error));

// Atualizar apenas as notas
fetch('http://localhost:3000/alunos/id/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    notas: [9.0, 8.5, 9.5, 8.5]
  })
})
.then(response => response.json())
.then(data => console.log('Aluno atualizado:', data))
.catch(error => console.error('Erro:', error));

// Atualizar nome e notas
fetch('http://localhost:3000/alunos/id/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'João Silva Santos',
    notas: [9.0, 8.5, 9.5, 8.5]
  })
})
.then(response => response.json())
.then(data => console.log('Aluno atualizado:', data))
.catch(error => console.error('Erro:', error));
```

#### DELETE - Deletar Aluno
```javascript
fetch('http://localhost:3000/alunos/id/1', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log('Resultado:', data))
.catch(error => console.error('Erro:', error));
```

### Usando cURL (Terminal)

#### POST - Criar Aluno
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva", "notas": [8.5, 7.0, 9.0, 8.0]}'
```

#### PUT - Atualizar Aluno
```bash
curl -X PUT http://localhost:3000/alunos/id/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Silva Santos", "notas": [9.0, 8.5, 9.5, 8.5]}'
```

#### DELETE - Deletar Aluno
```bash
curl -X DELETE http://localhost:3000/alunos/id/1
```

## ✅ Funcionalidades Implementadas

- ✅ **Todos os métodos HTTP** - GET, POST, PUT e DELETE estão totalmente implementados
- ✅ **CRUD completo** - Criar, ler, atualizar e deletar alunos
- ✅ **Validação de dados** - Validação de nome e notas (valores entre 0 e 10)
- ✅ **Cálculo automático** - Média e status de aprovação calculados automaticamente

## 🔮 Futuras Atualizações

- **Readaptação para API RESTful** - Ajustar a arquitetura e endpoints para seguir completamente os padrões REST
- **Melhorias de robustez** - Transformar o projeto em uma solução mais completa e escalável, incluindo:
  - Integração com banco de dados não-relacional (MongoDB)
  - Validação de dados mais robusta
  - Autenticação e autorização
  - Documentação com Swagger/OpenAPI
  - Testes automatizados
