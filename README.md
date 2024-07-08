# Instruções de como executar a aplicação
## Pré-requisitos e Clonagem de repositório
- Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema.
### 1 - Clonando Repositório
```
git clone https://github.com/deneruaraujo/betzone.git
```
### 2 - Instalando Dependências
- Na pasta front-end, utilize o seguinte comando:
```
npm i
```
- Na pasta front-end, utilize o mesmo comando:
```
npm i
```
### 3 - Configurando Prisma e Docker
- Na pasta back-end, crie uma pasta com o nome **data**
- Na pasta back-end, utilize o comando ```docker-compose up -d``` para criar o container (certifique-se de ter o docker instalado e certifique-se de que o container está rodando)
- Na pasta back-end utilize o comando ```npx prisma migrate dev``` (dê enter quando pedir um nome para a nova migração)
### 4 - Executando back-end e front-end
- Para executar o back-end, utilize o comando: ```npm run start``` (obs: utiliza a porta: 3001)
- Para executar o front-end, utilize o comando: ```npm run dev```
### 5 - Acessando a aplicação
- Acesse: http://localhost:3000/
### 6 - Testes (é necessário estar na pasta back-end para realizar os testes)
- Comando para Testes Unitários: ```npm run test```
- Comando para Testes E2E: ```npm run test:e2e``` (certifique-se de que o container no docker está rodando)
# Tecnologias, bibliotecas e frameworks utilizados
## Projeto em: TypeScript
### Front-end
- HTML
- CSS
- React
- Next.js (v14.2.4)
- Tailwind
- Date-fns
 ### Back-end
- Node.js (v18.17.0)
- NestJS
- Vitest
- Supertest
- PostgreSQL
- Docker
- Prisma
# Informações adicionais
O back-end deste projeto foi construído com base no DDD(Domain Driven Design), então a primeira coisa que fiz foi esclarecer seus Requisitos Funcionais, Requisitos não Funcionais e Regras de negócio, para assim ter objetivos claros (todos estão no README.me dentro do back-end).
A estrutura de pastas é algo que eu gosto muito e faço a um bom tempo. No diretório raiz temos 3 pastas principais: prisma, src e test. Vou explicar cada uma.
### Prisma
Aqui é onde ficam as migrations do prisma e o schema.
### Test
Aqui ficam os utils usados nos testes, como por exemplo factories e repositórios em memória.
### Src
Essa é a pasta mais importante, ela contém o arquivo main e está dividida entre 3 pastas: Core, Domain e Infra.
#### Core
Aqui é onde ficam utilitários core do projeto, como classe base para criação de entidades, enums, interface e classe base de erros, types, etc.
#### Domain
Dentro da pasta domain nós temos a pasta main que contém tudo que é relacionado diretamente aos casos de uso. Neste projeto por exemplos temos repositórios, os próprios casos de uso e entidades.
#### Infra
Dentro da Infra nós temos tudo que é ligado a banco de dados, controllers e requisições HTTP, como: mappers, repositórios, controllers, pipes, presenters, etc.

Obs: Existem mais subpastas dentro do que foi explicado, mas ficaria muito longo pra explicar tudo.
