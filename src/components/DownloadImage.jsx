import React from "react";

import html2canvas from "html2canvas";

const downloadImage = () => {
  const element = document.querySelector(".tshirt-container");
  html2canvas(element).then((canvas) => {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "tshirt_with_logo.png";
    link.click();
  });
};

const DownloadImage = () => {
  return (
    <button className="submit-design" onClick={downloadImage}>
      Submit Design
    </button>
  );
};
export default DownloadImage;
