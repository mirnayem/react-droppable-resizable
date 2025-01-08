import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
const MAX_WIDTH = 200; 
const MAX_HEIGHT = 200;
const MIN_WIDTH = 50;
const MIN_HEIGHT = 50;

const DraggableLogo = ({ logo, position }) => {
  const [, drag] = useDrag({
    type: "LOGO",
    item: { type: "LOGO" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const imageRef = useRef(null);

  const [size, setSize] = useState({ width: 50, height: 50 });


  const handleResize = () => {

    const onMouseMove = (moveEvent) => {
      const newWidth =
        moveEvent.clientX - imageRef.current.getBoundingClientRect().left;
      const aspectRatio = size.width / size.height;
      const newHeight = newWidth / aspectRatio;
      setSize({
        width: Math.min(Math.max(newWidth, MIN_WIDTH), MAX_WIDTH),
        height: Math.min(Math.max(newHeight, MIN_HEIGHT), MAX_HEIGHT),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        cursor: "move",
        border: "1px solid #ccc",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <img
        ref={imageRef}
        src={logo}
        alt="Draggable and Resizable"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        onMouseDown={handleResize}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "se-resize",
        }}
      />
    </div>
  );
};

export default DraggableLogo;
