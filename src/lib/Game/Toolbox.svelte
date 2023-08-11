<script>
    export let chatVisible;
    export let toggleChat;

    let minutes = 0;
    let seconds = 0;

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
        <input type="text" maxlength="64" placeholder="GG, WP">
    </div>
</div>
