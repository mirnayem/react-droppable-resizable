import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableLogo from "./DraggableLogo";
import DownloadImage from "./DownloadImage";
import "../../src/App.css";
import ImageUpload from "./ImageUpload";

const DesignTshirt = () => {
  const [logoPosition, setLogoPosition] = useState({ x: 250, y: 150 });
  const [uploadedLogo, setUploadedLogo] = useState(null);

  const [, drop] = useDrop({
    accept: "LOGO",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = logoPosition.x + delta.x;
      const newY = logoPosition.y + delta.y;
      setLogoPosition({ x: newX, y: newY });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleLogoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="tshirt-canvas">
      <div ref={drop} className="tshirt-container">
        {uploadedLogo && (
          <DraggableLogo logo={uploadedLogo} position={logoPosition} />
        )}
      </div>
      <div className="drop-logo-submit">
        <div className="upload-file">
          <label>Upload your preferred logo</label>
          <ImageUpload onImageSelect={handleLogoUpload} />
        </div>
        <DownloadImage />
      </div>
    </div>
  );
};

export default DesignTshirt;
