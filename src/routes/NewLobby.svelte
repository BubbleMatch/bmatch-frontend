<script>
    import NavigationMenu from "../lib/navigation/NavigationMenu.svelte";
    import guestSvg from "../assets/guest.svg";
    import {getProfile} from "../lib/utils/getProfile.js";
    import {getCookie} from "../lib/utils/cookies.js";
    import {onMount} from "svelte";
    import {initializeLobbySocket, joinLobby} from '../lib/webSocket/lobbySocket.js';

    let socket;

    let players = [];
    let playerId = 1;
    let lobbyId = '';

    function copyToClipboard() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                console.log('URL copied to clipboard');
            });
    }

    let mmr = 2000;
    let username = "Guest";

    onMount(async () => {
        if (getCookie('token') !== null) {
            let profile = await getProfile(getCookie('token'));
            mmr = profile.mmr;
            username = profile.username;

            const path = window.location.href;
            const segments = path.split('/');
            lobbyId = segments[segments.length - 1];

            socket = initializeLobbySocket({
                onPlayerListUpdated: ({currentLobbyPlayers}) => {

                    console.log(currentLobbyPlayers);

                    players = [];

                    for (let i = 0; i < currentLobbyPlayers.length; i++) {
                        players = [...players, {
                            id: playerId,
                            username: currentLobbyPlayers[i].username,
                            mmr: currentLobbyPlayers[i].mmr,
                            type: currentLobbyPlayers[i].type
                        }];
                    }
                },
                onDisconnected: () => {
                    const data = {
                        id: socket.id,
                        username: username,
                        lobbyID: lobbyId
                    };

                    socket.emit('leave', data);
                    console.log("leave");
                }
            });

            joinLobby(socket, {
                id: socket.id,
                username: username,
                mmr: mmr,
                type: "Player",
                lobbyID: lobbyId
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
                    lobbyID: lobbyId
                }
            );
        }
    }
</script>

<NavigationMenu></NavigationMenu>
<div class="wrapper new-lobby">

    <div class="lobby-wrapper">
        <div class="header"><p>Lobby</p></div>
        <div class="user-block">
            {#each players as player}
                <div class="user">
                    <div class="left">
                        <img src="{guestSvg}" alt="">
                        <div class="user-info">
                            <p>{player.username}</p>
                            <p>{player.mmr} MMR</p>
                        </div>
                    </div>
                    <div class="right">
                        <p>{player.type}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="lobby-toolbox">
        <div class="button" on:click={copyToClipboard}>
            <p>Copy link</p>
        </div>

        <div class="button" on:click={addBot}>
            <p>Add bot</p>
        </div>

    </div>
</div>

<style>
    @import "../styles/new-lobby.scss";
</style>