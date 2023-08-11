<script>
    import {Router, Route} from "svelte-routing";
    import Game from "./routes/game.svelte";
</script>

<Router>
    <Route path="/" component={Game}/>
</Router>