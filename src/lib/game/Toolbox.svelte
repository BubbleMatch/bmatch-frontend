<script>
    import * as wsModule from '../webSocket/wsModule.js';

    export let chatVisible;
    export let toggleChat;

    let minutes = 0;
    let seconds = 0;

    let messageContent = '';  // To hold the content of your custom textarea


    import {onMount} from 'svelte';

    onMount(() => {
        wsModule.connect();
    });

    function sendText(message) {
        wsModule.send(message);
    }


    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            messageContent = event.target.value;

            sendText(messageContent);
            event.target.innerText = '';  // Clear the content after sending
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
    <div class="textarea">

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
