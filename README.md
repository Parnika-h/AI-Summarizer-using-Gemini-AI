# AI-Summarizer-using-Gemini-AI
Developed a Chrome extension that extracts web page content and generates concise summaries using Google Gemini AI. The extension supports brief, detailed, and bullet-point summaries, includes light/dark mode, copy-to-clipboard functionality, and gracefully handles API errors.

---

## Features

- Summarize web pages in three formats:
  - Brief summary
  - Detailed summary
  - Bullet points
- Light / Dark theme toggle
- One-click copy to clipboard with visual feedback
- Graceful handling of API errors
- Clean and responsive popup UI

---

## Tech Stack

- JavaScript 
- HTML & CSS
- Chrome Extension APIs
- Google Gemini AI API

---

## How It Works

1. Extracts readable text from the active browser tab
2. Builds a structured prompt based on selected summary type
3. Sends the prompt to Gemini AI
4. Displays the generated summary in the extension popup

---

## Usage

1. Open any article or web page
2. Click the AI Summarizer extension icon
3. Select a summary type (Brief / Detailed / Bullet Points)
4. Click **Summarize**
5. Copy the generated summary if needed
   
---

## Installation (Local Setup)

1. Clone this repository:
   git clone https://github.com/Parnika-h/AI-Summarizer-using-Gemini-AI.git
   
2. Open Chrome and go to:
    chrome://extensions/

3. Enable Developer Mode (top-right)

4. Click Load unpacked and select the project folder

5. Add your Gemini API key in the extension settings
   (Note: This project does not include an API key. You must provide your own Gemini API key to use the extension.)

<img width="586" height="285" alt="image" src="https://github.com/user-attachments/assets/cd4cbd22-3173-4eee-a96c-36e827cf6828" />

<img width="1763" height="849" alt="image" src="https://github.com/user-attachments/assets/c8be4487-8693-4195-bb4f-052d36cd27ba" />

<img width="460" height="737" alt="image" src="https://github.com/user-attachments/assets/a5f16f03-b144-4374-bb07-1c5ab144572d" />
