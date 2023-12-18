import logo from "../logo.svg";
import home_image1 from "../images/home_image2.png";
import home_image2 from "../images/home_image1.jpg";
import home_back from "../images/homeBack.jpg";
import one from "../images/1.jpg";
import two from "../images/2.jpg";
import three from "../images/3.jpg";
import four from "../images/4.jpg";

export function Home() {
  let images = [
    one,
    two,
    four,
    three,
    one,
    two,
    four,
    three,
    two,
    four,
    one,
    three,
    one,
    two,
    three,
    four,
    two,
    home_image2,
    two,
    home_image2,
    one,
    home_image2,
    four,
    two,
    three,
    one,
    four,
    home_image2,
    two,
    home_image2,
    one,
    home_image2,
    two,
    home_image2,
    one,
    home_image2,
    three,
    home_image2,
    two,
    home_image2,
    one,
    two,
  ];
  return (
    <div>
      <div className="title_container">
        <h1 className="website_title">XTREME FITNESS</h1>
        <h2 className="sub_title">
          <strong>Dead</strong> last finish is greater than did not finish,
          which trumps did not <strong>start.</strong>
        </h2>
        <img
          className="background_image"
          src={home_back}
          width="100%"
          height="500px"
        />
      </div>

      <img className="image" src={home_image2} width="100%" />
      <div className="multi_image_container">
        {images.map((image, index) => {
          return <img className="multi_image" src={image} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Home;
