<script>
    import sourceImgSrc from '../../assets/item.png';

    let items = Array(100).fill(undefined, undefined, undefined).map((_, i) => ({id: `item${i}`, opened: false}));

    function handleClick(item) {
        item.opened = true;
        items = items;
    }


    function preventDefault(event) {
        event.preventDefault();
    }
</script>

<div class="game-container">
    {#each items as item}
        <img
                src={sourceImgSrc}
                class="item {item.opened ? 'opened' : ''}"
                id={item.id}
                alt="Game item"
                on:click={() => handleClick(item)}
        />
    {/each}
</div>

