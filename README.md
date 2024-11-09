# PDFXplorer
PDFXplorer is a modern, responsive PDF viewer application built for front-end purposes using Vite, React, TypeScript, and Tailwind CSS. This project is focused on providing an intuitive and efficient way to view PDF documents in a web application. It uses HTML Canvas for rendering PDF pages and PDF.js to handle the PDF file parsing and rendering.

This project is designed to be responsive and mobile-friendly, ensuring that users can view PDFs seamlessly on both desktop and mobile devices.

# Table of Contents
 1. Introduction
 2. Features
 3. Tech Stack
 4. Setup Instructions
 5. Project Structure
 6. Usage
 7. Contributing
 8. License
 9. Acknowledgments

# Introduction
PDFXplorer is primarily a front-end project aimed at displaying PDF documents in a clean, interactive, and responsive way. Built with modern tools like Vite, React, and Tailwind CSS, this project focuses on the visual aspect of PDF viewing and does not handle backend processing or storage of PDFs. It leverages PDF.js to render PDFs directly in the browser using the HTML5 Canvas element, making it lightweight and fast.

This application is suitable for use in front-end environments where you need to display PDF files in an optimized and user-friendly manner. It is ideal for integrating into web apps that need a PDF viewer or viewer components for showing documents.

# Features
 * Responsive Design: Fully responsive for both desktop and mobile views using Tailwind CSS.
 * PDF Viewing: Efficient rendering of PDF documents using PDF.js.
 * Canvas Rendering: Utilizes HTML Canvas for smooth PDF page rendering.
 * Page Rotation Support: Handles PDF page rotation (0, 90, 180, 270 degrees).
 * Loading Indicator: Displays a loading spinner while the PDF is being loaded.
 * Mobile-Friendly: Optimized for mobile devices with responsive layout adjustments.

# Tech Stack
 * Vite: A modern build tool for faster development and optimized production builds.
 * React: JavaScript library for building the user interface.
 * TypeScript: Strongly typed programming language that adds type safety to JavaScript.
 * Tailwind CSS: Utility-first CSS framework for rapid UI development.
 * PDF.js: A library that renders PDFs in web browsers using HTML5 technologies.
 * HTML Canvas: Used to render the PDF pages.
   
# Setup Instructions
  1. Clone the Repository
  # Clone the project to your local machine:

    git clone https://github.com/your-username/PDFXplorer.git
    cd PDFXplorer
    
  2. Install Dependencies
  Install all required dependencies using npm:

    npm install
    
  3. Running the Development Server
  To start the development server, run the following command:

    npm run dev
  The application will be accessible at http://localhost:3000.

# Project Structure
PDFXplorer/
├── public/
│   └── document.pdf           # Sample PDF file
├── src/
│   ├── assets/                # Any static assets like images or fonts
│   ├── components/            # Reusable components (e.g., Loader, Canvas)
│   ├── App.tsx                # Main App component
│   ├── App.css                # tailwindCss styles classes
│   ├── main.tsx               # Application entry point
│   └── index.css              # TailwindCSS custom styles
├── .gitignore                 # Git ignore file
├── index.html                 # HTML entry file
├── package.json               # Project dependencies and scripts
└── tailwind.config.js         # TailwindCSS configuration



# Usage
 # Viewing PDFs
To view a PDF in the application, place your PDF file in the public folder or use a URL to fetch the PDF dynamically. The app uses PDF.js to load and render the document pages onto HTML Canvas elements.

By default, the app will load a sample PDF file located at /document.pdf. You can change the URL in the App.tsx file if you want to use a different PDF.

# PDF.js Configuration
The app is configured to use PDF.js by setting the worker source like this:

    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

This is important for enabling multi-threading during the PDF rendering process. Make sure that the pdf.worker.min.js file is available in your project. I have copied it from node_modules folder > pdfjs-dist > build > pdf.worker.min.js and pasted it into public folder for global use. You can import it directly instead.

 # Rendering Pages
The App.tsx component fetches the PDF document, extracts the number of pages, and renders each page onto a canvas:
  const renderPage = async (pdf: any, pageNum: number) => {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1 });
    const rotation = page.rotate;
    const scaleX = width / viewport.width;
    const scaleY = height / viewport.height;
    const scale = Math.min(scaleX, scaleY);
    const scaledViewport = page.getViewport({ scale, rotation });
  
    const canvas: any = pagesRef.current[pageNum - 1];
    const context = canvas.getContext("2d");
  
    // Set canvas dimensions and render the page
    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;
  
    const renderContext = {
      canvasContext: context,
      viewport: scaledViewport,
    };
  
    await page.render(renderContext).promise;
  };

# Contributing
I welcome contributions to PDFXplorer! If you'd like to contribute, please follow these steps:

 1. Fork the repository on GitHub.
 2. Clone your fork to your local machine.
 3. Create a branch for your feature or bugfix.
 4. Make your changes and commit them.
 5. Push your branch to your fork.
 6. Submit a pull request.
    
# Acknowledgments
 * Vite: A modern, fast, and optimized build tool.
 * React: A JavaScript library for building user interfaces.
 * Tailwind CSS: A utility-first CSS framework for creating custom designs without writing custom CSS.
 * PDF.js: A powerful library for rendering PDF documents in the browser using HTML5.
 * Typescript: A syntactic superset of JavaScript which adds static typing.

