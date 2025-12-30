const resultDiv = document.getElementById("result");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const copyBtn = document.getElementById("copy");
const summarizeBtn = document.getElementById("summarize");

themeToggle.addEventListener("click",()=> {
    body.classList.toggle("dark");
    body.classList.toggle("light");
    themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

copyBtn.addEventListener("click", async () => {
    const text = resultDiv.innerText;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    const originalText=copyBtn.writeText(text);
    copyBtn.innerText="Copied!";
    setTimeout(()=>{
        copyBtn.innerText=originalText;
    },1500);
    alert("Copied to clipboard!");
});

summarizeBtn.addEventListener("click", () => {
  resultDiv.innerText = "Summarizing...";

  const summaryType = document.getElementById("summary-type").value;

  chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
    if (!geminiApiKey) {
      resultDiv.innerText = "API key not set. Open extension options.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab || !tab.id) {
        resultDiv.innerText = "No active tab found.";
        return;
      }

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_PAGE_TEXT" },
        async (response) => {
          if (chrome.runtime.lastError) {
            resultDiv.innerText = "Cannot access this page (Chrome restriction).";
            return;
          }

          if (!response || !response.text) {
            resultDiv.innerText = "No readable content found.";
            return;
          }

          try {
            const prompt = buildPrompt(response.text, summaryType);
            const summary = await callGemini(prompt, geminiApiKey);
            resultDiv.innerText = summary;
          } catch (err) {
            resultDiv.innerText = err.message || "Gemini request failed.";
          }
        }
      );
    });
  });
});

function buildPrompt(text, type) {
  const content = text.slice(0, 12000);

  if (type === "brief")
    return `You are an AI assistant. Summarize the following content in 2–3 concise sentences, capturing the most important points and main ideas. Avoid unnecessary details and maintain clarity.\n\nContent:\n${content}`;

  if (type === "detailed")
    return `You are an AI assistant. Provide a detailed summary of the following content, covering all major points, arguments, and conclusions. Organize the summary logically and ensure it is coherent and complete.\n\nContent:\n${content}`;

  if (type === "bullets") {
        return  `You are an AI assistant. Summarize the following content as bullet points:
        - Each bullet should contain a single idea or point.
        - Include all key information and main points.
        - Keep each bullet concise but clear.
        - Maintain logical order where possible.

        Content:
        ${content}`;
    }

}

async function callGemini(prompt, apiKey) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 3000 }
      })
    }
  );

  const data = await response.json();

  if (!response.ok || !data.candidates || data.candidates.length === 0) {
    console.error("Gemini API error:", data);
    throw new Error(data.error?.message || "No summary returned from Gemini.");
  }

  return data.candidates[0].content.parts[0].text;
}







