(function() {
    // Create drawer only once
    if (document.getElementById('chrome-right-drawer')) return;

    const drawer = document.createElement('div');
    drawer.id = 'chrome-right-drawer';
    document.body.appendChild(drawer);

    let open = false;
    window.addEventListener('toggle-drawer', () => {
        open = !open;
        drawer.classList.toggle('open', open);
    });

    const dashboardFrame = document.createElement('iframe');
    dashboardFrame.src = chrome.runtime.getURL('login.html');
    dashboardFrame.style.width = '100%';
    dashboardFrame.style.height = '100%';
    dashboardFrame.style.border = 'none';

    // Load login.html inside drawer
    const loginFrame = document.createElement('iframe');
    loginFrame.src = chrome.runtime.getURL('login.html');
    loginFrame.style.width = '100%';
    loginFrame.style.height = '100%';
    loginFrame.style.border = 'none';

    const currentUrl = window.location.href;
    console.log("Current URL:", currentUrl);

    window.addEventListener('message', (event) => {
        if (event.data?.action === 'saveToken') {
            chrome.storage.sync.set({ apiToken: event.data.token }, () => {
                // Remove iframe and load main drawer content
                drawer.innerHTML = `
        <div class="drawer-content">
          <h3>Welcome 👋</h3>
          <p>Token saved successfully ✅</p>
        </div>
      `;
            });
        }
    });

    chrome.storage.sync.get(['apiToken'], (result) => {
        if (result.apiToken) {
            drawer.appendChild(dashboardFrame);
        } else {
            drawer.appendChild(loginFrame);
        }
    });
})();
