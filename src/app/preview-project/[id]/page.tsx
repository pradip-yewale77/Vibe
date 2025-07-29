"use client";

import React, { useEffect, useRef } from "react";
import * as Babel from "babel-standalone"; // make sure to install this

const reactCode = `
  function App() {
    const [count, setCount] = React.useState(0);
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Hello from React!</h1>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
`;

export default function Page() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const transpiled = Babel.transform(reactCode, {
            presets: ["react"], // remove "env"
        }).code;

        const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Preview</title>
      </head>
      <body>
        <div id="root"></div>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script type="text/javascript">
          ${transpiled}
        </script>
      </body>
      </html>
    `;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        if (iframeRef.current) {
            iframeRef.current.src = url;
        }

        return () => {
            URL.revokeObjectURL(url);
        };
    }, []);

    return (
        <div>
            <h1>React Live Preview (No Watermark)</h1>
            <iframe
                ref={iframeRef}
                sandbox="allow-scripts"
                style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
            />
        </div>
    );
}
