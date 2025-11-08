document.addEventListener('DOMContentLoaded', () => {
    const tokenInput = document.getElementById('api-token');
    const status = document.getElementById('status');

    // Load existing token
    chrome.storage.sync.get(['apiToken'], (result) => {
        if (result.apiToken) {
            tokenInput.value = result.apiToken;
            status.textContent = 'Token loaded ✅';
        }
    });

    // Save token on submit
    document.getElementById('token-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const token = document.getElementById('api-token').value.trim();

        // Send token to parent (content script) to store
        window.parent.postMessage({ action: 'saveToken', token }, '*');

        // Optionally show status
        document.getElementById('status').textContent = 'Saving...';
    });


    chrome.storage.sync.set({ apiToken: token }, () => {
        status.textContent = 'Token saved ✅';
        // Notify parent window to reload drawer
        window.parent.postMessage({ action: 'tokenSaved' }, '*');
    });
});
