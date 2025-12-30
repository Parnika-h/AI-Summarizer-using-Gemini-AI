document.getElementById("save").addEventListener("click",()=> {
    const key = document.getElementById("apiKey").value.trim();
    if (!key) return;

    chrome.storage.sync.set({geminiApiKey:key},()=> {
        document.getElementById("msg").innerText = "Saved!";
    });
});