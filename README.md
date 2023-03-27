# Rick and Morty

O objetivo do projeto é mostrar personagens que fazem parte da série Rick and Morty, tendo basicamente duas páginas, uma home listando os personagens com suas principais informações e outra com informações detalhadas sobre o personagem selecionado

> ## Requerimentos
1. [Home](./requirements/home.md)
2. [Character](./requirements/character.md)

> ## Bibliotecas e ferramentas utilizadas:
* Typescript
* React.js
* Next.js
* GraphQL
* Apollo client
* Material UI
* Inversify
* Cypress
* Github actions
* CSS Modules
* Husky
* Eslint
* Lint staged

> ## Instalar e rodar o projeto localmente

### Clone o repositório localmente

```bash
git clone git@github.com:hanyelC/rick-and-morty.git
```

### Dependências globais
Você precisa ter duas principais dependências instaladas:
* [Nodejs LTS](https://nodejs.org/en)
* [yarn](https://yarnpkg.com/)

### Dependências locais
Então após baixar o repositório, não se esqueça de instalar as dependências locais do projeto:

```bash
yarn
```

### Rodar o projeto
Para rodar o projeto localmente, basta rodar o comando abaixo:

```bash
yarn dev
```

e acessar a url [`http://localhost:3000/`](http://localhost:3000/)

> ## Rodar os testes
Testes end-to-end
```bash
yarn test:e2e
```
Testes de componente

```bash
yarn test:component
```

Também é possível rodar os testes apenas no terminal, para isso use os comandos
* `yarn test:e2e:headless`
* `yarn test:component:headless`
