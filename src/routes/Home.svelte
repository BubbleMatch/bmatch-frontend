<script>
    import bg from "../assets/bg.png";
    import { getCookie } from '../lib/utils/cookies.js';

    function checkCookieAndRedirect() {
        const userCookie = getCookie('yourCookieName'); // Replace 'yourCookieName' with the name of your cookie

        if (userCookie) {
            window.location.href = '/lobby';
        } else {
            window.location.href = '/signup';
        }
    }
</script>

<main style="background-image: url({bg});">
    <div class="start-game" on:click={checkCookieAndRedirect}>start game
    </div>
</main>

<style>
    @import "../styles/home.scss";
</style>
