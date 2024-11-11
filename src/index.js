const jsforce = require("jsforce");

const username = "mburnside@dxdo2023.demo";
const password = "eB!kes1234";
const securityToken = "";

const conn = new jsforce.Connection();
conn.login(username, password + securityToken, function (err, res) {
  if (err) {
    return console.error(err);
  }

  console.log("Authenticated");

  const channel = "/event/ConsentEvent";
  const replayId = -2; // -2 is all retained events

  const replayExt = new jsforce.StreamingExtension.Replay(channel, replayId);

  const fayeClient = conn.streaming.createClient([replayExt]);

  const subscription = fayeClient.subscribe(channel, (data) => {
    console.log("Received Event", data);
  });
});
