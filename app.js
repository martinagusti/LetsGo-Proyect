const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userRoutes } = require("./src/routes/userRoutes");
const fileUpload = require("express-fileupload");
const { tripsRoutes } = require("./src/routes/tripsRoutes");
const { comentariesRoutes } = require("./src/routes/comentariesRoutes");
const { votesRoutes } = require("./src/routes/votesRoutes");
const { favouriteRoutes } = require("./src/routes/favouritesRoutes");
const { notificationsRoutes } = require("./src/routes/notificationsRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(fileUpload());
app.use(express.static("public"));

const { PORT } = process.env;

const port = PORT || 3000;

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/trips", tripsRoutes);
app.use("/api/v1/comentaries", comentariesRoutes);
app.use("/api/v1/votes", votesRoutes);
app.use("/api/v1/favourites", favouriteRoutes);
app.use("/api/v1/notifications", notificationsRoutes);

app.use((req, res) =>
  res.status(404).send({
    status: "error",
    message: "Not Found",
  })
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
