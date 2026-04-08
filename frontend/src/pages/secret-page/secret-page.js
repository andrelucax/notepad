import * as messageService from "../../services/message.service.js";
import * as routingService from "../../services/routing.service.js"

let secretTextInputHasUnsavedChanges = false;
let debounceSecretTextInputTimer = null;
let pollingSecretTextInputTimer = null;

const API_BASE = 'http://localhost:3000';

async function getSecretTextInputValueAsync() {
    try {
        const response = await fetch(`${API_BASE}${window.location.pathname}`);

        if (!response.ok) {
            throw new Error(`Http error ${response.status}.`);
        }

        const data = await response.json();

        const secretTextMenu = document.getElementById('secretTextMenu');

        secretTextMenu.innerHTML = '';

        if (data.menu.length > 0) {
            secretTextMenu.classList.remove('hidden');
            data.menu.forEach(page => {
                const link = document.createElement('a');
                link.href = routingService.getNextSecretPageLocation(page);
                link.textContent = page;
    
                secretTextMenu.appendChild(link);
            });
        } else {
            secretTextMenu.classList.add('hidden');
        }

        return data.text || '';
    } catch (err) {
        clearTimeout(pollingSecretTextInputTimer);
        console.error(err);
        messageService.showMessage("Failed to retrieve secret.");
        return '';
    }
}

async function setSecretTextInputValueAsync(value) {
    try {
        messageService.showMessage("Saving...");
        secretTextInputHasUnsavedChanges = false;

        const response = await fetch(`${API_BASE}${window.location.pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: value })
        });

        if (!response.ok) {
            throw new Error(`Http error ${response.status}.`);
        }

        messageService.showMessage("Saved!");
    } catch (err) {
        clearTimeout(pollingSecretTextInputTimer);
        console.error(err);
        messageService.showMessage("Failed to save secret.");
    }
}

function debounceSecretTextInputSave(value) {
    clearTimeout(debounceSecretTextInputTimer);
    debounceSecretTextInputTimer = setTimeout(async () => {
        await setSecretTextInputValueAsync(value);
    }, 2000);
}

export async function initAsync() {
    const secretTextInput = document.getElementById('secretTextInput');
    secretTextInput.focus();
    secretTextInput.value = await getSecretTextInputValueAsync();

    pollingSecretTextInputTimer = setInterval(async () => {
        if (!secretTextInputHasUnsavedChanges) {
            secretTextInput.value = await getSecretTextInputValueAsync();
        }
    }, 2000);

    secretTextInput.addEventListener('input', () => {
        secretTextInputHasUnsavedChanges = true;
        const value = secretTextInput.value.trim();
        debounceSecretTextInputSave(value);
    });
}