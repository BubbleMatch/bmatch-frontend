import {io} from 'socket.io-client';


export function initializeGameSocket(
    {
        onPlayerListUpdated,
        systemMessage,
        gameAction,
        timeRequested,
        isPaused,
        openBubble,
        closeBubbles,
        getCurrentPlayer,
        onGameOver,
        onUserExist,
        userAlreadyInGame
    }) {

    let wsUrl = import.meta.env.VITE_WS_GAME_URL;
    const socket = io.connect(`${wsUrl}/`);

    socket.on('playerList', playerList => {
        onPlayerListUpdated(playerList);
    });

    socket.on('userExist', (data) => {
        onUserExist(data);
    });

    socket.on('timeRequested', data => {
        timeRequested(data);
    })

    socket.on('systemMessage', message => {
        systemMessage(message);
    });

    socket.on('systemMessage', message => {
        systemMessage(message);
    });

    socket.on('userAlreadyInGame' , message => {
        userAlreadyInGame(message);
    })

    socket.on('gameAction', action => {
        gameAction(action);
    });

    socket.on('currentPlayer', data => {
        getCurrentPlayer(data);
    });

    socket.on('openBubble', data => {
        openBubble(data);
    });

    socket.on('isPaused', data =>{
        isPaused(data);
    })
    socket.on('closeBubbles', data => {
        closeBubbles(data);
    });

    socket.on('gameOver', data => {
        onGameOver(data);
    })

    return socket;
}

export function joinGame(socket, data) {
    socket.emit('join', data);
}