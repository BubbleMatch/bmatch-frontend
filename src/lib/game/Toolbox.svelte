<script>
    import {onMount} from 'svelte';
    import {getProfile} from "../utils/getProfile.js";
    import {sendMessage, subscribeToRoom} from "../webSocket/chatSocket.js"
    import {getCookie} from "../utils/cookies.js";

    export let chatVisible;
    export let toggleChat;

    let minutes = 0;
    let seconds = 0;
    let messageContent = '';
    let roomId = '';
    let messages = [];
    let currentUser = '';
    let chatContainer;

    function handleMouseClick(event) {
        if (event.altKey && event.button === 0) {
            const timeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            messages = [...messages, {username: "SELF-MESSAGE", content: timeLeft}];
        }
    }

    onMount(async () => {
        const profile = await getProfile(getCookie("token"));
        currentUser = profile.username;
        if (currentUser === undefined) {
            currentUser = "GUEST";
        }

        const path = window.location.pathname;
        const segments = path.split('/');

        roomId = segments[segments.length - 1];

        subscribeToRoom(roomId, (message) => {
            if (messages.length > 100) {
                messages = [];
            }
            messages = [...messages, message];
            scrollToBottom();

        });

        document.addEventListener('mousedown', handleMouseClick);

        return () => {
            document.removeEventListener('mousedown', handleMouseClick);
        };

    });

    $: if (messages.length) {
        scrollToBottom();
    }

    function scrollToBottom() {
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    let canSend = true;

    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            messageContent = event.target.value;

            if (messageContent.length < 1 || !canSend) {
                return;
            }

            sendMessage(roomId, currentUser, messageContent);
            event.target.value = '';

            canSend = false;

            setTimeout(() => {
                canSend = true;
            }, 1000);
        }
    }

</script>

<div class="header">
    <div class="switch"
         on:click={toggleChat}
         role="button"
         tabindex="0"
         aria-label="Toggle chat"
         on:keydown={() => {}}>
        <div class="chat-icon"></div>
    </div>
    <div class="timer">
        Time left: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
</div>
<div class="chat" style="display: {chatVisible ? 'flex' : 'none'};">
    <div class="textarea" bind:this={chatContainer}>
        {#each messages as message}
            <div class="msg">
                {message.username}: {message.content}
            </div>
        {/each}
    </div>
    <div class="input">
        <input
                type="text"
                maxlength="64"
                placeholder="GG, WP"
                bind:value={messageContent}
                on:keydown={handleKeyDown}
        />
    </div>
</div>
