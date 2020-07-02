require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.json());
const {PORT, SESSION_SECRET} = process.env;
const datactrl = require('./datactrl')

app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10
      },
    })
  );

  app.get('/', datactrl.hitApi );
  app.get('/api/session', datactrl.getSession);
  app.post("/api/register", datactrl.register);
  app.post("/api/login", datactrl.login);

app.listen(PORT, () => console.log(`Pikachu use Thunderbolt on PORT ${PORT} to wake all the Navy!`));