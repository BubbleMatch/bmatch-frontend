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
                openBubbles = [];

                data.openBubbles.forEach(newBubble => {
                    openBubbles.push({
                        id: `item${parseInt(newBubble.bubbleId)}`,
                        src: `/bubbles/50shashek_${newBubble.bubbleImg}.png`
                    });
                });

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
            },
            closeBubbles: (data) => {
                openBubbles = openBubbles.filter(bubble =>
                    bubble.id !== `item${parseInt(data.firstBubbleId)}` &&
                    bubble.id !== `item${parseInt(data.secondBubbleId)}`
                );
            },
            onGameOver: (data) => {
                alert("Game over")
            },
            getCurrentPlayer: (data) => {
                let currentPlayer = players.filter(value => {
                    return value.username === data.username
                })[0];

                for (let i = 0; i < players.length; i++) {
                    players[i].isActive = false;
                }

                players[currentPlayer.id - 1].isActive = true;
                isYourTurn = (username === currentPlayer.username);

            }
        });

        joinGame(socket, {
            id: socket.id,
            token: getCookie('token'),
            gameUUID: room
        });

        const firstItem = document.querySelector('#item0');
        const lastItem = document.querySelector('#item99');

        const screenWidth = window.screen.width * window.devicePixelRatio;
        const screenHeight = window.screen.height * window.devicePixelRatio;

        if (screenWidth >= 2560 && screenHeight >= 1440) {
            document.body.style.zoom = "1.25";
        }

        if (firstItem && lastItem) {
            const firstItemRect = firstItem.getBoundingClientRect();
            const lastItemRect = lastItem.getBoundingClientRect();

            const bgImage = document.createElement('img');
            bgImage.src = "/bg.png";

            bgImage.style.position = 'absolute';
            bgImage.style.left = `${firstItemRect.left - 20}px`;
            bgImage.style.top = `${firstItemRect.top + 7}px`;
            bgImage.style.width = `${(lastItemRect.right - firstItemRect.left) + 40}px`;
            bgImage.style.height = `${(lastItemRect.bottom - firstItemRect.top) + 29}px`;

            bgImage.style.zIndex = '1';

            document.body.appendChild(bgImage);
        }


    });


    function adjustBackgroundImage() {
        const firstItem = document.querySelector('#item0');
        const lastItem = document.querySelector('#item99');
        const bgImage = document.querySelector('img[src="/bg.png"]');

        if (firstItem && lastItem && bgImage) {
            const firstItemRect = firstItem.getBoundingClientRect();
            const lastItemRect = lastItem.getBoundingClientRect();

            bgImage.style.left = `${firstItemRect.left - 20}px`;
            bgImage.style.top = `${firstItemRect.top + 7}px`;
            bgImage.style.width = `${(lastItemRect.right - firstItemRect.left) + 40}px`;
            bgImage.style.height = `${(lastItemRect.bottom - firstItemRect.top) + 29}px`;
        }
    }

    window.addEventListener('resize', adjustBackgroundImage);


    import {onDestroy} from 'svelte';

    onDestroy(() => {
        window.removeEventListener('resize', adjustBackgroundImage);
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
