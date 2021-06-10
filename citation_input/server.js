const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.json());

const uri =
  "mongodb+srv://andrew:andrew123@citation.ragwb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/", function (request, response) {
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

app.listen(8080, () => {
  console.log("APP LISTENING AT 8080");
});

// client.close();
