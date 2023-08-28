import {io} from 'socket.io-client';

export function initializeLobbySocket({
                                          onPlayerListUpdated,
                                          onDisconnected,
                                          systemMessage,
                                          onLobbyRemoved,
                                          userExist,
                                          gameRedirect,
                                          gameUUID
                                      }) {

    let wsUrl = import.meta.env.VITE_WS_LOBBY_URL;
    const socket = io.connect(`wss://${wsUrl}/`);

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

    socket.on('gameUUID', data => {
        gameUUID(data.uuid);
    });

    return socket;
}

export function joinLobby(socket, data) {
    socket.emit('join', data);
}

export function generateGame(socket, data) {
    socket.emit('generateGame', data);
}