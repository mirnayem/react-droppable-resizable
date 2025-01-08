import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import DesignTshirt from "../components/DesignTshirt";

const ProductDesign = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DesignTshirt />
    </DndProvider>
  );
};

export default ProductDesign;
