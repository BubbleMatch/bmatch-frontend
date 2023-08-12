<script>
    function navigateToLogin() {
        window.location.href = '/login';
    }

</script>
<div class="wrapper auth">
    <div class="signin-wrapper">
        BUBBLE MATCH
    </div>
    <div class="edits-wrapper">
        <div class="nav">
            <input placeholder="Gmail" type="text">
            <input placeholder="Password" type="password">
            <div class="button">Create account</div>
            <div class="info">
                <div class="grey">Already have an account?</div>
                <div
                        class="red"
                        role="button"
                        tabindex="0"
                        on:click={navigateToLogin}
                        on:keydown={() => {}}>
                    Log in
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
