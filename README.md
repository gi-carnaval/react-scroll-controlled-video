# 🎥 Scroll-Controlled Video Segments with React

Este projeto tenta recriar uma experiência interativa onde vídeos avançam conforme o usuário rola a página — inspirado nas páginas de produtos da Apple e DJI. Cada vídeo é exibido e reproduzido proporcionalmente ao progresso do scroll, criando uma apresentação fluida e imersiva.

---

## 🚀 Demonstração

<img src="./react-scroll-controlled-video-demo.gif"/>

---

## 🧰 Tecnologias

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)

---

## 📦 Funcionalidade

O comportamento é dividido em segmentos de scroll que controlam individualmente vídeos distintos:

- Cada **segmento** representa uma porcentagem da rolagem da tela.
- O vídeo correspondente ao segmento visível é exibido com `opacity: 1`.
- O `currentTime` do vídeo é calculado dinamicamente com base no progresso do scroll.

---

## 🧪 Como usar

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
npm install
npm run dev