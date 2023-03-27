import './Image.css';

interface ImageType {
  images: string[];
}

const ImageContainer = ({ images }: ImageType) => {
  return (
    <div className="image-container">
    {images.length <= 1 && (
      <div className='solo-wrapper'>   
      <img
        src={images[0]}
        alt="Item"
        className="full-image"
      />
      </div>
    )}
    {images.length > 1 && (
      <div className='image-wrapper'>     
      <img
        src={images[0]}
        alt="First Item"
        className="image-item"
      />
      <img
        src={images[1]}
        alt="Second Item"
        className="image-item"
      />
      </div>
    )}
  </div>
  );
}

export default ImageContainer;