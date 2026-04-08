let messageContainer = null;
let messageText = null;
let hideTimeout = null;

export function showMessage(message) {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    messageText.textContent = message;
    messageContainer.classList.remove('hidden');

    setTimeout(() => {
        hideMessage();
    }, 4000);
}

export function hideMessage() {
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
