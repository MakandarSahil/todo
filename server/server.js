  const express = require("express");
  const dotenv = require("dotenv");
  const cors = require("cors");
  const ConnectDB = require("./config/db");
  const userRoutes = require("./routes/user.routes");
  const { extend } = require("joi");
  const app = express();
  dotenv.config();
  const port =
    process.env.PORT1 || process.env.PORT2 || process.env.PORT3 || 4000;

  //middlewares
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/user", userRoutes);

  function serverStart() {
    Promise.all([ConnectDB()])
      .then(() => {
        app.on("error", (err) => {
          throw err;
        });
        app.listen(port, () => {
          console.log(`server started at http://localhost:${port}`);
        });

        app.get("/", (req, res) => {
          res.send("Yare Yare..! Yokoso watashino Servar des");
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }

  serverStart();
