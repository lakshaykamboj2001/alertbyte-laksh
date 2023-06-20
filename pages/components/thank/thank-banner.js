export default function ThankBanner() {
  return (
    <>
    <section className="Thank-banner">
      <div className="container">
        <div className="row g-4 hb-row1">
          <div className="col-lg-7">
            <h1 className="sec-title main-title">Thank You</h1>
            <p className="sec-p">We are glad to receive your query! One of our team members will connect with you shortly and answer any questions you may have. Your security concerns are our highest priority now. Let’s get this journey started!</p>
            <div className="btn-div">
              {/* <button className="btn btn-fill" type="button">Explore Our Services</button> */}
              <a className="btn btn-fill" href="/services/">Explore Our Services</a>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="img-div sca-img-div">
            <img src="/images/hero/thank-you-page.png" alt="thank you page" />
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  )
}