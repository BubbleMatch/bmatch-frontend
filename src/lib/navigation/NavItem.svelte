<script>
    import {Link} from "svelte-routing";

    export let label = '';
    export let to = '#';
</script>

<Link to={to} class="nav-item" >
    {label}
</Link>