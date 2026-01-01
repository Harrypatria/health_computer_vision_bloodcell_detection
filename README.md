# Visionary Insights Hub - Patria & Co.

**Empowering Medical Diagnostics with AI**

Welcome to the Visionary Insights Hub, a state-of-the-art computer vision application designed by **Dr Harry Patria** of **Patria & Co.** (2026). This application leverages advanced YOLO models for real-time object detection, specifically tailored for blood cell analysis.

## Introduction

Visionary Insights Hub is a React-based application that demonstrates the power of AI in medical imaging. It allows users to upload or select microscopy images of blood smears to detect and classify Red Blood Cells (RBCs), White Blood Cells (WBCs), and Platelets. The application provides instant visual feedback and clinical interpretation suggestions.

**Features:**
*   **Real-time Detection:** Utilizes simulated YOLO inference for demonstration purposes (extensible to real backend).
*   **Interactive Analysis:** Click on example images or upload your own.
*   **History Tracking:**  Keeps a local record of all predictions.
*   **Clinical Insights:** AI-generated explanations for detected cell counts.

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or bun

### Git Clone

To get a copy of this project, clone the repository using git:

```bash
git clone https://github.com/Harrypatria/visionary-insights-hub.git
cd visionary-insights-hub
```

### Run on VS Code

1.  **Open the project:**
    Open the cloned folder in VS Code.

2.  **Install Dependencies:**
    Open a terminal (Ctrl+`) and run:
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Start Development Server:**
    Run the following command to start the local dev server:
    ```bash
    npm run dev
    # or
    bun run dev
    ```

4.  **View Application:**
    Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Deployment

To deploy this application to a production environment (e.g., Vercel, Netlify):

1.  **Build the Project:**
    Create a production build:
    ```bash
    npm run build
    ```

2.  **Deploy:**
    *   **Vercel:** Install Vercel CLI (`npm i -g vercel`) and run `vercel`.
    *   **Netlify:** Drag and drop the `dist` folder to the Netlify dashboard.
    *   **Static Hosting:** Serve the contents of the `dist` folder on any static web server.

## Author

**Dr Harry Patria**
Patria & Co.
[www.patriaco.co.uk](https://www.patriaco.co.uk)

© 2026 All rights reserved.
