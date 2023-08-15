<svelte:head>
    <title>Bubble Match: Game #{room}</title>
</svelte:head>

<script>
    import NavigationMenu from '../lib/navigation/NavigationMenu.svelte';
    import GameWrapper from "../lib/game/GameWrapper.svelte";

    export let room;
</script>

<NavigationMenu/>
<GameWrapper/>