import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";

// Set the workerSrc for PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const App = () => {
  const pdfUrl = "/document.pdf"; // PDF URL
  const width = 600; // Canvas width
  const height = 800; // Canvas height

  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfInstance, setPdfInstance] = useState<any>(null);
  const pagesRef = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);

      try {
        console.log("Loading PDF from URL:", pdfUrl); 
        // Load the PDF document
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        setNumPages(pdf.numPages);
        setPdfInstance(pdf);

        // Render pages sequentially
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          await renderPage(pdf, pageNum); // Ensure each page is rendered sequentially
        }
      } catch (error) {
        console.error("Error loading PDF:", error); // Log the error
      } finally {
        setLoading(false);
      }
    };

    const renderPage = async (pdf: any, pageNum: number) => {
      try {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });

        // Get the rotation of the page (0, 90, 180, 270 degrees)
        const rotation = page.rotate;

        // Scale the canvas to fit the page
        const scaleX = width / viewport.width;
        const scaleY = height / viewport.height;
        const scale = Math.min(scaleX, scaleY);

        // Apply the rotation to the viewport
        const scaledViewport = page.getViewport({ scale, rotation });

        const canvas: any = pagesRef.current[pageNum - 1];
        const context = canvas.getContext("2d");

        // Ensure no previous rendering is happening on the same canvas
        if (canvas.renderTask) {
          await canvas.renderTask.promise; // Wait for any active rendering to finish
        }

        // Set canvas dimensions according to the scaled and rotated viewport
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        // Render the page on the canvas with the correct rotation
        const renderTask = page.render(renderContext);
        canvas.renderTask = renderTask; // Store the active rendering task for this canvas

        await renderTask.promise; // Wait for the current page to render completely
      } catch (error) {
        console.error(`Error rendering page ${pageNum}:`, error);
      }
    };

    loadPdf();
  }, [pdfUrl, width, height]);

  // return (
  //   <div className="min-h-screen bg-blue-900 flex justify-center items-center">
  //     <div className="w-full max-w-4xl bg-white flex flex-col justify-center items-center text-center p-4 relative mt-4 mb-4 rounded-md mobileView ">
  //       <div className="flex-grow w-full max-w-4xl mx-auto mt-4 bg-gray">
  //         <div className="bg-white rounded-lg shadow-lg p-4">
  //           <div className="overflow-x-auto">
  //             {loading && (
  //               <div className="flex justify-center">
  //                 <div className="loader">Loading...</div>
  //               </div>
  //             )}
  //             {Array.from(new Array(numPages), (el, index) => (
  //               <div
  //                 key={`page_${index + 1}`}
  //                 className="border border-gray-300 rounded-lg mb-4 p-2"
  //               >
  //                 <div className="flex justify-center items-center">
  //                   <canvas
  //                     ref={(el) => (pagesRef.current[index] = el!)}
  //                     className="max-w-full h-auto" // Ensures the canvas is responsive
  //                   />
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    // <div className="min-h-screen w-full bg-blue-900 flex justify-center items-center ">
    //   <div className="w-full max-w-4xl bg-white flex flex-col justify-center items-center text-center p-4 relative mt-4 mb-4 rounded-md mobileView desktopView">
<div className="min-h-screen bg-blue-900 flex justify-center items-center" >
    {/* <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white flex flex-col justify-center items-center text-center p-4 relative"> */}
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white flex flex-col justify-center items-center text-center p-4 relative mt-4 mb-4 rounded-md mobileViewOnlyLogin">
   
        <div className="flex-grow w-full max-w-4xl mx-auto mt-4 bg-gray">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="overflow-x-auto">
              {loading && (
                <div className="flex justify-center">
                  <div className="loader">Loading...</div>
                </div>
              )}
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="border border-gray-300 rounded-lg mb-4 p-2"
                >
                  <div className="flex justify-center items-center">
                    <canvas
                      ref={(el) => (pagesRef.current[index] = el!)}
                      className="max-w-full h-auto" // Ensures the canvas is responsive
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
  

};

export default App;
