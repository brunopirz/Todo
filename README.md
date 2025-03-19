# To-do
A clean and open source task manager

## 🎯 Visão Geral do Projeto

🏗️ Arquitetura do Sistema
Visão Arquitetural

Frontend: React 18 + TypeScript
Backend: Serverless Firebase
Autenticação: Firebase Authentication
Banco de Dados: Firestore
Gerenciamento de Estado: Redux Toolkit
Estilização: Material-UI
Testes: Jest + React Testing Library

Diagrama de Arquitetura
graph TD
    A[Usuário] --> B[Interface React]
    B --> C[Redux Store]
    C --> D[Firebase Authentication]
    C --> E[Firestore]
    D --> F[Serviços de Autenticação]
    E --> G[Serviços de Dados]

                    
                
## 🔐 Modelo de Autenticação
Fluxo de Autenticação

Login com Google
Validação no Firebase Authentication
Criação/Recuperação de perfil de usuário
Geração de token JWT
Autorização baseada em regras do Firestore
Registro de novo usuário
Recuperação de senha
Logout

Tipos de Usuário

Usuário Padrão: Acesso completo às próprias listas e tarefas
Usuário Convidado: Acesso limitado (implementação futura)

## Gerenciamento de Listas

Criar listas personalizadas
Editar listas
Excluir listas
Listas padrão (Meu Dia, Importante, Planejado)

## Gerenciamento de Tarefas

Criar tarefas
Editar tarefas
Marcar como concluída
Adicionar subtarefas
Definir data de vencimento
Adicionar lembretes
Marcar como importante

## 🔧 Configuração do Ambiente
Variáveis de Ambiente
**Arquivo .env:**
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```
                 
## Instalação
**Clonar repositório**
```
git clone https://github.com/seu-usuario/microsoft-todo-clone.git
```

## Instalar dependências
```
cd todo
npm install
```

## Configurar Firebase
**Adicionar credenciais no .env**

## Iniciar desenvolvimento
```
npm start
```

                
## 🧪 Estratégia de Testes
Tipos de Testes

Testes Unitários (Jest)
Testes de Componente (React Testing Library)
Testes de Integração
Cobertura de Código

Comandos de Teste
### Rodar testes
```
npm test
```

### Cobertura de testes
```
npm run test:coverage
```

                    
##🚢 Deploy
Plataformas Suportadas

Firebase Hosting
Vercel
Netlify

Comandos de Deploy
### Build para produção
npm run build

### Deploy no Firebase
firebase deploy

# LER ARQUIVO GUIA DE DEPLOY.MD                           

                
### 🔒 Segurança
Regras de Segurança do Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    match /tasks/{taskId} {
      allow create: if request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```
                    
                        
                    
                
### 📈 Monitoramento
Ferramentas

Firebase Performance Monitoring
Firebase Crashlytics
Custom Error Tracking

### 🔮 Roadmap Futuro / Atualizações

Modo Offline
Sincronização entre dispositivos
Colaboração em tarefas
Integração com calendários externos
Tema personalizado
Exportação/Importação de tarefas

## 👥 Contribuição
Como Contribuir

**Faça fork do repositório** 
**Crie branch feature**
**Commit suas alterações**
**Abra um Pull Request**

### 📄 Licença
MIT License

### 🚀 Tecnologias Principais

React 18
TypeScript
Firebase
Redux Toolkit
Material-UI
Jest
React Testing Library

contato@brunopira.com.br
@brunopira
