<script>
    import PlayerBlock from './PlayerBlock.svelte';
    import Toolbox from "./Toolbox.svelte";
    import GameField from "./GameField.svelte";
    import {onMount} from "svelte";
    import {getCookie} from "../utils/cookies.js";
    import {getProfile} from "../utils/getProfile.js";
    import {initializeGameSocket, joinGame} from "./../webSocket/gameSocket.js";
    import guestSvg from "./../../assets/guest.svg";

    let socket;
    let players = [];
    export let room;

    let openBubbles = [];
    let isYourTurn = false;

    let username = '';

    function sendOpenedBubble(bubbleId) {
        if (socket && isYourTurn) {
            socket.emit('sendOpenedBubble', {bubbleId: bubbleId, token: getCookie('token'), gameUUID: room});
        }
    }

    onMount(async () => {

        if (getCookie('token')) {
            let profile = await getProfile(getCookie('token'));
            username = profile.username;
        }

        socket = initializeGameSocket({
            onPlayerListUpdated: (data) => {
                players = data.map((player, index) => ({
                    ...player,
                    id: index + 1,
                    img: {guestSvg}
                }));
            },
            systemMessage: (data) => {

            },
            onGameRemoved: (data) => {

            },
            userExist: (data) => {

            },
            gameRedirect: (data) => {

            },
            gameAction: (data) => {
                for (const action of data.openBubbles) {
                    openBubbles.push({
                        id: `item${parseInt(action.bubbleId)}`,
                        src: `/bubbles/50shashek_${action.bubbleImg}.png`
                    });
                }

                openBubbles = [...openBubbles];
            },
            timeRequested: (data) => {

            },
            isPaused: (data) => {

            },
            openBubble: (data) => {
                let newBubble = {
                    id: `item${parseInt(data.bubbleId)}`,
                    src: `/bubbles/50shashek_${data.bubbleImg}.png`
                };
                openBubbles.push(newBubble);
                openBubbles = [...openBubbles];
                console.log(openBubbles);
            },
            closeBubble: (data) => {

            },
            getCurrentPlayer: (data) => {
                let currentPlayer = players.filter(value => {
                    return value.username === data.username
                })[0];

                players[currentPlayer.id - 1].isActive = true;

                isYourTurn = (username === currentPlayer.username);
            }
        });

        joinGame(socket, {
            id: socket.id,
            token: getCookie('token'),
            gameUUID: room
        });

    });

    let chatVisible = false;

    function toggleChat() {
        chatVisible = !chatVisible;
    }

</script>

<div class="wrapper game">
    <div class="bg">
        <GameField {openBubbles} on:bubbleClicked={e => sendOpenedBubble(e.detail)} {isYourTurn}/>
    </div>
    <div class="toolbox">
        <Toolbox {chatVisible} toggleChat={toggleChat}/>
        <div class="player-wrapper" style="display: {chatVisible ? 'none' : 'flex'};">
            {#each players as player}
                <PlayerBlock {...player}/>
            {/each}
        </div>
    </div>
</div>


<style>
    @import "../../styles/game.scss";
</style>
