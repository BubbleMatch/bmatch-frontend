<script>
    import PlayerBlock from './PlayerBlock.svelte';
    import Toolbox from "./Toolbox.svelte";
    import GameField from "./GameField.svelte";

    let players = [
        {id: 1, nickname: 'nickname1', mmr: '1200pts', isActive: true},
        {id: 2, nickname: 'nickname2', mmr: '1100pts'},
        {id: 3, nickname: 'nickname2', mmr: '1100pts'},
        {id: 4, nickname: 'nickname2', mmr: '1100pts'}
    ];

    let chatVisible = false;

    function toggleChat() {
        chatVisible = !chatVisible;
    }


</script>

<div class="wrapper">
    <div class="bg">
        <GameField/>
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
