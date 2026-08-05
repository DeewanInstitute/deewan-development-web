import { Fragment } from "react/jsx-runtime";
import "bootstrap";
import style from "./contact.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

function Contact() {
  return (
    <Fragment>
      <USALProvider>
        <section id="contact">
          <div className="mx-auto py-5" id={style.contact}>
            <div className="row align-items-center">
              <div className="col-lg-4">
                <Subheader
                  data={{
                    title: "CONTACT US",
                    color: "#0a5c61",
                    backgroundColor: "#ffffff",
                  }}
                />
                <h2  data-usal="fade-l delay-200"className={style.heading}>Initiate Project</h2>
                <p data-usal="fade-l delay-200" className={style.description}>
                  Ready to accelerate your digital transformation? Our
                  technology experts are ready to discuss your vision and
                  develop a roadmap tailored to your business.
                </p>
                <div className="d-flex flex-column gap-3 pt-4">
                  <div data-usal="fade-l delay-200" className="row align-items-center" id={style.iconRow}>
                    <div className="col-auto">
                      <img src="/assets/images/icons/email.webp" alt="Email" />
                    </div>
                    <div className="d-flex flex-column col">
                      <span className={style.light}>EMAIL</span>
                      <span className={style.dark}>
                        project@deewandevelopment.com
                      </span>
                    </div>
                  </div>
                  <div data-usal="fade-l delay-400" className="row align-items-center" id={style.iconRow}>
                    <div className="col-auto">
                      <img
                        src="/assets/images/icons/telephone.webp"
                        alt="Phone"
                      />
                    </div>
                    <div className="d-flex flex-column col">
                      <span className={style.light}>PHONE NUMBER</span>
                      <span className={style.dark}>(962) 7-7820-2081</span>
                    </div>
                  </div>
                  <div data-usal="fade-l delay-600" className="row align-items-center" id={style.iconRow}>
                    <div className="col-auto">
                      <img
                        src="/assets/images/icons/location.webp"
                        alt="Location"
                      />
                    </div>
                    <div className="d-flex flex-column col">
                      <span className={style.light}>LOCATION</span>
                      <span className={style.dark}>
                        11191, Al-Baouneyah St. 14, Amman
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div data-usal="fade-r delay-200" className="col-lg-8 w-50 mx-auto" id={style.contactForm}>
                <form  className="row g-2 align-items-center">
                  <div className="col-md-5">
                    <label htmlFor="inputEmail4" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="col-md-7">
                    <label htmlFor="inputPassword4" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="col-12 pt-2">
                    <label htmlFor="inputAddress" className="form-label">
                      Interested Service(s)
                    </label>
                    <select className="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-12 pt-2">
                    <label htmlFor="inputAddress" className="form-label">
                      Message
                    </label>
                    <textarea
                      rows={10}
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                    />
                  </div>
                  <div className="col-12 mt-5">
                    <button type="submit" className={`btn ${style.submitBtn}`}>
                      SEND INQUIRY
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </USALProvider>
    </Fragment>
  );
}

export default Contact;
