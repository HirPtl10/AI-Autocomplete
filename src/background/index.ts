import { myAiRes } from "./genai";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if(message.type == "input_change") {
        myAiRes(message.prompt).then(aiResponse => {
            console.log(`This is res: ${aiResponse}`);
            sendResponse(aiResponse); 
        }, _err => {
            sendResponse("Didnt get the api response")
        });
    }
    return true;
});