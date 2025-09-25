import { useState } from 'react';
import { uploadImage, fetchLatestImage } from './api';
import ImagePreview from './ImagePreview';

const UploadForm = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);

    try {
      await uploadImage(formData);
      const res = await fetchLatestImage();
      const imageUrl = URL.createObjectURL(res.data);
      setPreviewUrl(imageUrl);
    } catch (err) {
      alert('❌ Upload or fetch failed');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      <ImagePreview imageUrl={previewUrl} />
    </div>
  );
};

export default UploadForm;