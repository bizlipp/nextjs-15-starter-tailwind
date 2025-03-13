"use client";
import { useState } from "react";
import AccessPanel from "./access-panel";
import DraggablePanel from "./draggable-panel";
import FormBuilder from "@/app/components/FormBuilder";

export default function LabEntry() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      {!unlocked ? (
        <AccessPanel onUnlock={() => setUnlocked(true)} />
      ) : (
        <LabWorkbench />
      )}
    </div>
  );
}

function LabWorkbench() {
  const [code, setCode] = useState(`
    const App = () => React.createElement("h1", { style: { color: "lime", fontSize: "24px" } }, "🔥 Hello, Nexus TechWorks!");
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
  `);

  const loadCode = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
    };
    reader.readAsText(file);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "nexus-code.jsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const runCode = () => {
    const iframe = document.getElementById("preview-iframe");
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <html>
        <head>
          <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        </head>
        <body>
          <div id="root"></div>
          <script>
            function waitForReact(callback) {
              if (typeof React !== "undefined" && typeof ReactDOM !== "undefined") {
                callback();
              } else {
                setTimeout(() => waitForReact(callback), 50);
              }
            }

            waitForReact(() => {
              try {
                ${code}
              } catch (error) {
                document.getElementById("root").innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
              }
            });
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
  };

  return (
    <div className="relative w-3/4 h-3/4 bg-[#101820] border border-green-500 rounded-lg p-6 shadow-lg">
      <h1 className="text-green-400 text-3xl text-center mb-4">🛠️ Nexus TechWorks Lab</h1>
      <p className="text-green-300 text-center mb-4">Write JSX code below and click 'Run' to execute it!</p>

      <DraggablePanel title="Live Code Editor">
        <p className="text-green-400">Write JSX Code Below:</p>
        <textarea
          className="w-full h-32 p-2 border border-green-500 bg-black text-green-300 rounded-md font-mono mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Type JSX here..."
        />

        <div className="mt-4 flex gap-4">
          <button
            onClick={runCode}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            Run Code
          </button>
          <button
            onClick={downloadCode}
            className="bg-blue-500 text-black px-4 py-2 rounded-lg hover:bg-blue-400 transition"
          >
            Save As...
          </button>
          <input
            type="file"
            accept=".jsx,.txt"
            onChange={loadCode}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-green-500 text-black px-4 py-2 rounded-lg hover:bg-green-400 transition cursor-pointer"
          >
            Load File
          </label>
        </div>

        <div className="border border-green-500 bg-[#0d1a17] p-4 rounded-md mt-2">
          <p className="text-green-400">Live Preview:</p>
          <iframe id="preview-iframe" className="w-full h-64 bg-black"></iframe>
        </div>
      </DraggablePanel>

      <DraggablePanel title="Form Builder">
        <FormBuilder />
      </DraggablePanel>
    </div>
  );
}
