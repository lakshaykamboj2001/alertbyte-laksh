import React from 'react'
import Image from 'next/image'
import Link from 'next/link'  
// import { FiChevronRight } from 'react-icons/fi';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from 'next/dynamic';
import { FaChevronRight, FaTimes } from 'react-icons/fa';


var $ = require('jquery');
if (typeof window !== 'undefined') {
  window.$ = window.jQuery = require('jquery');
}
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});
const Responsive_fa = {
  0: {items: 1,margin:5},
  768: {items: 2,margin:10},
  1024: {
    items: 3,
    margin:20,
    // loop:true,
    dots:true,
    // autoplay:true,
    dotsEach: true,
  }
}


const Blog = () => {
  return (
    <>
    <section>
        <div className="container">
            <p className='sec-sub-title'>Lorem Ipsum Consectetur Adipiscing Elit!</p>
            <h2 className='sec-title'>Lorem Ipsum Consectetur Adipiscing Elit!</h2>
            <div className="row">
            <div className="col-md-6">
                <div className="side-content">
                    <p className="sec-para-title">Wallet/Smart Contract Monitoring</p>
                    <p className='ser-abt'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit sollicitudin faucibus at nec tortor. Quisque nec leo a lacus dapibus Donec pellentesque ullamcorper pretium. Etiam vitae lacinia turpis, in auctor elit. Maecenas sed commodo urna. Sed vel quam enim. cursus.</p>
                    <div className="btn-div">
                        <Link href='/' className='btn-emp'> Read Blog<FaChevronRight/> </Link>
                    </div>
                </div>
              </div>
              <div className="col-md-6 r-img">
                <div className="img-div">
                <Image
                src="/sample.jpg"
                width={420}
                height={420}
                alt=""
                />
                </div>
              </div>
            </div>

            <OwlCarousel className="owl-choose" responsive={Responsive_fa}>
            <div className="testi-item" >
              <div className="img-div ">
                <img src="/sample.jpg" alt="" />   
              </div>
              <div className="carousal-cnt">
                 <p className='sec-para-title'>Lorem, ipsum dolor sit amet, consectetur adipisicing elit.</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit</p>
                 <div className="btn-div">
                      <Link href='/' className='btn-emp'> Read Blog <FaChevronRight/> </Link>
                  </div>
              </div>
            </div>
            <div className="testi-item" >
              <div className="img-div ">
                <img src="/sample.jpg" alt="" />   
              </div>
              <div className="carousal-cnt">
                 <p className='sec-para-title'>Lorem, ipsum dolor sit amet, consectetur adipisicing elit.</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit</p>
                 <div className="btn-div">
                      <Link href='/' className='btn-emp'>
                      Read Blog <FaChevronRight/>
                      </Link>
                  </div>
              </div>
            </div>
            <div className="testi-item" >
              <div className="img-div ">
                <img src="/sample.jpg" alt="" />   
              </div>
              <div className="carousal-cnt">
                 <p className='sec-para-title'>Lorem, ipsum dolor sit amet, consectetur adipisicing elit.</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit</p>
                 <div className="btn-div">
                      <Link href='/' className='btn-emp'>
                      Read Blog<FaChevronRight/>
                      </Link>
                  </div>
              </div>
            </div>
            </OwlCarousel>
        </div>
    </section>
      
    </>
  )
}

export default Blog;