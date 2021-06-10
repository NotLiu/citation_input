const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.json());

// Serve static files from the React app FOR BUILD
app.use(express.static(path.join(__dirname, "/build")));

const PORT = process.env.PORT || 3000;

const uri =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASS +
  "@citation.ragwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/questions", function (request, response) {
  const entry = {
    type: request.body.type,
    questionText: request.body.question,
    option1: request.body.option1,
    option2: request.body.option2,
    opt1ChooseCount: 0,
    opt2ChooseCount: 0,
  };
  console.log(request.body);
  client.connect((err) => {
    const collection = client.db("Content").collection("Questions");
    // perform actions on the collection object
    console.log("CONNECTED TO DB");

    collection.insertOne(entry);

    response.status(200).send(
      JSON.stringify({
        action: "INSERT",
        schema: entry,
      })
    );
  });
});

//for build
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(PORT, () => {
  console.log("APP LISTENING AT " + PORT);
});

// client.close();
