<script>
    export let id;
    export let username = '';
    export let mmr = '';
    export let isActive = false;
    export let img;
</script>

<div class="player-block">
    <div class="id {isActive ? 'active' : 'inactive'}">
        {id}
    </div>
    <div class="info">
        <div class="left">
            <div class="img" style="background-image: url('{img.guestSvg}')"></div>
        </div>
        <div class="right">
            <div class="nickname">{username}</div>
            <div class="mmr">{mmr} MMR</div>
        </div>
    </div>
</div>
