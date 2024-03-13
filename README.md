# Shopping List
Gerenciador de listas de compras baseado em nodeJS e Fastify no back-end e ReactJS com Vite no front-end.

![image](https://github.com/VictorGM01/engvictor/assets/86068797/760acca4-ea05-46b4-854d-ce9c969a47ef)


<p align="center">
 <a href="#descrição-do-projeto-">Descrição</a> •
 <a href="#estrutura-de-pastas-%EF%B8%8F">Pastas</a> •
 <a href="#funcionalidades-%EF%B8%8F">Funcionalidades</a> •
 <a href="#status-do-projeto-">Status</a> •
 <a href="#como-rodar-a-aplicação-%EF%B8%8F">Como Rodar</a> •
 <a href="#desenvolvedor-octocat">Desenvolvedor</a>
</p>

## Descrição do Projeto 📋
Este projeto é um gerenciador de Listas de Desejos e Compras. O objetivo é criar um aplicativo que permita ao usuário criar listas de compras e desejos, adicionar produtos a essas listas, marcar produtos como comprados e compartilhar listas com outras pessoas.

Atualmente, é possível criar usuários, fazer login com método de autenticação JWT, criar listas de compras, adicionar cor a essas listas, adicionar produtos a essas listas, cadastrar produtos e visualizar as listas e seus respectivos produtos.

O deploy foi realizado na ``AWS``, utilizando o serviço de ``EC2`` para as imagens do Docker tanto do front-end quanto do back-end e o serviço de ``RDS`` para o banco de dados. O vídeo do deploy pode ser acessado [aqui](https://drive.google.com/file/d/1MjMSqb3zGzSL97Nqh5EdlnA35YOZj_u2/view?usp=sharing). 

> Recomendo que o vídeo seja assistido em qualidade 1080p. O google drive inicialmente exibe o vídeo em baixa resolução, mas é possível alterar a qualidade clicando no ícone de configurações no canto inferior direito do vídeo.

## Estrutura de Pastas 🗂️
```
src/
└── frontend/
    └── public/
    └── src/
        └── assets/
        └── components/
        └── contexts/
        └── pages/
└── backend/
    └── controllers/
    └── database/
        └── config/
        └── migrations/
        └── models/
    └── routes/
    └── services/
```

Na pasta `frontend` estão os arquivos do front-end da aplicação. A pasta `public` contém os arquivos estáticos, como imagens e ícones. A pasta `src` contém os arquivos de código e, nesse sentido, a pasta `assets` contém os arquivos de imagens e ícones utilizados. A pasta `components` contém os componentes comuns de todo o portfólio.  A pasta `pages` é autoexplicativa.  A pasta `contexts` contém os contextos utilizados na aplicação, como o contexto de autenticação - responsável por gerenciar o estado de autenticação do usuário.

Na pasta `backend` estão os arquivos do back-end da aplicação. A pasta `controllers` contém os controladores da aplicação. A pasta `database` contém os arquivos de configuração do banco de dados, as migrações e os modelos. A pasta `routes` contém os arquivos de rotas da aplicação. A pasta `services` contém os serviços da aplicação, como o serviço de autenticação.

Além disso, em ambas as pastas, há os arquivos de criação da imagem do Docker, `Dockerfile`, e o arquivo de *ignore* do Docker, `.dockerignore`.

## Funcionalidades ⚙️
- [x] Cadastro de Usuário
- [x] Login de Usuário
- [x] Criação de Lista de Compras
- [x] Listagem de todas as Listas de Compras
- [x] Listagem de uma Lista de Compras
- [x] Adição de Produto a uma Lista de Compras
- [x] Criação de Produto
- [x] Listagem de todos os Produtos
- [x] Listagem de um Produto
- [x] Deleção de Produto

## Status do Projeto 🔔

🚧  Em construção...  🚧

## Como rodar a aplicação ▶️

```bash
# Clone este repositório
$ git clone https://github.com/VictorGM01/shopping_list.git

# Acesse a pasta do backend no terminal
$ cd shopping_list/src/backend

# Builde a imagem do Docker
$ docker build -t shopping_list .

# Crie um arquivo .env com as variáveis de ambiente (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET)

# Rode o container
$ docker run -p 3000:3000 --env-file ./.env shopping_list

# Acesse a pasta do frontend no terminal
$ cd shopping_list/src/frontend

# Builde a imagem do Docker
$ docker build -t shopping_list_frontend .

# Rode o container
$ docker run -p 3001:3001 shopping_list_frontend

# O servidor inciará na porta:3000 - acesse http://localhost:3000
# O frontend inciará na porta:3001 - acesse http://localhost:3001
```

## Desenvolvedor :octocat:
[<img src="https://avatars.githubusercontent.com/u/86068797?s=400&u=043c0b1479770ac997f0cf5a31c986a2815ce810&v=4" width=100><br><sub> <strong>Victor G. Marques</strong> </sub>](https://github.com/VictorGM01)

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/victor-gabriel-marques/)](https://www.linkedin.com/in/victor-gabriel-marques/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-red?style=flat-square&logo=Gmail&logoColor=white&link=https://www.linkedin.com/in/victor-marques-profile)](mailto:victor@engvictor.com.br)

---

<p align="center">&copy; 2024 Victor G. Marques | engvictor. Alguns direitos reservados.</p>