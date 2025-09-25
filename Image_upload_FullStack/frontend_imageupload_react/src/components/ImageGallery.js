import { useEffect, useState } from 'react';
import { fetchAllImages } from './api';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const res = await fetchAllImages();
      setImages(res.data);
    };
    loadImages();
  }, []);

  return (
    <div>
      <h3>🖼️ All Uploaded Images:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map(img => (
          <div key={img._id}>
            <img
              src={`data:${img.contentType};base64,${img.data}`}
              alt={img.name}
              style={{ width: '150px', borderRadius: '8px' }}
            />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;