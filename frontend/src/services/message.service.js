let messageContainer = null;
let messageText = null;
let hideTimeout = null;

function cleanTimeout() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }
}

export function showMessage(message, duration = 4000) {
    cleanTimeout();

    messageText.textContent = message;
    messageContainer.classList.remove('hidden');

    setTimeout(() => {
        hideMessage();
    }, duration);
}

export function hideMessage() {
    cleanTimeout();
    messageContainer.classList.add('hidden');
    messageText.textContent = '';
}

export function init() {
    messageContainer = document.getElementById('messageContainer');
    messageText = document.getElementById('messageText');

    const hideMessageButton = document.getElementById('hideMessageButton');

    hideMessageButton.addEventListener('click', () => {
        hideMessage();
    });
}
