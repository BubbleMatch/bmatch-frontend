import {io} from 'socket.io-client';

export function initializeLobbySocket({
                                          onPlayerListUpdated, onDisconnected, onLobbyRemoved,userExist
                                      }) {
    const socket = io.connect('ws://localhost:8004/');

    socket.on('playerList', playerList => {
        let currentLobbyPlayers = JSON.parse(playerList.Players);
        onPlayerListUpdated({currentLobbyPlayers: currentLobbyPlayers});
    });

    socket.on('lobbyRemoved', () => {
        onLobbyRemoved();
    })

    socket.on('lobbyRemoved', () => {
        onLobbyRemoved();
    })

    socket.on('userExist', () => {
        userExist();
    });

    return socket;
}

export function joinLobby(socket, data) {
    socket.emit('join', data);
}
