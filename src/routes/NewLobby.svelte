<script>
    import NavigationMenu from "../lib/navigation/NavigationMenu.svelte";
    import guestSvg from "./../assets/guest.svg";
    import {getProfile} from "../lib/utils/getProfile.js";
    import {getCookie} from "../lib/utils/cookies.js";
    import {onMount} from "svelte";
    import {initializeLobbySocket, joinLobby, generateGame, verifyWSLobby} from '../lib/webSocket/lobbySocket.js';
    import {copyToClipboard} from "./../lib/utils/uiHelpers.js";

    let socket;

    let players = [];
    let playerId = 1;
    let lobbyID = '';
    let isLobbyRemoved = false;
    let addBotVisible = true;
    let startGameVisible = false;

    let readyVisible = false;

    let mmr = 2000;
    let username = "Guest";

    onMount(async () => {
        if (getCookie('token') !== null) {
            let profile = await getProfile(getCookie('token'));
            mmr = profile.mmr;
            username = profile.username;

            const path = window.location.href;
            const segments = path.split('/');
            lobbyID = segments[segments.length - 1];

            socket = initializeLobbySocket({
                onPlayerListUpdated: ({currentLobbyPlayers}) => {

                    players = [];

                    for (let i = 0; i < currentLobbyPlayers.length; i++) {
                        players = [...players, {
                            id: playerId,
                            username: currentLobbyPlayers[i].username,
                            mmr: currentLobbyPlayers[i].mmr,
                            type: currentLobbyPlayers[i].type,
                            ready: currentLobbyPlayers[i].ready
                        }];
                        if (players.length === 4) {
                            addBotVisible = false;
                            startGameVisible = true;
                            readyVisible = false;
                        } else {
                            addBotVisible = true;
                            readyVisible = false;
                        }
                    }
                },
                systemMessage: (data) => {
                    alert(data.message)
                },
                onDisconnected: () => {
                    const data = {
                        id: socket.id,
                        username: username,
                        lobbyID: lobbyID
                    };

                    socket.emit('leave', data);
                    console.log("leave");
                },
                onLobbyRemoved: () => {
                    socket.disconnect();
                    players = [];
                    lobbyID = "Removed";
                    isLobbyRemoved = true;
                    readyVisible = false;
                    addBotVisible = false;
                },

                userExist: () => {
                    socket.disconnect();
                    players = [];
                    lobbyID = " Connected from another tab or device";
                    isLobbyRemoved = true;
                },
                gameRedirect: () => {
                    readyVisible = true;
                },

                acceptGameRequest: (data) => {
                    console.log(data);
                }
            });

            joinLobby(socket, {
                id: socket.id,
                username: username,
                mmr: mmr,
                type: "Player",
                lobbyID: lobbyID
            });

            return () => {
                socket.disconnect();
            };
        }
    });


    function addBot() {
        if (players.length < 4) {
            playerId++;

            joinLobby(socket, {
                    id: playerId,
                    username: `Bot ${playerId}`,
                    mmr: 2000, type: "Bot",
                    lobbyID: lobbyID
                }
            );
        }
    }

    function requestGame() {
        if (players.length === 4) {
            generateGame(socket, {
                    JWT: getCookie('token'),
                    lobbyID: lobbyID
                }
            );
        }
    }

    function verifyLobby() {
        if (players.length === 4) {
            verifyWSLobby(socket, {
                    JWT: getCookie('token')
                }
            );
            readyVisible = false;
        }
    }
</script>

<svelte:head>
    <title>Lobby: #{username}</title>
</svelte:head>


<NavigationMenu></NavigationMenu>
<div class="wrapper new-lobby">

    <div class="lobby-wrapper">
        <div class="header"><p>Lobby: {lobbyID}</p></div>
        <div class="user-block">
            {#each players as player}
                <div class="user">
                    <div class="left">
                        <img src="{guestSvg}" alt="">
                        <div class="user-info">
                            <p style="color: {player.ready || player.type ==='Bot' ? 'green' : ''}">{player.username}</p>
                            <p>{player.mmr} MMR</p>
                            <p>ready {player.ready}</p>
                        </div>
                    </div>
                    <div class="right">
                        <p>{player.type}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="lobby-toolbox" style="display: {isLobbyRemoved ? 'none' : 'flex'}">
        <div class="button" on:click={copyToClipboard}>
            <p>Copy link</p>
        </div>

        <div class="button" on:click={addBot} style="display: {addBotVisible ? 'flex' : 'none'};">
            <p>Add bot</p>
        </div>

        <div class="button" on:click={requestGame} style="display: {startGameVisible ? 'flex' : 'none'};">
            <p>Start game</p>
        </div>

    </div>
</div>
<div class="ready" on:click={verifyLobby} style="display: {readyVisible ? 'flex' : 'none'};">
    READY
</div>
<style>

    @import "../styles/new-lobby.scss";
</style>
