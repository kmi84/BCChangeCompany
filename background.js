// chrome.runtime.onInstalled.addListener(function () {

//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([{
//             conditions: [new chrome.declarativeContent.PageStateMatcher({
//                 pageUrl: { hostEquals: 'developer.chrome.com', },
//             })
//             ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });


chrome.commands.onCommand.addListener(function (command) {
    if (command == "open-company") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            var tab = tabs[0];
            var url = tab.url;
            if (url.includes('/BC/')) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "change_company" }, function (response) {

                    });
                });
            }
        });


    }
});

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(sender.tab ?
//             "from a content script:" + sender.tab.url :
//             "from the extension");
//         if (request.companies.length > 0) {
//             request.companies.forEach(element => {
//                 console.log(element);
//             });
//             sendResponse({ status: "ok" });
//         }
//     });



