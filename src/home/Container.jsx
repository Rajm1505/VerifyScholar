import React from "react";
import "../login/page.css";
import banner from "../images/banner.jpg";
import page2 from "../images/page2.jpeg";
import Carousel from "react-bootstrap/Carousel";

const Container = () => {
  return (
    <>
      {/* <div className="">
				<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
					<div className="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
					</div>
					<div className="carousel-inner">
						<div className="carousel-item bg-blue position-relative active">
							<img src={banner} className="w-100" />
							<a href="#" className="register-btn text-capitalize fs-7 fw-bold text-dark fs-5">Register Now</a>
						</div>
						<div className="carousel-item">
							<img src="https://cbpssubscriber.mygov.in/assets/uploads/3rpbtfC38B9muoRQ?99" className="d-block w-100" alt="Pariksha pe charcha" />
						</div>
					</div>
					<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
			</div> */}

      <Carousel interval="2000" touch="true" fade="true">
        <Carousel.Item touch="true">
          <img className="d-block w-100" src={page2} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item touch="true">
          <img className="d-block w-100" src={banner} alt="Second slide" />
          <a href="/register" className="register-btn fw-bold text-dark fs-5">
            Register Now
          </a>
        </Carousel.Item>
      </Carousel>

      <div className="bg-light py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-md-4 my-3 col-sm-11">
              <div className="bg-white rounded shadow-md social-tiles">
                <div className="facebook-responsive">
                  <iframe
                    title="myFrame"
                    className="border"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMOSJANDE%2F&tabs=timeline&width=400&height=590&small_header=false&adapt_container-md_width=true&hide_cover=false&show_facepile=true&appId"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-md-4 my-3 col-sm-11">
              <div className="bg-white rounded shadow-md social-tiles">
                <div className="facebook-responsive">
                  <iframe
                    title="myFrame1"
                    data-tweet-url="https://twitter.com/MSJEGOI"
                    src="data:text/html;charset=utf-8,%3Ca%20class%3D%22twitter-timeline%22%20href%3D%22https%3A//twitter.com/MSJEGOI%3Fref_src%3Dtwsrc%255Etfw%22%3ETweets%20by%20MSJEGOI%3C/a%3E%0A%3Cscript%20async%20src%3D%22https%3A//platform.twitter.com/widgets.js%22%20charset%3D%22utf-8%22%3E%3C/script%3E%0A"
                  ></iframe>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4 my-3 col-sm-11">
              <div className="bg-white rounded shadow-md social-tiles">
                <div className="facebook-responsive">
                <iframe style="width: 100%; height: 100px; overflow: show;" src="https://twitter.com/sih2022_mic?lang=en" width="100" height="100" scrolling="yes">Iframes not supported</iframe>
                </div>
              </div>
            </div> */}


            {/* <div className="col-md-4 my-3">
							<div className="bg-white p-2 rounded shadow-md social-tiles">
								<div className="border">
									<iframe className="twitter-timeline" href="https://twitter.com/MSJEGOI?ref_src=twsrc%5Etfw" ></iframe>
									<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
								</div>
							</div>
						</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
