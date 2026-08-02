import { Fragment } from "react/jsx-runtime";
import "bootstrap";
import style from "./contact.module.scss";
import Subheader from "../subheader/subheader";

function Contact() {
  return (
    <Fragment>
      <section>
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
              <h2 className={style.heading}>Initiate Project</h2>
              <p className={style.description}>
                Ready to accelerate your digital transformation? Our technology
                experts are ready to discuss your vision and develop a roadmap
                tailored to your business.
              </p>
            </div>
            <div className="col-lg-8 w-50 mx-auto" id={style.contactForm}>
              <form className="row g-2 align-items-center">
                <div className="col-md-5">
                  <label htmlFor="inputEmail4" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                  />
                </div>
                <div className="col-md-7">
                  <label htmlFor="inputPassword4" className="form-label">
                    Email
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword4"
                  />
                </div>
                <div className="col-12 pt-2">
                  <label htmlFor="inputAddress" className="form-label">
                    Interested Service(s)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Contact;
