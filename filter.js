const tabs = [];

function initTab(tabId) {
  tabs[tabId] = {
    isActive: false,
  };

  return tabs[tabId];
}

function closeTab(tabId) {
  tabs[tabId] = undefined;
}

function addListener(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'inserted.js' });
}

function toggle() {
  chrome.tabs.getSelected((currentTab) => {
    let tab = tabs[currentTab.id];
    if (!tab) {
      tab = initTab(currentTab.id);
    }
    if (tab.isActive) {
      chrome.tabs.reload(currentTab.id);
      tab.isActive = !tab.isActive;
    } else {
      addListener(currentTab.id);
      tab.isActive = !tab.isActive;
    }
    changeIcon(currentTab.id);
  });
}

function changeIcon(tabId, callback = () => {}) {
  const tab = tabs[tabId];
  let icon = 'black-funnel-16.png';
  if (tab && tab.isActive) {
    icon = 'red-funnel-16.png';
  }
  chrome.browserAction.setIcon({ path: icon }, callback);
}

chrome.browserAction.onClicked.addListener(toggle);

chrome.tabs.onActivated.addListener((activeInfo) => {
  changeIcon(activeInfo.tabId);
});

chrome.windows.onFocusChanged.addListener((activeInfo) => {
  chrome.tabs.getSelected((currentTab) => {
    changeIcon(currentTab.id);
  });
});
