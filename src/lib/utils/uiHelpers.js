export function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => {
            console.log('URL copied to clipboard');
        });
}
