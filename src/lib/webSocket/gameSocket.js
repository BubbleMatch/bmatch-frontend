import {io} from 'socket.io-client';


export function initializeGameSocket(
    {
        onPlayerListUpdated,
        systemMessage,
        onGameRemoved,
        userExist,
        gameRedirect,
        gameAction,
        timeRequested,
        isPaused,
        openBubble,
        closeBubble
    }) {

    let wsUrl = import.meta.env.VITE_WS_GAME_URL;
    const socket = io.connect(`wss://${wsUrl}/`);

    socket.on('playerList', playerList => {
        onPlayerListUpdated(playerList);
    });

    socket.on('systemMessage', message => {
        console.log(message);
        systemMessage();
    });

    socket.on('onGameRemoved', data => {
        console.log(data);
        onGameRemoved();
    });

    socket.on('userExist', data => {
        console.log(data);
        userExist();
    });

    socket.on('systemMessage', message => {
        console.log(message);
        systemMessage();
    });

    socket.on('gameRedirect', data => {
        gameRedirect(data);
    });

    return socket;
}

export function joinGame(socket, data){
    socket.emit('join', data);
}