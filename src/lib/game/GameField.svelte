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

    function updateStyle(elementId, animation, backgroundImage) {
        const elem = document.getElementById(elementId);
        if (!elem) return;

        elem.style.animation = animation;
        elem.style.backgroundImage = backgroundImage;
    }


    function handleMouseOver(event) {
        const targetSrc = event.currentTarget.src;

        const duplicateItems = getDuplicateItems(targetSrc);
        if (duplicateItems.length > 1) {
            duplicateItems.forEach(item => {
                updateStyle(item.id, 'sinusoidalHover 2s infinite', 'url("/stroke.png")');
            });
        } else {
            updateStyle(event.currentTarget.id, 'sinusoidalHover 2s infinite', '');
        }
    }

    function handleMouseOut(event) {
        const targetSrc = event.currentTarget.src;
        const currentTargetId = event.currentTarget.id;

        const duplicateItems = getDuplicateItems(targetSrc);
        if (duplicateItems.length > 1) {
            duplicateItems.forEach(item => {
                updateStyle(item.id, 'sinusoidalLeave 1s forwards', '');
                setTimeout(() => {
                    updateStyle(item.id, '', '');
                }, 1000);
            });
        } else {
            updateStyle(currentTargetId, 'sinusoidalLeave 1s forwards', '');
            setTimeout(() => {
                updateStyle(currentTargetId, '', '');
            }, 1000);
        }
    }

    function getRelativePath(fullPath) {
        const index = fullPath.indexOf('/bubbles/');
        return (index !== -1) ? fullPath.slice(index) : fullPath;
    }

    function getDuplicateItems(targetSrc) {
        const relativeTargetSrc = getRelativePath(targetSrc);
        return items.filter(item => item.src === relativeTargetSrc);
    }

</script>

<div class="game-container">
    {#each items as item, index}
        <img
                src={item.src}
                draggable="false"
                class="item"
                id={item.id}
                alt="Game item"
                style="--translateY: -{Math.floor(index / 10) * 22}px;"
                on:click={() => handleClick(item)}
                on:mouseout={handleMouseOut}
                on:mouseover={handleMouseOver}
        />
    {/each}
</div>