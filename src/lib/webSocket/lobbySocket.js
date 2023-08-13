import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let socket = new SockJS('http://localhost:8003/ws');
let stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5 * 1000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

stompClient.onConnect = () => {
    console.log("STOMP Client connected!");
};

function connect(username, lobbyId) {
    if(stompClient.connected) {
        console.log("Already connected!");
        return;
    }

    stompClient.connectHeaders = {
        'username': username,
        'lobbyId': lobbyId,
    };

    stompClient.activate();
}

function subscribeToRoom(lobbyId, callback) {
    stompClient.subscribe(`/lobbychat/${lobbyId}`, (message) => {
        callback(JSON.parse(message.body));
    });
}

function sendMessage(lobbyId, playerData) {
    stompClient.publish({
        destination: `/app/lobby/${lobbyId}/sendMessage`,
        body: JSON.stringify({
            "id": playerData.id,
            "username": playerData.username,
            "mmr": playerData.mmr,
            "type": playerData.type
        })
    });
}

export {connect, subscribeToRoom, sendMessage};
