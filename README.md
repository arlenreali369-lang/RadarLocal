# Radar Local - Comércio de Bairro & Prestadores de Serviços

> Plataforma completa de comércio local, prestadores de serviços, notificações instantâneas e fidelidade gamificada para cidades e bairros. Desenvolvido inicialmente para **João Neiva - ES**.

---

## 🚀 Funcionalidades Principais

- **🔔 Notificações Instantâneas no Cadastro**:
  - Assim que o cliente se cadastra informando nome, WhatsApp e bairro, recebe automaticamente notificações e cupons de boas-vindas de lojas locais e prestadores de serviços (eletricista, lava-jato, barbearia, informática, padarias e pizzarias).
  - Central de Notificações com filtro rápido por tipo (Todas, Comércio, Prestadores de Serviço) e contato direto com 1 clique no WhatsApp.
  - Simulador de notificações em tempo real para testes e demonstrações.

- **🛍️ Vitrine de Comércios e Prestadores de Serviços**:
  - Listagem com fotos, horários de funcionamento, bairros atendidos, valores médios e botão direto para WhatsApp ou pedidos.
  - Categorias: Restaurantes, Farmácias, Mercados, Construção, Serviços Residenciais, Automotivos, Beleza e Tecnologia.

- **🪙 Fidelidade & Gamificação (RadarCoins)**:
  - Sistema de pontos automáticos por compra/contratação.
  - Multiplicadores de pontos para lojas parceiras e resgate de recompensas.

- **🛵 Logística e Gestão de Entregas**:
  - Cálculo de frete dinâmico por bairro de João Neiva (Centro, Vila Nova, Cohab, Floresta, Triângulo, Zona Rural).
  - Suporte a frota própria do lojista ou rede compartilhada de motoboys.

- **📱 PWA (Progressive Web App)**:
  - Funciona como site responsivo e pode ser instalado no celular (Android/iOS) como aplicativo nativo, sem necessidade obrigatória de loja de aplicativos.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** (Build tool ultrarrápido)
- **Tailwind CSS** (Design moderno e responsivo)
- **Lucide React** (Ícones modernos)
- **Canvas Confetti & Web Audio API** (Feedback tátil e sonoro de notificações)
- **Web App Manifest & Service Worker** (Compatível com PWA)

---

## 💻 Como Rodar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/radar-local.git
   cd radar-local
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000` (ou a porta exibida no terminal).

4. **Gerar build de produção:**
   ```bash
   npm run build
   ```

---

## 🌐 Como Publicar no GitHub

Siga os passos abaixo para enviar este projeto para o seu GitHub:

1. No seu GitHub ([github.com/new](https://github.com/new)), crie um novo repositório chamado `radar-local` (deixe desmarcada a opção de inicializar com README).
2. No seu terminal, dentro da pasta do projeto, execute:
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/radar-local.git
   git push -u origin main
   ```
   *(Substitua `SEU_USUARIO` pelo seu usuário do GitHub)*

---

## 🚀 Onde Hospedar (Gratuito ou Próprio)

- **Vercel / Netlify**: Conecte diretamente seu repositório do GitHub com 1 clique (deploy automático a cada `git push`).
- **Domínio Próprio**: Nas configurações da Vercel/Netlify, basta adicionar seu domínio personalizado (ex: `radarlocal.com.br` ou `joaoneiva.app`).
