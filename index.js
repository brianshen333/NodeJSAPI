const express = require("express");
const Datastore = require("nedb");
require("dotenv").config();

console.log(process.env);
console.log(process.env.API_KEY);
const app = express();
app.listen(3000, () => console.log("listening on port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get("/weather", async (request, response) => {
  const api_url = "";
  const fetch_response = await fetch(api_url);
  const json = await fetch_response().json();
  response.json(json);
});
