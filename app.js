const express = require("express");
const userRouter = require("./routes/user");
const showRouter = require("./routes/show");

const app = express();
const port = 3000;

app.use("/users", userRouter);
app.use("/shows", showRouter);

// starting server
app.listen(port, () => {
  console.log(`server started: http://localhost:${port}`);
});

module.exports = app;
