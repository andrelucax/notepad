import * as routingService from "../../services/routing.service.js"

function submit() {
    const secretPageInput = document.getElementById('secretPageInput');

    const page = secretPageInput.value.trim();

    if (!page) {
        secretPageInput.classList.add('invalid');
        setTimeout(() => {
            secretPageInput.classList.remove('invalid');
        }, 1500);
        return;
    }

    routingService.navigateToSecretPage(page);
}

export function init(theme) {
    const darkModeButton = document.getElementById('darkModeButton');
    const darkModeButtonIcon = document.getElementById('darkModeButtonIcon');

    if (theme == 'light') {
        document.body.classList.add('light-mode');
        darkModeButtonIcon.textContent = 'dark_mode';
    }

    darkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        const isLight = document.body.classList.contains('light-mode');
        darkModeButtonIcon.textContent = isLight ? 'dark_mode' : 'light_mode';

        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

    const secretPageInput = document.getElementById('secretPageInput');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', submit);

    secretPageInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            submit();
        }
    });

    secretPageInput.addEventListener('input', () => {
        const value = secretPageInput.value.trim();
        if (value) {
            startButton.classList.add('active');
            startButton.disabled = false;
        } else {
            startButton.classList.remove('active');
            startButton.disabled = true;
        }
    });
}