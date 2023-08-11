<script>
    import NavItem from "./NavItem.svelte";
    import {Link} from "svelte-routing";
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
        <div class="login" style="display:none;">Sign in</div>
        <div class="user" style="display:none;">Username</div>
        <div class="mmr" style="display:none;">2000</div>
    </div>
</div>

<style>
    @import "../../styles/logo.scss";
</style>
