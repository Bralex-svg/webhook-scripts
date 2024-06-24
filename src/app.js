const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const webhookSiteURL =
  "https://webhook.site/19a88a6c-7b96-476f-937c-57d97995eb9d";
const specificGroupId = "120363178722260639@g.us";

app.post("/webhook", (req, res) => {
  const payload = req.body;

  if (payload.messages && Array.isArray(payload.messages)) {
    payload.messages.forEach((message) => {
      const chatId = message.chat_id;
      if (chatId === specificGroupId) {
        console.log("Received a message from the specific group:", message);

        axios
          .post(webhookSiteURL, message)
          .then((response) => {
            console.log("Message forwarded to webhook.site:", response.data);
          })
          .catch((error) => {
            console.error("Error forwarding message to webhook.site:", error);
          });
      } else {
        console.log(
          "Received a message from a different group, ignoring:",
          message
        );
      }
    });
  } else {
    console.log("No messages found in the payload:", payload);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// https://e206-197-251-240-245.ngrok-free.app/webhook
// https://webhook-scripts.onrender.com/webhook
