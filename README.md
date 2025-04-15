# Areal Bomba Diesel - App Mobile

Aplicativo móvel para gerenciamento de serviços da Areal Bomba Diesel.

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)

## 📱 Funcionalidades

- **Autenticação**
  - Login
  - Registro
  - Recuperação de senha
  - Alteração de senha

- **Perfil**
  - Visualização de dados do usuário
  - Edição de perfil
  - Foto de perfil

- **Configurações**
  - Termos de Uso
  - Política de Privacidade
  - Alteração de senha
  - Logout

## 🎨 Design System

O aplicativo utiliza um design system consistente com:

- **Componentes**
  - Avatar
  - Button
  - Card
  - Container
  - Input
  - MenuItem

- **Feedback Visual**
  - Loading states
  - Toast messages (sucesso, erro, info)
  - Validação de formulários

## 📁 Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── common/        # Componentes base
│   └── FeedbackProvider.js
├── contexts/          # Contextos React
│   ├── AuthContext.js
│   └── ThemeContext.js
├── pages/            # Páginas da aplicação
│   ├── auth/         # Páginas de autenticação
│   └── setting/      # Páginas de configuração
├── routes/           # Configuração de navegação
├── services/         # Serviços e APIs
├── styles/           # Estilos e temas
└── utils/            # Funções utilitárias
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/henriquemalvar/areal-bomba-diesel.mobile.git
```

2. Instale as dependências:
```bash
cd areal-bomba-diesel.mobile
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações

4. Inicie o projeto:
```bash
npm start
```

## 📱 Executando no Dispositivo

1. Instale o app Expo Go no seu dispositivo
2. Escaneie o QR Code gerado no terminal
3. Ou execute em um emulador:
   - Android: `npm run android`
   - iOS: `npm run ios`

## 📦 Gerando APK Local

Para gerar um APK localmente, siga os passos:

1. Certifique-se de ter o Android Studio instalado e configurado
2. Execute um dos seguintes comandos:
   - Para build de preview: `npm run build:android:local`
   - Para build de produção: `npm run build:android:release:local`

O APK será gerado na pasta `android/app/build/outputs/apk/release/`

### Requisitos para Build Local

- Android Studio instalado
- Android SDK configurado
- Variáveis de ambiente ANDROID_HOME e JAVA_HOME configuradas
- Gradle configurado

## 🛠️ Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Configuração do Ambiente

1. **Node.js e npm**
```bash
# Verifique a versão do Node.js
node -v

# Verifique a versão do npm
npm -v
```

2. **Expo CLI**
```bash
npm install -g expo-cli
```

3. **Android Studio**
- Instale o Android Studio
- Configure o emulador Android
- Adicione o caminho do Android SDK às variáveis de ambiente

4. **Xcode** (apenas para macOS)
- Instale o Xcode
- Configure o simulador iOS

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `API_URL`: URL da API
- `EXPO_PUBLIC_API_URL`: URL pública da API
- `AUTH_TOKEN_KEY`: Chave para armazenamento do token
- `AUTH_USER_KEY`: Chave para armazenamento do usuário
- `NODE_ENV`: Ambiente de execução
- `DEBUG`: Modo de debug
- `EXPO_PUBLIC_APP_NAME`: Nome do aplicativo
- `EXPO_PUBLIC_APP_VERSION`: Versão do aplicativo

## 🔍 Troubleshooting

### Problemas Comuns

1. **Erro de Porta em Uso**
```bash
# Encontre o processo usando a porta
lsof -i :8081

# Mate o processo
kill -9 <PID>
```

2. **Erro de Cache**
```bash
# Limpe o cache do Metro
npm start -- --reset-cache
```

3. **Erro de Dependências**
```bash
# Remova node_modules e reinstale
rm -rf node_modules
npm install
```

4. **Erro de Build**
```bash
# Limpe o cache do Expo
expo start -c
```

## 🤝 Contribuindo

1. Crie uma branch a partir de `dev`:
```bash
git checkout -b feature/nome-da-feature
```

2. Faça suas alterações e commit:
```bash
git add .
git commit -m "feat: descrição da feature"
```

3. Push para o repositório:
```bash
git push origin feature/nome-da-feature
```

4. Abra um Pull Request para a branch `dev`

## 📝 Convenções

- **Commits**: Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat`: Nova funcionalidade
  - `fix`: Correção de bug
  - `docs`: Documentação
  - `style`: Formatação
  - `refactor`: Refatoração
  - `test`: Testes
  - `chore`: Manutenção

- **Código**:
  - ESLint para padronização
  - Prettier para formatação
  - TypeScript para tipagem

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Henrique Malvar - [@henriquemalvar](https://github.com/henriquemalvar) 