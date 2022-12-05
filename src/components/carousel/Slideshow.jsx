import Carousel from 'react-bootstrap/Carousel';

function Slideshow() {
  return (
    <Carousel controls={false} interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/1smFtSN/Whats-App-Image-2022-12-05-at-6-34-01-PM-1.jpg"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/K6dJrjx/Whats-App-Image-2022-12-05-at-6-34-01-PM.jpg"
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/yWkNrC7/Whats-App-Image-2022-12-05-at-6-34-02-PM-1.jpg"
          alt="Third slide"
        />

        
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.ibb.co/0cRNqgT/Whats-App-Image-2022-12-05-at-6-34-02-PM.jpg"
          alt="Fourth slide"
        />

        
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;