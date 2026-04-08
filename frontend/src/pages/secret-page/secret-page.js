import * as messageService from "../../services/message.service.js";
import * as routingService from "../../services/routing.service.js"
import { API_BASE } from "../../../configs/config.js"

let secretTextInputHasUnsavedChanges = false;
let debounceSecretTextInputTimer = null;
let pollingSecretTextInputTimer = null;
let lastServerUpdate = null;

async function getSecretTextInputValueAsync() {
    try {
        const response = await fetch(`${API_BASE}${window.location.pathname}`);

        if (!response.ok) {
            throw new Error(`Http error ${response.status}.`);
        }

        const data = await response.json();
        return data;
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

function updateMenu(menuItems) {
    const secretTextMenu = document.getElementById('secretTextMenu');
    secretTextMenu.innerHTML = '';

    if (menuItems.length > 0) {
        secretTextMenu.classList.remove('hidden');
        menuItems.forEach(page => {
            const link = document.createElement('a');
            link.href = routingService.getNextSecretPageLocation(page);
            link.textContent = page;
            secretTextMenu.appendChild(link);
        });
    } else {
        secretTextMenu.classList.add('hidden');
    }
}

export async function initAsync() {
    const secretTextInput = document.getElementById('secretTextInput');
    secretTextInput.focus();

    const initialData = await getSecretTextInputValueAsync();
    secretTextInput.value = initialData.text;
    lastServerUpdate = initialData.updatedAt;
    updateMenu(initialData.menu);

    pollingSecretTextInputTimer = setInterval(async () => {
        if (!secretTextInputHasUnsavedChanges) {
            const serverData = await getSecretTextInputValueAsync();

            if (!lastServerUpdate || new Date(serverData.updatedAt) > new Date(lastServerUpdate)) {
                secretTextInput.value = serverData.text;
                lastServerUpdate = serverData.updatedAt;
            }

            updateMenu(serverData.menu);
        }
    }, 2000);

    secretTextInput.addEventListener('input', () => {
        secretTextInputHasUnsavedChanges = true;
        debounceSecretTextInputSave(secretTextInput.value);
    });
}