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