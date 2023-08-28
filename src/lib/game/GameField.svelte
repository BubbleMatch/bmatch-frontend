<script>
    import sourceImgSrc from '../../assets/item.png';

    export let openBubbles = [];
    export let isYourTurn = false;

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let items = Array(100).fill(undefined).map((_, i) => ({
        id: `item${i}`,
        src: sourceImgSrc,
        selected: false
    }));

    $: {
        items = items.map((item, i) => {
            let foundBubble = openBubbles.find(bubble => bubble.id === `item${i}`);
            return {
                id: `item${i}`,
                src: foundBubble ? foundBubble.src : sourceImgSrc,
                selected: false,
                highlighted: !!foundBubble
            };
        });
    }


    function handleClick(item) {
        if (!isYourTurn) return;

        if(item.src === sourceImgSrc) {
            dispatch('bubbleClicked', item.id.replace('item', ''));
        }
    }

    function preventDefault(event) {
        event.preventDefault();
    }
</script>

<div class="game-container">
    {#each items as item, index}
        <img
                src={item.src}
                draggable="false"
                class="item {item.selected ? 'selected' : ''} {item.highlighted ? 'highlighted-icon' : ''}"
                id={item.id}
                alt="Game item"
                style="--translateY: -{Math.floor(index / 10) * 15}px;"
                on:click={() => handleClick(item)}
        />
    {/each}
</div>

