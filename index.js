require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APPLICATION_ID,
  privateKey: process.env.NEXMO_APPLICATION_PRIVATE_KEY_PATH,
});

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhooks/inbound", (req, res) => {
  console.log("inbound:", req.body);
  res.sendStatus(200);
});

app.post("/webhooks/status", (req, res) => {
  console.log("status:", req.body);
  res.sendStatus(200);
});

app.post("/webhooks/send", (req, res) => {
  const body = req.body;
  console.log("sending message:", body);
  nexmo.channel.send(
    { type: "messenger", id: process.env.FB_RECIPIENT_ID },
    { type: "messenger", id: process.env.FB_SENDER_ID },
    {
      content: {
        type: "text",
        text: body.message,
      },
    },
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }
    }
  );
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
