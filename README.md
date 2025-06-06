# 📄 Ask Me Doc AI

**Ask Me Doc AI** is an intelligent document processing tool that allows users to upload PDF files and automatically analyze their contents using OpenAI's GPT models. It's designed to make document understanding faster and more insightful through AI.

---

## 🚀 Features

- 📤 Upload and parse PDF documents
- 🧠 Analyze text using OpenAI's GPT models (e.g., summaries, insights, questions)
- 🔒 Clean, modular NestJS backend
- 🧾 Easily extendable for different analysis modes (summarization, extraction, classification)

---

## ⚙️ Tech Stack

- **Backend:** [NestJS](https://nestjs.com/)
- **Language Model:** [OpenAI GPT (via API)](https://platform.openai.com/)
- **Parsing PDFs:** `pdf-parse` (or similar library)
- **Language:** TypeScript
- **Package Manager:** `pnpm` or `npm`

---

## 📦 Getting Started

### 1. 📥 Clone the repo

```bash
git clone https://github.com/your-username/ask-me-doc-ai.git
cd ask-me-doc-ai
```

### 2. 📦 Intall dependencies

```bash
pnpm install
```

### 3. 🔑 Configure environment variables

OPENAI_API_KEY=your_openai_api_key_here

### 4. 🏃‍♂️ Running the Application

```bash
pnpm start:dev
```

### 5. 📤API Usage

```bash
curl -X POST http://localhost:3000/documents/upload -F 'file=@./your-document.pdf'
```

### 6. 📈 How It Works

- Upload PDF document  
- Extract text content  
- Send text to OpenAI GPT for analysis  
- Receive AI-generated summaries, key points, or Q&A  
