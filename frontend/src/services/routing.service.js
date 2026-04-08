import * as home from "../pages/home/home.js";
import * as secretPage from "../pages/secret-page/secret-page.js";

export async function initAsync(theme) {
    let page = 'home';

    if (window.location.pathname && window.location.pathname !== "/") {
        page = 'secret-page';
    }

    let pagePath = `/src/pages/${page}/${page}.html`;

    await loadPageAsync(pagePath);
    if (page == 'home') {
        home.init(theme);
    } else if (page == 'secret-page') {
        await secretPage.initAsync();
    }
}

export function navigateToSecretPage(page) {
    window.location.href = getNextSecretPageLocation(page);
}

export function getNextSecretPageLocation(page) {
    const safePage = encodeURIComponent(page);

    let currentHref = window.location.href;

    if (currentHref.endsWith("/")) {
        currentHref = currentHref.slice(0, -1);
    }

    return `${currentHref}/${safePage}`;
}

async function loadPageAsync(path) {
    const mainContent = document.getElementById('mainContent');

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error("Page not found");
        const html = await res.text();
        mainContent.innerHTML = html;
    } catch (err) {
        mainContent.innerHTML = `<h1>404 - Page not found</h1>`;
        console.error(err);
    }
}
