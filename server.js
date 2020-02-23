const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
const users = [];

const askName = userID => {
  users[userID].connection.on("message", function setName(name) {
    users[userID]["name"] = name;
    users[userID].connection.send(JSON.stringify({ prompt: false, content: `Welcome, ${users[userID]["name"]}!`, hidden: false }));
    requestUserToConnectWith(userID);

    users[userID].connection.removeEventListener("message", setName);
  });

  users[userID].connection.send(JSON.stringify({ prompt: true, content: "What's your name?: ", hidden: false }));
}

const requestUserToConnectWith = userID => {
  users[userID].connection.on("message", function setConnectedWith(otherUserID) {
    if (otherUserID == "R")
      requestUserToConnectWith(userID);
    else {
      users[userID]["connectWith"] = otherUserID;
      waitForConnection(userID, otherUserID);
    }

    users[userID].connection.removeEventListener("message", setConnectedWith);
  });

  let connectedUsers = users.map((_, index) => {
    return `\n  ${index}. ${users[index]["name"]}`;
  });

  users[userID].connection.send(JSON.stringify({ prompt: true, content: `\nConnected Users:${connectedUsers.join("")}\n\nChoose a user to connect with (Refresh: R): `, hidden: false }));
}

const waitForConnection = (userID, otherUserID) => {
  const wait = setInterval(() => {
    if (users[otherUserID]["connectWith"] == userID) {
      connectUser(userID, otherUserID);
      clearInterval(wait);
    }
  }, 500);

  users[userID].connection.send(JSON.stringify({ prompt: false, content: "\nWaiting for the other user...", hidden: false }));
}

const connectUser = (userID, otherUserID) => {
  users[userID].connection.on("message", message => {
    users[otherUserID].connection.send(JSON.stringify({ prompt: true, content: `${users[userID]["name"]}: ${message}`, hidden: false }));
    users[userID].connection.send(JSON.stringify({ prompt: true, content: "SENT", hidden: true }));
  });

  users[userID].connection.send(JSON.stringify({ prompt: true, content: 'Connected!\n', hidden: false }));
}

wss.on("connection", ws => {
  const userID = users.push({
    "connection": ws
  }) - 1;
  console.log(`[${new Date().getHours()}:${new Date().getMinutes()}] Client Connected`);

  askName(userID);
});

console.log(`[${new Date().getHours()}:${new Date().getMinutes()}] Served Started`);