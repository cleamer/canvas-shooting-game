# Shooting Game (Toy Project 1)

It's a simple shooting game. You can get a score and save it.

When you hit an enemy you will get points. When a big enemy is hit, a small enemy appears. Enemies are getting faster.

<br>
<br>

# Index

- [Using...](#using-)
- [File Structure](#file-structure)
- [Screen Shots](#screen-shots)
- [TODO](#todo)

<br>
<br>

# Using ...

### Client

- VanillaJS
- Canvas API
- Fetch API
- Tailwindcss

### Server

- NodeJS(express)
- MySQL

<br>
<br>

# File structure

```
.
├── README.md
├── client
│   ├── index.html
│   └── src
│       ├── controller.js
│       ├── game.js
│       ├── index.js
│       └── model.js
├── img4README
└── server
    ├── app.js
    ├── config
    │   ├── express.js
    │   └── router.js
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── lib
    │   │   ├── dbSecret.js
    │   │   └── responseMessage.js
    │   ├── login
    │   │   ├── loginController.js
    │   │   ├── loginDao.js
    │   │   └── loginProvider.js
    │   └── scoreBoard
    │       ├── rankController.js
    │       ├── rankDao.js
    │       └── rankProvider.js
    └── test.rest
```

<br>
<br>

# Screen shots

**Start**
![Start](https://raw.githubusercontent.com/cloer-Choi/canvas-shooting-game/main/img4README/start.png)

**Play**
![Play](https://raw.githubusercontent.com/cloer-Choi/canvas-shooting-game/main/img4README/play.png)

**Game Over**
![Game Over](https://raw.githubusercontent.com/cloer-Choi/canvas-shooting-game/main/img4README/game-over.png)

**Login**
![Login](https://raw.githubusercontent.com/cloer-Choi/canvas-shooting-game/main/img4README/login.png)

**Score Board**
![Score Board](https://raw.githubusercontent.com/cloer-Choi/canvas-shooting-game/main/img4README/score-board.png)

<br>
<br>

# TODO

✅ modularize `client`  
⬜️ build `view` in MVC model using `react`
