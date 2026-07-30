import { Fragment } from "react/jsx-runtime";
import "bootstrap";

function Team() {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-lg-4">
            <svg
              aria-label="Placeholder"
              className="bd-placeholder-img rounded-circle"
              height="140"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              width="140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Placeholder</title>
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <h2 className="fw-normal">Heading</h2>{" "}
            <p>
              Some representative placeholder content for the three columns of
              text below the carousel. This is the first column.
            </p>{" "}
            <p>
              <a className="btn btn-secondary" href="#">
                View details »
              </a>
            </p>{" "}
          </div>
          <div className="col-lg-4">
            {" "}
            <svg
              aria-label="Placeholder"
              className="bd-placeholder-img rounded-circle"
              height="140"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              width="140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Placeholder</title>
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <h2 className="fw-normal">Heading</h2>{" "}
            <p>
              Another exciting bit of representative placeholder content. This
              time, we've moved on to the second column.
            </p>{" "}
            <p>
              <a className="btn btn-secondary" href="#">
                View details »
              </a>
            </p>{" "}
          </div>
          <div className="col-lg-4">
            <svg
              aria-label="Placeholder"
              className="bd-placeholder-img rounded-circle"
              height="140"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              width="140"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Placeholder</title>
              <rect
                width="100%"
                height="100%"
                fill="var(--bs-secondary-color)"
              ></rect>
            </svg>{" "}
            <h2 className="fw-normal">Heading</h2>{" "}
            <p>
              And lastly this, the third column of representative placeholder
              content.
            </p>{" "}
            <p>
              <a className="btn btn-secondary" href="#">
                View details »
              </a>
            </p>{" "}
          </div>{" "}
        </div>
      </div>
    </Fragment>
  );
}

export default Team;
