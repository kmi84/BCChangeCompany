
chrome.commands.onCommand.addListener(function (command) {
    if (command == "open-company") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript({
                file: "company-helper.js",
            });
        });
    }
});
