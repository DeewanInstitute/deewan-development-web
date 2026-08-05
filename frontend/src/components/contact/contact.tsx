import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import type { FormEvent } from "react";
import "bootstrap";
import style from "./contact.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Something went wrong. Please try again later.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again later.",
      );
    }
  };

  return (
    <Fragment>
      <USALProvider>
        <section id="contact">
          <div className="mx-auto py-5" id={style.contact}>
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
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
                <div className="d-flex flex-column gap-3 pt-4 pb-4">
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

              <div data-usal="fade-r delay-200" className="col-12 col-lg-8 w-50 mx-auto" id={style.contactForm}>
                <form className="row g-2 align-items-center" onSubmit={handleSubmit}>
                  <div className="col-md-5">
                    <label htmlFor="inputEmail4" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      name="fullName"
                      placeholder="John Doe"
                      required
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
                      name="email"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>
                  <div className="col-12 pt-2">
                    <label htmlFor="inputAddress" className="form-label">
                      Interested Service(s)
                    </label>
                    <select className="form-select" id="inputGroupSelect01" name="service" defaultValue="">
                      <option value="" disabled>
                        Choose...
                      </option>
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
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
                      name="message"
                      placeholder="1234 Main St"
                      required
                    />
                  </div>
                  {status === "success" && (
                    <div className="col-12 pt-2">
                      <p className={style.statusSuccess}>
                        Thanks — your message has been sent. We'll be in touch soon.
                      </p>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="col-12 pt-2">
                      <p className={style.statusError}>{errorMessage}</p>
                    </div>
                  )}
                  <div className="col-12 mt-5">
                    <button
                      type="submit"
                      className={`btn ${style.submitBtn}`}
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? "SENDING..." : "SEND INQUIRY"}
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
