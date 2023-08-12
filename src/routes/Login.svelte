<script>

    import {setCookie} from "../lib/utils/cookies.js";
    import {getProfile} from "../lib/utils/getProfile.js";
    import {generateRange} from "../lib/utils/mmr.js";
    import {navigate} from "svelte-routing";

    let email = "";
    let password = "";

    function navigateToSignup() {
        window.location.href = '/signup';
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    async function login() {
        const response = await fetch('http://localhost:8002/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if(response.status !== 200){
            alert(data.message);

            return;
        }

        setCookie('token', data.message)

        let profile = await getProfile(data.message);
        let roomNumber = `${profile.username}#${generateRange(profile.mmr)}`
        navigate(`/create-lobby/${roomNumber}`);
    }

    function handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            navigateToSignup();
        }
    }
</script>

<div class="wrapper auth">
    <div class="signin-wrapper">
        BUBBLE MATCH
    </div>
    <div class="edits-wrapper">
        <div class="nav">
            <input bind:value={email} placeholder="Gmail" type="text">
            <input bind:value={password} placeholder="Password" type="password">
            <div class="button" on:click={login}>Sign in</div>
            <div class="info">
                <div class="grey">Still not have an account?</div>
                <div
                        class="red"
                        role="button"
                        tabindex="0"
                        on:click={navigateToSignup}
                        on:keydown={handleKeydown}>
                    Sign up
                </div>
            </div>
            <div class="privacy">
            </div>
        </div>
    </div>
</div>

<style>
    @import "../styles/auth.scss";
</style>
