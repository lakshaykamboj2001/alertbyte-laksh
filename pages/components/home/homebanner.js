import Link from "next/link"
import Image from 'next/image'


export default function HomeBanner() {
  return (
    <>
    <section className="home-banner">
      <div className="container">
        <div className="row g-4 hb-row1">
          <div className="col-lg-7">
            <h1 className="main-title">Lorem ipsum dolor <span>sit amet adipisicing elit</span></h1>
            <p className="sec-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id sapien feugiat, volutpat dui eu, maximus libero. Donec tincidunt enim id nisi vehicula feugiat. Vivamus sit amet augue sit amet erat bibendum tristique.</p>
          </div>
           <div className="col-lg-5 r-img">
            <div className="img-div ">
             <Image
                src="/sample.jpg"
                width={420}
                height={420}
                alt=""
             />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}