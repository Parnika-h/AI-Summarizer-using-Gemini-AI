function extractText(){
    const article=document.querySelector("article");
    if (article && article.innerText.length>200){
        return article.innerText;
    }
    const paragraphs=Array.from(document.querySelectorAll("p"))
    .map(p=>p.innerText).filter(t=>t.length>30);
    return paragraphs.join("\n\n").trim();
}

chrome.runtime.onMessage.addListener((req,sender,sendResponse)=>{
    if (req.type === "GET_PAGE_TEXT"){
        sendResponse({text:extractText()});
    }
    return true;
});