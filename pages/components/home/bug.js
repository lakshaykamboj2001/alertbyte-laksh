import React from 'react'
import Image from 'next/image'


const Bug = () => {
  return (
    <>
    <section className='home-bug'>
        <div className="container">
          <p className='sec-sub-title'>Lorem Ipsum Consectetur Adipiscing Elit!</p>
          <h2 className='sec-title'>Lorem Ipsum Consectetur Adipiscing Elit!</h2>
          <div className="row">
            <div className="col-md-3">
                <div className="bug-cont">
                    <div className="img-div">
                        <Image
                        src="/global/bug.png"
                        width={36}
                        height={36}
                        alt=""
                        />
                    </div>
                    <h2 className='bug-num'>$123</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="bug-cont">
                    <div className="img-div">
                        <Image
                        src="/global/bug.png"
                        width={36}
                        height={36}
                        alt=""
                        />
                    </div>
                    <h2 className='bug-num'>$123</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="bug-cont">
                    <div className="img-div">
                        <Image
                        src="/global/bug.png"
                        width={36}
                        height={36}
                        alt=""
                        />
                    </div>
                    <h2 className='bug-num'>$123</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="bug-cont">
                    <div className="img-div">
                        <Image
                        src="/global/bug.png"
                        width={36}
                        height={36}
                        alt=""
                        />
                    </div>
                    <h2 className='bug-num'>$123</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
            
          </div>
        </div>
    </section>
    </>
  )
}

export default Bug
