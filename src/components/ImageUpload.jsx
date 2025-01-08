import React, { useState } from "react";

const ImageUpload = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    onImageSelect(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageSelect(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.uploadBox}>
        {!selectedImage ? (
          <>
            <label htmlFor="imageInput" style={styles.label}>
              <span style={styles.uploadText}>Click to upload an image</span>
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={styles.input}
              onChange={handleImageChange}
            />
          </>
        ) : (
          <div style={styles.previewContainer}>
            <img
              src={selectedImage}
              alt="Uploaded"
              style={styles.imagePreview}
            />
            <button onClick={handleRemoveImage} style={styles.removeButton}>
              Remove Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    marginTop: "20px",
    backgroundColor: "#f4f4f4",
  },
  uploadBox: {
    width: "300px",
    height: "300px",
    border: "2px dashed #ccc",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#fff",
  },
  label: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  uploadText: {
    color: "#888",
    fontSize: "16px",
    marginTop: "10px",
  },
  input: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
  previewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: '200px',
    width: '200px',
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "10px",
  },
  removeButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ImageUpload;
