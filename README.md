# Labeddit-backend
![Labeddit](./assets/labeddit.postman.png)
Building an API for a message posting app where you can post and comment on other posts and click on like or dislike.
<br><br>
For users, the API allows you to register a new user through signup and log in after registration. And if you are an administrator, you will be able to view all registered users, with the exception of passwords that are protected.
<br><br>
For posts, the API allows you to add a new post, in addition to being able to edit or delete your post, and being able to click like or dislike on other posts
<br><br>
For comments, the API allows you to add a new comment on a post, in addition to being able to edit or delete your comment, and being able to click on like or dislike on other comments.

## Índice
- <a href="#-Layout">Layout</a>
- <a href="#-Requests">Requests (Paths)</a>
- <a href="#-Example-of-Requests">Example of Requests</a>
- <a href="#-How-to-run-this-project">How to run this project</a>
- <a href="#-Business-tests-in-jest">Business-tests in jest </a>
- <a href="#-Technologies-used">Technologies used</a>
- <a href="#-Documentation">Documentation</a>
- <a href="#-Developer">Developer</a>

## 📸Layout
- Folder structure

![folder-structure](./assets/menu.VSCODE.png)

### Users Requests
- /users
### User Requests Signup
- /users/signup
### User Requests Login
- /users/login
### Posts Requests
- /posts
### Posts by id
- /posts/:id
### Comments Requests
- /comments
### Comments by id
- /comments/:id
### like or deslike
- /likes/:id

## Example of Requests

### GET/users
- returns all users
```
[
  {
    "id": "u002",
    "name": "Bruno",
    "email": "bruno@email.com",
    "role": "ADMIN",
    "createdAt": "2023-09-07 21:33:47"
  },
  {
    "id": "13d3b96f-badb-48ba-b21d-8dff2b3f1de4",
    "name": "Danielle",
    "email": "danielle123@email.com",
    "role": "NORMAL",
    "createdAt": "2023-09-29T22:19:26.676Z"
  },
  {
    "id": "32d21486-b1e4-40f4-8b58-826479775c12",
    "name": "Heitor",
    "email": "heitor123@email.com",
    "role": "NORMAL",
    "createdAt": "2023-09-29T22:21:07.107Z"
  },
  {
    "id": "1f48c459-2229-4f16-87d2-4c4048d3cff2",
    "name": "Arthur",
    "email": "arthur123@email.com",
    "role": "NORMAL",
    "createdAt": "2023-10-01T18:53:52.442Z"
  }
]
```
### POST/Signup

- body:
```
{
    "name":"Tania",
	"email": "tania@email.com",
	"password": "Tania123@"
}
```
- return:
```
{
  "message": "Registration done successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmNDhjNDU5LTIyMjktNGYxNi04N2QyLTRjNDA0OGQzY2ZmMiIsIm5hbWUiOiJBcnRodXIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk2MTg2NDMyLCJleHAiOjE2OTY3OTEyMzJ9.ZDLbnuPycXQbpe904lNya0BAEjRVaBWBVSrcpwD3_0s"
}
```
### POST/Login

- body:
```
{
	"email": "tania@email.com",
	"password": "Tania123@"
}
```
- return:
```
{
    "message": "Login successful!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmNDhjNDU5LTIyMjktNGYxNi04N2QyLTRjNDA0OGQzY2ZmMiIsIm5hbWUiOiJBcnRodXIiLCJyb2xlIjoiTk9STUFMIiwiaWF0IjoxNjk2MTg2NDMyLCJleHAiOjE2OTY3OTEyMzJ9.ZDLbnuPycXQbpe904lNya0BAEjRVaBWBVSrcpwD3_0s"
}
```
### GET/posts

- insert token in authorization in header

![authorization](./assets/authorization.png)

- return all posts
```
[
    {
        "id": "4626361b-a67b-472a-9b6e-0009bf6ccec4",
        "content": "Fala galera, quem diria que ia ver o Bruno aprendendo alguma coisa de programção.kkkk",
        "likes": 0,
        "dislikes": 0,
        "comments": 1,
        "updatedAt": "2023-09-29T22:20:09.276Z",
        "creator": {
            "id": "13d3b96f-badb-48ba-b21d-8dff2b3f1de4",
            "name": "Danielle"
        },
        "liked": "no"
    },
    {
        "id": "p002",
        "content": "Fala galera, quem diria que ia comprender um pouco de programação!Estou aprandendo cada dia mais!",
        "likes": 0,
        "dislikes": 0,
        "comments": 0,
        "updatedAt": "2023-09-15 19:02:17",
        "creator": {
            "id": "u002",
            "name": "Bruno"
        },
        "liked": "no"
    }
]
```
### POST/post

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{   
	"content": "Finalizando o Backend do projeto integrador!"	
}
```
- retunr:
```
{
    "id": "eb0d544c-264e-4a8c-8d28-cbde7b60baa8",
    "creator_id": "u002",
    "content": "Finalizando o Backend do projeto integrador!",
    "likes": 0,
    "dislikes": 0,
    "comments": 0,
    "created_at": "2023-10-01T19:11:59.660Z",
    "updated_at": "2023-10-01T19:11:59.660Z"
}
```
### PUT/post

- insert postId in query

![PostId](./assets/IdPost.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{
    "content":"first updated post"
}
```
- return:
```
update made
```
### DELETE/post
- insert postId in query

![PostId](./assets/IdPost.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- return:
```
deleted
```
### GET/comments
- insert postId in query

![PostId](./assets/IdPost.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- return all posts
```
[
    {
        "id": "7db2a2ed-ac60-438e-91b6-f2bd33dfca06",
        "postId": "4626361b-a67b-472a-9b6e-0009bf6ccec4",
        "content": "Eu vive para ver o Bruno aprendendo alguma coisa de programção.kkkk",
        "likes": 1,
        "dislikes": 0,
        "creator": {
            "id": "32d21486-b1e4-40f4-8b58-826479775c12",
            "name": "Heitor"
        },
        "liked": "no"
    },
    {
        "id": "0f24ebe8-5abf-44cb-ae29-e809c15d1b84",
        "postId": "4626361b-a67b-472a-9b6e-0009bf6ccec4",
        "content": "Realmente parece mentira mais é verdade estou aprendendo e me formando!",
        "likes": 0,
        "dislikes": 0,
        "creator": {
            "id": "u002",
            "name": "Bruno"
        },
        "liked": "no"
    }
]
```
### POST/comment

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{
	"postId": "4626361b-a67b-472a-9b6e-0009bf6ccec4",
    "content":"Realmente parece mentira mais é verdade estou aprendendo e me formando!"
}
```
- retunr:
```
comment created
```
### PUT/comment

- insert commentId in query

![CommentId](./assets/IdComment.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{
    "content":"update comment at post"
}
```
- return:
```
update made
```
### DELETE/comment
- insert postId in query

![CommentId](./assets/IdComment.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- return:
```
comment deleted
```
### PUT/like or deslike/post

- insert postId in query

![PostId](./assets/IdPost.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{
	"like": true,//or false
    "action":"posts"
}
```
- return:
```
ok
```
### PUT/like or deslike/comment

- insert postId in query

![CommentId](./assets/IdComment.png)

- insert token in authorization in header

![authorization](./assets/authorization.png)

- body:
```
{
	"like": true,//or false
    "action":"comments"
}
```
- return:
```
ok
```
## 💻 How to run this project
- If you want to download and install this project on your computer, you need to have git and node installed.
### Links: 
✅[Node](https://nodejs.org/en)
<br><br>
✅[Git](https://git-scm.com/)
- After installation, follow the steps below:
```bash
# Copy the link below

https://github.com/BrunoNMoura/labook-backend

# Open a terminal and type the following command

git clone (paste the url here)

# access the created page

cd labook-backend

# install the dependencies

npm install
or
yarn install

# Executing the Project

npm run start
or 
yarn start
```

## 🛠 Business-tests in jest
![BusinessTests](./assets/tests.png)

## 🛠 Technologies used
✅[Node.js](https://nodejs.org/en)
<br>
✅[TypeScript](https://www.typescriptlang.org/)
<br>
✅[Express](https://expressjs.com/pt-br/)
<br>
✅[SQL](https://learn.microsoft.com/pt-br/sql/?view=sql-server-ver16)
<br>
✅[SQLite](https://www.sqlite.org/docs.html)
<br>
✅[Knex.js](https://knexjs.org/guide/)
<br>
✅[ZOD](https://www.npmjs.com/package/zod)
<br>
✅[UUID Generator](https://www.uuidgenerator.net/)
<br>
✅[JWT](https://jwt.io/)
<br>
✅[AWS](https://aws.amazon.com/pt/?nc2=h_lg)



## 📚 Documentation
[View Postman-Labeddit-Backend](https://documenter.getpostman.com/view/26570541/2s9YJdV2PL)

## 💻 Front-end
[Front-end repository link](https://github.com/BrunoNMoura/Labeddit-frontend)

## 🏆 Developer
![BrunoMoura](./assets/Bruno.jpg)
<br>
Bruno Nascimento Moura
<br>
[Linkedin](https://www.linkedin.com/in/bruno-moura-dev/)