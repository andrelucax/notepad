export function init() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let theme = localStorage.getItem('theme');
    
    if (!theme) {
        theme = systemPrefersDark ? 'dark' : 'light';
    }
    
    if (theme == 'light') {
        document.body.classList.add('light-mode');
    }

    return theme;
}