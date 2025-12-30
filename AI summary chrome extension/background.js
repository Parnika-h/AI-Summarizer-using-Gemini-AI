chrome.runtime.onInstalled.addListener((details)=>{
    if (details.reason==="install"){
        chrome.storage.sync.get("geminiApiKey",(res) =>{
            if (!res.geminiApiKey){
                chrome.tabs.create({url: "options.html"});
            }
        });
    }
});