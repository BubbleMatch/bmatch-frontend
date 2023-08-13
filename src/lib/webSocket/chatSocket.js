// stompClient.js

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs"

let socket = new SockJS('http://localhost:8003/ws');
let stompClient = new Client({
    webSocketFactory: () => socket,
});

stompClient.onConnect = () => {
    console.log("STOMP Client connected!");
};

stompClient.activate();

function subscribeToRoom(roomId, callback) {
    stompClient.subscribe(`/topic/${roomId}`, (message) => {
        callback(JSON.parse(message.body));
    });
}

function sendMessage(roomId, username, msg) {
    stompClient.publish({
        destination: `/app/chat/${roomId}/sendMessage`,
        body: JSON.stringify({
            username: username,
            content: msg,
        }),
    });
}

export { subscribeToRoom, sendMessage };
