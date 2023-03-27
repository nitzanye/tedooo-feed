import './Image.css';

interface ImageType {
  images: string[];
}

const ImageContainer = ({ images }: ImageType) => {
  const firstTwoImages = images.slice(0, 2); 

  return (
    <div className="image-container">
      {firstTwoImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Item ${index}`}
          className={`image-item ${firstTwoImages.length > 1 ? 'multiple-images' : ''}`}
        />
      ))}
    </div>
  );
}

export default ImageContainer;