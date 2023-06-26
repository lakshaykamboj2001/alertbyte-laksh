import React,{ useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Choose = () => {
 
  return (
    <>
    <section className='choose-us'>
        <div className="container">
           <p className='sec-sub-title'>Lorem Ipsum Consectetur Adipiscing Elit!</p>
           <h2 className='sec-title'>Why Choose Us?</h2>
           <div className="row">
            <div className="col-md-6">

                <div className="hovr-choose" >
                    <div className="img-div">
                     <Image src="/global/connection.png" width={50} height={50} alt=""/>
                    </div>
                    <h3 className="hovr-head">Lorem Ipsu Consectetm Dolor Sit Amet</h3>
                    <div className="hvr-cnty">
                    <h3 className="new-heading">New Heading</h3>
                    <p className="new-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit sollicitudin faucibus at nec tortor. Quisque nec leo a lacus dapibus Donec pellentesque ullamcorper pretium. Etiam vitae lacinia turpis, in auctor elit. Maecenas sed commodo urna. Sed vel quam enim. cursus.</p>
                    </div>
                </div>

                <div className="hovr-choose" >
                    <div className="img-div">
                     <Image src="/global/connection.png" width={50} height={50} alt=""/>
                    </div>
                    <h3 className="hovr-head">Lorem Ipsu Consectetm Dolor Sit Amet</h3>
                    <div className="hvr-cnty">
                    <h3 className="new-heading">New Heading</h3>
                    <p className="new-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit sollicitudin faucibus at nec tortor. Quisque nec leo a lacus dapibus Donec pellentesque ullamcorper pretium. Etiam vitae lacinia turpis, in auctor elit. Maecenas sed commodo urna. Sed vel quam enim. cursus.</p>
                    </div>
                </div>


                <div className="hovr-choose" >
                    <div className="img-div">
                     <Image src="/global/connection.png" width={50} height={50} alt=""/>
                    </div>
                    <h3 className="hovr-head">Lorem Ipsu Consectetm Dolor Sit Amet</h3>
                    <div className="hvr-cnty">
                    <h3 className="new-heading">New Heading</h3>
                    <p className="new-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit sollicitudin faucibus at nec tortor. Quisque nec leo a lacus dapibus Donec pellentesque ullamcorper pretium. Etiam vitae lacinia turpis, in auctor elit. Maecenas sed commodo urna. Sed vel quam enim. cursus.</p>
                    </div>
                </div>


                <div className="hovr-choose" >
                    <div className="img-div">
                     <Image src="/global/connection.png" width={50} height={50} alt=""/>
                    </div>
                    <h3 className="hovr-head">Lorem Ipsu Consectetm Dolor Sit Amet</h3>
                    <div className="hvr-cnty">
                    <h3 className="new-heading">New Heading</h3>
                    <p className="new-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat purus justo, sit amet tincidunt massa cursus vel. Donec et ipsum nec velit sollicitudin faucibus at nec tortor. Quisque nec leo a lacus dapibus Donec pellentesque ullamcorper pretium. Etiam vitae lacinia turpis, in auctor elit. Maecenas sed commodo urna. Sed vel quam enim. cursus.</p>
                    </div>
                </div>

               
            </div>
           </div>
        </div>
    </section>
    </>
  )
}

export default Choose
