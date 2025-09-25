const ImagePreview = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div>
      <h4>📸 Uploaded Image:</h4>
      <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
    </div>
  );
};

export default ImagePreview;