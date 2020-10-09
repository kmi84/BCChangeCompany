
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action == "change_company") {
        if (isThisBc()) {
            sendResponse({ status: "ok" });
            clickSettings();
        } else {
            sendResponse({ status: "not BC" });
        }
        return true;


    }
});

function isThisBc() {
    let productName = document.querySelector("body > div[id='product-menu-bar'] > span[class='productname'] ");
    if (productName) {
        if (productName.innerHtml == 'Dynamics 365 Business Central') TouchEvent
        return true;
    }

    return false;
}


function clickSettings() {
    let menu = document.getElementById("product-menu-bar");
    let settings = menu.querySelector(".icon-iSettings");
    settings.click();
    tryClickMySettings();
}

function tryClickMySettings() {
    let menu = document.getElementsByClassName("settings-ctxmenu-container");
    if (!menu) {
        window.requestAnimationFrame(tryClickMySettings);
    }
    else {
        let menuItem = menu[0].querySelector("li[title='Manage your user settings']");
        simulateClick(menuItem);
        tryClickComapnyAssistEdit();
    }
}

function tryClickComapnyAssistEdit() {
    let ifr = document.querySelector("iframe[title='Main Content']");
    let menu = ifr.contentWindow.document.querySelector("div[controlname='Company'] > div > a");
    let span = ifr.contentWindow.document.querySelector("div[controlname='Company'] > div > span");
    if (!menu || !span) {
        window.requestAnimationFrame(tryClickComapnyAssistEdit);
    }
    else {
        setAutoConfirmOnCompanyChange(span);
        simulateClick(menu);
    }
}

function setAutoConfirmOnCompanyChange(span) {
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            let ifr = document.querySelector("iframe[title='Main Content']");
            let okButton = ifr.contentWindow.document.querySelector("form[controlname='My Settings'] > div > div > div > button");
            simulateClick(okButton);
        });
    });

    let config = { characterData: false, attributes: false, childList: true, subtree: false };
    observer.observe(span, config);
}


function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
}

function simulateClick(node) {
    triggerMouseEvent(node, "mouseover");
    triggerMouseEvent(node, "mousedown");
    triggerMouseEvent(node, "mouseup");
    triggerMouseEvent(node, "click")
}
