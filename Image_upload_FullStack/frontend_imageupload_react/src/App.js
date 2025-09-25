import UploadForm from './components/UploadForm';
import ImageGallery from './components/ImageGallery';

function App() {
  return (
    <div>
      <h2>📷 Upload & View All Photos</h2>
      <UploadForm />
      <hr />
      <ImageGallery />
    </div>
  );
}

export default App;