<script>
    export let id;
    export let nickname = 'nickname';
    export let mmr = '1000pts';
    export let isActive = false;
</script>

<div class="player-block">
    <div class="id {isActive ? 'active' : ''}">
        {id}
    </div>
    <div class="info">
        <div class="left">
            <div class="img"></div>
        </div>
        <div class="right">
            <div class="nickname">{nickname}</div>
            <div class="mmr">{mmr}</div>
        </div>
    </div>
</div>

<style>
    /* Styles related to the player block go here */
</style>
