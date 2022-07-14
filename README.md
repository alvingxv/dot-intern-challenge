# Challenge Magang DOT Indonesia x Kampus Merdeka
## Challenge Backend Engineer (Node.js) by Alvian Ghifari
### API LINK: https://dot-intern-challenge.azurewebsites.net/

### Endpoints:

``` json
{
  "endpoint": [
    {
      "method": "POST",
      "path": "/register",
      "description": "Register a new user"
    },
    {
      "method": "POST",
      "path": "/login",
      "description": "Login a user"
    },
    {
      "method": "GET",
      "path": "/task",
      "description": "Get all tasks"
    },
    {
      "method": "GET",
      "path": "/task/:id",
      "description": "Get a task by id"
    },
    {
      "method": "POST",
      "path": "/task",
      "description": "Create a new task"
    },
    {
      "method": "PUT",
      "path": "/task/:id",
      "description": "Update a task"
    },
    {
      "method": "DELETE",
      "path": "/task/:id",
      "description": "Delete a task"
    }
  ]
}

```


## Pattern Project
Disini saya memisahkan routes controllers dan model, dimana yang terinspirasi dari MVC. 

Pada folder routes terdapat dua file yang terdapat index.js untuk router public, dan user.js untuk router user yang telah login (protected)

Disini saya memisahkan antara routes dengan controller agar kode dapat lebih mudah dibaca.