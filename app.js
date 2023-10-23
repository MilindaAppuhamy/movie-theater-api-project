const express = require("express");

const app = express();
const port = 3000;

// starting server
app.listen(port, () => {
  console.log(`server started: http://localhost:${port}`);
});

module.exports = app;
