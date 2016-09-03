/* Author : SItoban Biswas */

var statusType = {
    IDLE: 0,
    START: 1,
    STOP: 2
}

var currentStatus = statusType.IDLE;

chrome.browserAction.onClicked.addListener(function (tab) {

    if (currentStatus != statusType.START) {
        currentStatus = statusType.START;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "start_recording" }, function (response) {

            });
        });
        chrome.browserAction.setBadgeText({ text: '►' });
    }
    else {
        this._stopRecording();
    }
});

chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    if (command == "stop_recording" && currentStatus == statusType.START) {
        this._stopRecording();
    }

});

function _stopRecording()
{
    currentStatus = statusType.STOP;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "stop_recording" });

    });
    chrome.browserAction.setBadgeText({ text: '' });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('Got the message');

    });






