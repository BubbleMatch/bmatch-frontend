import { io } from 'socket.io-client';

import config from '../utils/config.js';  // Обновите путь, если путь к config.js отличается

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
        userAlreadyInGame,
        onReceiveMessage,
        onPing
    }) {

    let wsUrl = config.wsGameUrl;

    if (wsUrl == undefined) {
        wsUrl = 'wss://game.bubblematch.io'
    }

    const socket = io.connect(`${wsUrl}/`);

    socket.on('playerList', playerList => {
        onPlayerListUpdated(playerList);
    });

    socket.on('receiveMessage', (data) => {
        onReceiveMessage(data)
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

    socket.on('userAlreadyInGame', message => {
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

    socket.on('isPaused', data => {
        isPaused(data);
    })
    socket.on('closeBubbles', data => {
        closeBubbles(data);
    });

    socket.on('gameOver', data => {
        onGameOver(data);
    })

    setInterval(() => {
        const start = Date.now();

        socket.emit("ping");

        const onPong = () => {
            onPing(Date.now() - start);
            socket.off('pong', onPong); // Удаляем обработчик после того, как он был вызван
        };

        socket.on('pong', onPong);
    }, 1000);

    return socket;
}

export function joinGame(socket, data) {
    socket.emit('join', data);
}
