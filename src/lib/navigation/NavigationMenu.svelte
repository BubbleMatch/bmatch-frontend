<script>
    import NavItem from "./NavItem.svelte";



    // todo: auth
    let signInVisible = false;
    let user = "GUEST";
    let mmr = 0;
</script>

<div class="navigationMenu">
    <div class="left">
        <div class="logo">
            <span>Bubble</span>
            <span>Match</span>
        </div>
        <NavItem to="/" label="Home"/>
        <NavItem to="/play" label="Play"/>
        <NavItem to="/create-lobby" label="Create a lobby"/>
        <NavItem to="/rules" label="Rules"/>
    </div>
    <div class="right">
        {#if signInVisible}
            <NavItem to="/login" label="Sign in"/>
        {:else}
            <div class="user">{user}</div>
            <div class="mmr">{mmr} MMR</div>
        {/if}
    </div>
</div>

<style>
    @import "../../styles/logo.scss";
</style>
