# Instructions on How to Run the Application
## Prerequisites and Cloning the Repository
- Make sure you have Docker and Docker Compose installed on your system.
### 1 - Cloning the Repository
```
git clone https://github.com/deneruaraujo/betzone.git
```
### 2 - Installing Dependencies
- In the front-end folder, use the following command:
```
npm i
```
- In the back-end folder, use the same command:
```
npm i
```
### 3 - Setting Up Prisma and Docker
- In the back-end folder, create a folder named **data**
- In the back-end folder, use the command ```docker-compose up -d``` to create the container (make sure Docker is installed and the container is running).
- In the back-end folder, use the command ```npx prisma migrate dev``` (press Enter when asked for a name for the new migration).
### 4 - Running Back-end and Front-end
- To run the back-end, use the command: ```npm run start``` (Note: it runs on port 3001).
- To run the front-end, use the command: ```npm run dev```
### 5 - Accessing the Application
- Access: http://localhost:3000/
### 6 - Tests (you need to be in the back-end folder to run the tests)
- Command for Unit Tests: ```npm run test```
- Command for E2E Tests: ```npm run test:e2e``` (make sure the Docker container is running).
# Technologies, Libraries, and Frameworks Used
## Project in: TypeScript
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
# Additional Information
The back-end of this project was built based on DDD (Domain Driven Design). The first thing I did was clarify its Functional Requirements, Non-Functional Requirements, and Business Rules, to have clear objectives (all of these can be found in the README.md file inside the back-end folder). The folder structure is something I value highly and have used for a long time. In the root directory, we have 3 main folders: prisma, src, and test. I will explain each one.
### Prisma
This is where the Prisma migrations and schema are located.
### Test
This is where the utils used for testing are, such as factories and in-memory repositories.
### Src
This is the most important folder, containing the main file and divided into 3 subfolders: Core, Domain, and Infra.
#### Core
This is where the core utilities of the project are, such as the base class for creating entities, enums, interface and base class for errors, types, etc.
#### Domain
Inside the domain folder, we have the main folder, which contains everything directly related to use cases. In this project, for example, we have repositories, the use cases themselves, and entities.
#### Infra
Inside the Infra folder, we have everything related to the database, controllers, and HTTP requests, such as: mappers, repositories, controllers, pipes, presenters, etc.
# Endpoints
## Create an Activity
### [POST] /activities
Expects to receive an object with the following fields:
```
{
    name: '',
    description: '',
    status: 'ACTIVE',
    category: ''
}
```
## Get an Activity
### [GET] /activities/:id
Returns an activity based on the provided id.
## Fetch All Activities
### [GET] /activities
Returns all activities, paginated at 20 activities per page.
## Update an Activity
### [PUT] /activities/:id
Updates an activity by id. You can provide any or all of the following fields:
```
{
    name: '',
    description: '',
    status: 'ACTIVE',
    category: ''
}
```
or just
```
{
    description: ''
}
```
## Delete an Activity
### [DELETE] /activities/:id
Deletes an activity based on the provided id.
