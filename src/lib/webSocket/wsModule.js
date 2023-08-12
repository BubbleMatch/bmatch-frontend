let ws;

function connect() {
    ws = new WebSocket('ws://localhost:8081/chat');

    ws.onopen = () => {
        console.log('webSocket connection opened');
    };

    ws.onmessage = (event) => {
        console.log('Received data:', event.data);
    };

    ws.onerror = (error) => {
        console.log('webSocket Error:', error);
    };

    ws.onclose = (event) => {
        if (event.wasClean) {
            console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
            console.log('Connection died');
        }
    };
}

function send(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(data);
    } else {
        console.error("webSocket is not open. Can't send:", data);
    }
}

export { connect, send };
