<script>
    import {Router, Route} from "svelte-routing";
    import Home from "./routes/Home.svelte";
    import Game from "./routes/Game.svelte";
    import Login from "./routes/Login.svelte";
    import Signup from "./routes/Signup.svelte";
</script>

<Router>
    <Route path="/" component={Home}/>
    <Route path="/game" component={Game}/>
    <Route path="/login" component={Login}/>
    <Route path="/signup" component={Signup}/>
</Router>
