import {io} from 'socket.io-client';

export function initializeLobbySocket({
                                          onPlayerListUpdated,
                                          onDisconnected,
                                          systemMessage,
                                          onLobbyRemoved,
                                          userExist,
                                          gameRedirect,
                                          acceptGameRequest
                                      }) {
    const socket = io.connect('ws://localhost:8004/');

    socket.on('playerList', playerList => {
        let currentLobbyPlayers = JSON.parse(playerList.Players);
        onPlayerListUpdated({currentLobbyPlayers: currentLobbyPlayers});
    });

    socket.on('lobbyRemoved', () => {
        onLobbyRemoved();
    })

    socket.on('userExist', () => {
        userExist();
    });

    socket.on('gameRedirect', () => {
        gameRedirect();
    });

    socket.on('systemMessage', data => {
        systemMessage(JSON.parse(data));
    });

    socket.on('acceptGameRequest', data => {
        acceptGameRequest();
    })

    return socket;
}

export function joinLobby(socket, data) {
    socket.emit('join', data);
}

export function generateGame(socket, data) {
    socket.emit('generateGame', data);
}

export function verifyWSLobby(socket, data) {
    socket.emit('verifyLobby', data);
}