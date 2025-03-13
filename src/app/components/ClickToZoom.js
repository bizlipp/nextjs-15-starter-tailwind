import { useState } from "react";

export default function ClickToZoom({ children }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div
      className={`transition-transform duration-700 ${
        zoomed ? "scale-125 translate-y-[-10%]" : "scale-100"
      }`}
      onClick={() => setZoomed(!zoomed)}
    >
      {children}
    </div>
  );
}
