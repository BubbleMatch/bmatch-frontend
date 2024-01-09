import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import replace from '@rollup/plugin-replace';

export default {
    plugins: [
        replace({
            'API_URL': JSON.stringify("localhost"),
            preventAssignment: true, // Add this line to avoid errors with variable assignments
        }),
        svelte({
            preprocess: sveltePreprocess({ scss: true }),
        }),
        // ... your other plugins
    ]
};
