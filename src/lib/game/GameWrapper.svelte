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
    let isYourTurn = true;

    function sendOpenedBubble(bubbleId) {
        console.log(bubbleId);
        if (socket && isYourTurn) {//
            socket.emit('bubbleOpened', { id: bubbleId });
        }
    }


    onMount(async () => {
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

            },
            timeRequested: (data) => {

            },
            isPaused: (data) => {

            },
            openBubble: (data) => {

            },
            closeBubble: (data) => {

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
