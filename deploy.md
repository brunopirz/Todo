# 🌐 Guia de Deploy: TODO no Firebase

##Ferramentas Necessárias

Node.js (v18+)
npm ou yarn
Firebase CLI
Conta no Firebase
Conta no GitHub (opcional, para CI/CD)

## 🔧 Configuração Inicial
1. Instalar Firebase CLI
Instalar Firebase CLI globalmente
```
npm install -g firebase-tools
```                  
                        
                    
                
## 2. Autenticar no Firebase
Fazer login no Firebase
firebase login

## Verificar login
firebase projects:list

                    
                        
                    
                
##🚀 Configuração do Projeto Firebase
Criar Novo Projeto

Acesse Console Firebase
Clique em "Adicionar projeto"
Escolha nome do projeto
Configurar Google Analytics (opcional)

Habilitar Serviços
Autenticação

Console Firebase > Authentication
Ativar métodos de login:

Google
Email/Senha


Firestore

Console Firebase > Firestore Database
Criar banco de dados em modo de teste
Definir localização

Hosting

Console Firebase > Hosting
Preparar para deploy

## 🔐 Configurações de Ambiente
Variáveis de Ambiente de Produção

**.env.production**

```
REACT_APP_FIREBASE_API_KEY=seu_api_key_producao
REACT_APP_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=seu_app_id
```
                    
## 📦 Preparar Projeto para Deploy
Configuração Firebase no Projeto
firebase.json
```
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```
                    
                        
```    
.firebaserc
{
  "projects": {
    "default": "seu-project-id"
  }
}
```
                    
                        
                    
                
**Script de Build**
package.json

```
{
  "scripts": {
    "build": "react-scripts build",
    "deploy": "npm run build && firebase deploy"
  }
}
```
                    
                        
🔒 Regras de Segurança do Firestore
**firestore.rules**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    match /lists/{listId} {
      allow create: if request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
    }
    match /tasks/{taskId} {
      allow create: if request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```
                    
                  
                
### 🚢 Deploy Manual
Passos de Deploy
Build do projeto
```
npm run build
```

### Login no Firebase
```
firebase login
```

### Selecionar projeto
```
firebase use seu-project-id
```

### Deploy
```
firebase deploy
```
                    
                        
                    
                
🤖 Configuração CI/CD com GitHub Actions
.github/workflows/firebase-deploy.yml
**name: Firebase Deploy**

```
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
    
    - name: Install Dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
        REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
        # Outras variáveis de ambiente
    
    - name: Deploy to Firebase
      uses: w9jds/firebase-action@master
      with:
        args: deploy --only hosting
      env:
        FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```
                    
                        
                    
                
**Gerar Token de Deploy**
```
firebase login:ci
```
                    
                    
                
Configurar Secrets no GitHub

Repositório > Settings > Secrets
Adicionar:

FIREBASE_TOKEN
Variáveis de ambiente


###📈 Monitoramento
Firebase Performance

Habilitar no Console Firebase
Adicionar configuração no código

Firebase Crashlytics

Adicionar no projeto
Configurar relatórios de erro

🔍 Verificações Finais
Checklist Pré-Deploy

[ ] Todas variáveis de ambiente configuradas
[ ] Build funcionando localmente
[ ] Testes passando
[ ] Regras de Firestore definidas
[ ] Autenticação configurada
[ ] Domínio personalizado (opcional)

💡 Dicas Adicionais

Use domínio personalizado no Firebase Hosting
Configure SSL gratuito
Habilite cache e CDN

🚧 Solução de Problemas
Erros Comuns

Verificar credenciais
Limpar cache do navegador
Revisar regras de Firestore
Checar permissões de usuário

🔗 Links Úteis

Documentação Firebase Hosting
Guia Firebase React
