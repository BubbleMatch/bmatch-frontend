<script>
    import NavigationMenu from "../lib/navigation/NavigationMenu.svelte";
    import guestSvg from "../assets/guest.svg";
    import {getProfile} from "../lib/utils/getProfile.js";
    import {getCookie} from "../lib/utils/cookies.js";
    import {onMount} from "svelte";

    let players = [];
    let playerId = 1;

    function copyToClipboard() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                console.log('URL copied to clipboard');
            });
    }


    let mmr = 2000;
    let username = "Guest";

    onMount(async () => {
        if (getCookie('token') !== null) {
            let profile = await getProfile(getCookie('token'));
            mmr = profile.mmr;
            username = profile.username;
            players = [...players, {id: playerId, name: profile.username, mmr: profile.mmr, type: "You"}];
        }
    });

    function addBot() {
        if (players.length < 4) {
            playerId++;
            players = [...players, {id: playerId, name: `Bot ${playerId}`, mmr: 2000, type: "Bot"}];
        }
    }
</script>

<NavigationMenu></NavigationMenu>
<div class="wrapper new-lobby">

    <div class="lobby-wrapper">
        <div class="header"><p>Lobby</p></div>
        <div class="user-block">
            {#each players as player}
                <div class="user">
                    <div class="left">
                        <img src="{guestSvg}" alt="">
                        <div class="user-info">
                            <p>{player.name}</p>
                            <p>{player.mmr} MMR</p>
                        </div>
                    </div>
                    <div class="right">
                        <p>{player.type}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="lobby-toolbox">
        <div class="button" on:click={copyToClipboard}>
            <p>Copy link</p>
        </div>

        <div class="button" on:click={addBot}>
            <p>Add bot</p>
        </div>

    </div>
</div>

<style>
    @import "../styles/new-lobby.scss";
</style>