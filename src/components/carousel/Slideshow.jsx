import Carousel from 'react-bootstrap/Carousel';

function Slideshow() {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_Dairy_460px-011222.jpg?tr=w-3840,q=80"
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.bigbasket.com/media/uploads/banner_images/HP_EMF_M_WeekendHyderabad-1600x460-221202.png?tr=w-3840,q=80"
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.bigbasket.com/media/uploads/banner_images/hp_m_GOURMETPL_GoodDiet_460px-011222.jpg?tr=w-3840,q=80"
          alt="Third slide"
        />

        
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;