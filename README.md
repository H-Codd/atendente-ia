# Atendente IA

Este projeto é um protótipo de integração entre um frontend em React/Next.js e um backend em Python com FastAPI. A ideia é demonstrar, de forma simples e visual, como criar uma aplicação que recebe dados do usuário, processa informações no backend e exibe respostas e sugestões no painel.

## O que é este projeto?

O Atendente IA é uma aplicação experimental para simular um atendimento inteligente, com:

- interface em React/Next.js
- backend em Python/FastAPI
- autenticação básica de usuários
- formulário de perguntas com recomendação de curso
- painel com usuários, estatísticas e sugestões

Este é um protótipo, então o foco está em mostrar a comunicação entre frontend e backend, e não em uma solução completa de produção.

## Tecnologias utilizadas

- Frontend: React, Next.js, TypeScript
- Backend: Python, FastAPI
- Estilização: Tailwind CSS
- Integração: API REST

## Como foi criado

Este projeto foi desenvolvido como um exemplo de protótipo de ligação entre backend Python e frontend React, com auxílio de inteligência artificial para acelerar a criação de estrutura, componentes, rotas e integração entre as partes.

## Endpoints do backend

O backend expõe os seguintes endpoints:

### Usuários
- GET /users: lista os usuários cadastrados
- POST /users: cria um usuário manualmente

### Autenticação
- POST /auth/register: cadastro de novo usuário
- POST /auth/login: login do usuário

### Questionário
- POST /question: recebe as respostas do formulário e gera uma sugestão

### Recomendações
- POST /courses/recommend: retorna uma recomendação de curso com base nas respostas

## Execução local

### Backend

Entre na pasta backend e rode:

```bash
uvicorn backend.src.main:app --reload
```

O backend ficará disponível em:

```text
http://localhost:8000
```

### Frontend

Na raiz do projeto, rode:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:3000
```

## Observações

- Este projeto é um protótipo de ligação entre backend Python e React.
- A persistência atual é simples e voltada para demonstração.
- A criação foi auxiliada por IA, o que ajudou a acelerar o desenvolvimento da estrutura e da integração.
