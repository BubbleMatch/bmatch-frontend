<script>
    import bg from "../assets/bg.png";
    import { getCookie } from '../lib/utils/cookies.js';
    import {getProfile} from "../lib/utils/getProfile.js";
    import {generateRange} from "../lib/utils/mmr.js";
    import {navigate} from "svelte-routing";

    async function checkCookieAndRedirect() {
        const userCookie = getCookie('token');

        if (userCookie) {
            let profile = await getProfile(userCookie);
            let roomNumber = `${profile.username}#${generateRange(profile.mmr)}`
            navigate(`/create-lobby/${roomNumber}`);
        } else {
            window.location.href = '/signup';
        }
    }
</script>

<svelte:head>
    <title>Bubble Match</title>
</svelte:head>

<main style="background-image: url({bg});">
    <div class="start-game" on:click={checkCookieAndRedirect}>start game
    </div>
</main>

<style>
    @import "../styles/home.scss";
</style>
