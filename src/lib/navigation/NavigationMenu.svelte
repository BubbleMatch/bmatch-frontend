<script>
    import NavItem from "./NavItem.svelte";
    import {getCookie} from "../utils/cookies.js";
    import {getProfile} from "../utils/getProfile.js";
    import {onMount} from "svelte";

    let signInVisible = false;
    let user = "GUEST";
    let mmr = 0;

    async function loadProfile() {
        const token = getCookie('token');
        if (token !== null) {
            let profile = await getProfile(token);
            user = profile.username;
            mmr = profile.mmr;
            signInVisible = false;
        } else {
            signInVisible = false;
        }
    }


    onMount(() => {
        if (getCookie('token') !== null) {
            loadProfile();
        }
    });

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
