# Messages & Dispatch API Certification Project

This repo contains the code for the Messages & Dispatch API Certification

## Prerequisites

* Create a Vonage Application with Messages enabled
* Link a Facebook Account with the application 

## Running the app

First clone the repo and install dependencies:

```
git clone https://github.com/nuxero/messages-dispatch-certification.git
cd messages-dispatch-certification
npm install
```

Next, copy env.example to .env and enter your information

* `NEXMO_API_KEY`: Your nexmo API key
* `NEXMO_API_SECRET`: Your nexmo API secret
* `NEXMO_APPLICATION_ID`: The ID of the application
* `NEXMO_APPLICATION_PRIVATE_KEY_PATH`: The location of the private key for the application
* `FB_SENDER_ID`: The id of the facebook account linked to the application
* `FB_RECIPIENT_ID`: The id of the facebook account you want to send messages to
* `FROM_NUMBER`: A nexmo LVN
* `TO_NUMBER`: A phone number you own

Start the application by running `npm start`

Start ngrok to make the webhooks available publicly by running `ngrok http 3000`

Update the application webhooks with the url provided by ngrok.

To trigger the message, send a POST request to `webhooks/send` as follows

```
curl -X POST -H "Content-Type: application/json" \
 -d '{"message":"Your package is ready"}' \
 http://localhost:3000/webhooks/send
```

Don't open the SMS and wait 180 seconds for the Facebook message to arrive.
