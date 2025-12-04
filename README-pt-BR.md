# Easy Dispatch

> Sistema profissional de gestão de cotações de logística para empresas de todos os tamanhos

Easy Dispatch é uma aplicação full-stack que permite que empresas comparem cotações de envio de múltiplas transportadoras, gerenciem cotações de forma eficiente e rastreiem remessas com atualizações em tempo real. O sistema possui suporte multi-idioma (Inglês e Português), autenticação segura e uma interface de usuário moderna e responsiva.

** [Read in English](README.md)**

##  Funcionalidades

### Funcionalidades Principais
- **Comparação de Cotações Multi-Transportadora** - Obtenha cotações instantâneas de múltiplas transportadoras (FedEx, UPS, DHL, etc.)
- **Atualizações de Cotações em Tempo Real** - Polling automático para mudanças de status das cotações
- **Geração de Etiquetas** - Gere etiquetas de envio para cotações aprovadas
- **Gestão de Cotações** - Crie, visualize, filtre e rastreie cotações de envio
- **Analíticos do Dashboard** - KPIs e visualizações para estatísticas de cotações

### Funcionalidades Técnicas
- **Suporte Multi-Idioma** - Inglês e Português (Brasil) com alternância dinâmica de idioma
- **Autenticação JWT** - Autenticação e autorização segura de usuários
- **UI Responsiva** - Interface moderna e compatível com dispositivos móveis construída com shadcn-ui
- **Tratamento de Erros** - Tratamento abrangente de erros com IDs de correlação e mecanismos de retry
- **Documentação da API** - Documentação interativa Swagger
- **Padrão Circuit Breaker** - Integração resiliente com APIs de transportadoras
- **Cálculo de Margem de Lucro no Servidor** - Markup configurável em cotações de transportadoras

##  Stack Tecnológica

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Segurança de tipos
- **Vite** - Ferramenta de build e servidor de desenvolvimento
- **React Router** - Roteamento no lado do cliente
- **TanStack Query** - Busca e cache de dados
- **React Hook Form + Zod** - Validação de formulários
- **i18next** - Internacionalização
- **shadcn-ui** - Biblioteca de componentes UI
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

### Backend
- **NestJS** - Framework Node.js
- **TypeScript** - Segurança de tipos
- **Firebase Firestore** - Banco de dados
- **JWT** - Autenticação
- **Passport** - Estratégias de autenticação
- **Swagger** - Documentação da API
- **nestjs-i18n** - Internacionalização do backend
- **Axios** - Cliente HTTP
- **Circuit Breaker** - Chamadas de API resilientes

##  Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js** 18+ e npm
- **Projeto Firebase** com Firestore habilitado
- **Credenciais da API de Transportadora** (ex: API Frenet)
- **Git** (para clonar o repositório)

##  Instalação

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd "Easy Dispatch"
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

### 3. Configuração do Frontend

```bash
cd ../frontend
npm install
```

### 4. Configuração de Ambiente

#### Variáveis de Ambiente do Backend

Crie um arquivo `.env` no diretório `backend`:

```env
# Configuração do Servidor
PORT=3000
NODE_ENV=development

# Configuração JWT
JWT_SECRET=sua-chave-jwt-super-secreta-altere-isso-em-producao

# Configuração Firebase
FIREBASE_CREDENTIALS_PATH=./serviceAccountKey.json
# OU use variáveis de ambiente:
# FIREBASE_PROJECT_ID=seu-project-id
# FIREBASE_CLIENT_EMAIL=seu-client-email
# FIREBASE_PRIVATE_KEY=sua-private-key

# Configuração da API de Transportadora (exemplo Frenet)
FRENET_API_URL=https://api.frenet.com.br
FRENET_API_TOKEN=seu-token-da-api-frenet

# Configuração CORS (opcional, padrão são origens localhost)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Configuração de Margem de Lucro
DEFAULT_PROFIT_MARGIN=0.15
```

#### Variáveis de Ambiente do Frontend (Opcional)

Crie um arquivo `.env` no diretório `frontend` (opcional):

```env
# Configuração da API (opcional - detectado automaticamente em produção)
VITE_API_BASE=http://localhost:3000/api
VITE_BACKEND_PORT=3000
```

### 5. Configuração do Firebase

1. Crie um projeto Firebase no [Firebase Console](https://console.firebase.google.com/)
2. Habilite o Firestore Database
3. Gere uma chave de conta de serviço:
   - Vá em Configurações do Projeto → Contas de Serviço
   - Clique em "Gerar Nova Chave Privada"
   - Salve o arquivo JSON como `serviceAccountKey.json` no diretório `backend`
4. Atualize `FIREBASE_CREDENTIALS_PATH` no seu arquivo `.env`

### 6. Seed de Cliente Demo (Opcional)

```bash
cd backend
npm run seed:client
```

Isso cria um cliente demo para fins de teste.

##  Executando a Aplicação

### Modo de Desenvolvimento

#### Opção 1: Frontend e Backend Separados (Recomendado para Desenvolvimento)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- API Backend: `http://localhost:3000/api`
- Frontend: `http://localhost:5173`
- Documentação Swagger: `http://localhost:3000/api/docs`

#### Opção 2: Backend Serve o Frontend (Similar à Produção)

1. Faça o build do frontend:
```bash
cd frontend
npm run build
```

2. Copie os arquivos compilados para o backend:
```bash
# Windows PowerShell
cd backend
.\scripts\build-frontend.ps1

# Linux/Mac
cd backend
chmod +x scripts/build-frontend.sh
./scripts/build-frontend.sh
```

3. Inicie o backend:
```bash
cd backend
npm run start:dev
```

- Aplicação: `http://localhost:3000`
- API: `http://localhost:3000/api`
- Documentação Swagger: `http://localhost:3000/api/docs`

### Modo de Produção

1. Faça o build do frontend:
```bash
cd frontend
npm run build
```

2. Copie os arquivos compilados para o backend:
```bash
# Use o script de build (veja acima)
```

3. Faça o build e inicie o backend:
```bash
cd backend
npm run build
npm run start:prod
```

##  Estrutura do Projeto

```
Easy Dispatch/
├── backend/                 # Aplicação backend NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticação (JWT, Passport)
│   │   ├── billing/        # Cálculo de margem de lucro
│   │   ├── carriers/       # Adaptadores de transportadoras (Frenet, etc.)
│   │   │   ├── adapters/   # Implementações específicas de transportadoras
│   │   │   └── circuit-breaker.service.ts
│   │   ├── common/         # Utilitários compartilhados
│   │   │   ├── dto/        # DTOs comuns
│   │   │   ├── filters/    # Filtros de exceção
│   │   │   └── interceptors/ # Interceptadores de requisição
│   │   ├── config/         # Schemas de configuração
│   │   ├── firestore/      # Serviço Firestore
│   │   ├── i18n/          # Traduções do backend (en.json, pt-BR.json)
│   │   ├── labels/        # Geração de etiquetas
│   │   ├── quotes/        # Gestão de cotações
│   │   ├── scripts/       # Scripts utilitários
│   │   ├── app.module.ts  # Módulo raiz
│   │   └── main.ts        # Ponto de entrada da aplicação
│   ├── frontend/          # Frontend compilado (para servir em produção)
│   ├── test/              # Testes E2E
│   ├── package.json
│   └── nest-cli.json
│
├── frontend/               # Aplicação frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── ui/        # Componentes shadcn-ui
│   │   │   └── ...
│   │   ├── pages/         # Componentes de página
│   │   ├── hooks/         # Hooks React personalizados
│   │   ├── services/      # Cliente da API
│   │   ├── types/         # Definições de tipos TypeScript
│   │   ├── i18n/          # Traduções do frontend
│   │   │   ├── locales/   # Arquivos de tradução
│   │   │   └── config.ts  # Configuração i18n
│   │   ├── App.tsx        # Componente raiz
│   │   └── main.tsx       # Ponto de entrada
│   ├── public/            # Assets estáticos
│   ├── package.json
│   └── vite.config.ts
│
└── README.md              # Este arquivo
```

##  Documentação da API

Quando o backend estiver em execução, acesse a documentação interativa da API:

- **Swagger UI**: `http://localhost:3000/api/docs`

A documentação da API inclui:
- Todos os endpoints disponíveis
- Schemas de requisição/resposta
- Requisitos de autenticação
- Funcionalidade de teste

### Principais Endpoints da API

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/signup` - Registro de usuário
- `GET /api/quotes` - Listar cotações (com filtros)
- `POST /api/quotes` - Criar nova cotação
- `GET /api/quotes/:id` - Obter detalhes da cotação
- `POST /api/labels` - Gerar etiqueta de envio
- `GET /api/carriers/:carrierName/test` - Testar conexão com transportadora

##  Suporte Multi-Idioma

Easy Dispatch suporta dois idiomas:
- **Inglês (en)** - Padrão
- **Português - Brasil (pt-BR)** - Padrão para usuários brasileiros

### Alterando o Idioma

Os usuários podem alternar idiomas usando o seletor de idioma no cabeçalho. A preferência é salva no localStorage.

### Adicionando Novos Idiomas

1. **Frontend**: Adicione arquivos de tradução em `frontend/src/i18n/locales/`
2. **Backend**: Adicione arquivos de tradução em `backend/src/i18n/`
3. Atualize a configuração de idioma em:
   - `frontend/src/i18n/config.ts`
   - `backend/src/app.module.ts`

##  Testes

### Testes do Backend

```bash
cd backend

# Testes unitários
npm run test

# Modo watch
npm run test:watch

# Cobertura
npm run test:cov

# Testes E2E
npm run test:e2e
```

### Testes do Frontend

```bash
cd frontend

# Executar testes (se configurado)
npm run test
```

##  Funcionalidades de Segurança

- **Autenticação JWT** - Autenticação segura baseada em token
- **Configuração CORS** - Lista de permissões de origem explícita (não wildcard)
- **Validação de Entrada** - Validação no servidor com class-validator
- **Tratamento de Erros** - IDs de correlação para rastreamento de erros
- **Hash de Senha** - bcrypt para segurança de senha
- **Variáveis de Ambiente** - Dados sensíveis em variáveis de ambiente

##  Deploy

### Deploy do Backend

1. Configure as variáveis de ambiente de produção
2. Faça o build da aplicação:
```bash
npm run build
```
3. Inicie o servidor de produção:
```bash
npm run start:prod
```

### Deploy do Frontend

1. Faça o build do frontend:
```bash
npm run build
```
2. Copie o conteúdo da pasta `dist` para `backend/frontend/`
3. O backend servirá o frontend automaticamente

### Configuração Específica por Ambiente

- **Desenvolvimento**: Frontend e backend executam separadamente
- **Produção**: Backend serve o frontend compilado de `backend/frontend/`

##  Scripts Disponíveis

### Backend

```bash
npm run build          # Build para produção
npm run start          # Iniciar servidor de produção
npm run start:dev      # Iniciar servidor de desenvolvimento com watch
npm run start:debug    # Iniciar com modo debug
npm run start:prod     # Iniciar servidor de produção
npm run lint           # Executar ESLint
npm run test           # Executar testes unitários
npm run test:e2e       # Executar testes E2E
npm run seed:client    # Seed de cliente demo
```

### Frontend

```bash
npm run dev            # Iniciar servidor de desenvolvimento
npm run build          # Build para produção
npm run build:dev      # Build em modo de desenvolvimento
npm run lint           # Executar ESLint
npm run preview        # Visualizar build de produção
```

##  Solução de Problemas

### Problemas Comuns

1. **Frontend não carrega quando servido pelo backend**
   - Certifique-se de que o frontend está compilado: `cd frontend && npm run build`
   - Copie os arquivos para o diretório `backend/frontend/`
   - Verifique se `backend/frontend/index.html` existe

2. **Erros de CORS**
   - Verifique a variável de ambiente `CORS_ORIGINS`
   - Certifique-se de que sua origem está na lista de permissões
   - Padrão permite: `localhost:3000`, `localhost:5173`

3. **Erros de conexão com Firebase**
   - Verifique se `serviceAccountKey.json` existe e é válido
   - Verifique `FIREBASE_CREDENTIALS_PATH` no `.env`
   - Certifique-se de que o Firestore está habilitado no Firebase Console

4. **Conexão com API recusada**
   - Verifique se o backend está rodando na porta 3000
   - Verifique `VITE_API_BASE` no `.env` do frontend (se configurado)
   - Em produção, certifique-se de que o frontend usa o caminho relativo `/api`

5. **Arquivos de tradução não carregam**
   - Verifique se os arquivos de `backend/src/i18n/` foram copiados para `dist/i18n/`
   - Verifique se `nest-cli.json` inclui a configuração de assets
   - Recompile o backend: `npm run build`

##  Contribuindo

1. Faça um fork do repositório
2. Crie uma branch de feature (`git checkout -b feature/feature-incrivel`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona uma feature incrível'`)
4. Faça push para a branch (`git push origin feature/feature-incrivel`)
5. Abra um Pull Request

##  Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

##  Autores

- Equipe Easy Dispatch

##  Agradecimentos

- Construído com [NestJS](https://nestjs.com/)
- Componentes UI de [shadcn/ui](https://ui.shadcn.com/)
- Ícones de [Lucide](https://lucide.dev/)

---

Para mais informações, visite a [Documentação da API](http://localhost:3000/api/docs) quando o servidor estiver em execução.

