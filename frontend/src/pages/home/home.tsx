import About from "../components/about/about";
import Competencies from "../components/competencies/competencies";
import Contact from "../components/contact/contact";
import Footer from "../components/footer/footer";
import Hero from "../components/hero/hero";
import HorizontalScroll from "../components/horizontalScroll/horizontalScroll";
import Portfolio from "../components/portfolio/portfolio";
import Team from "../components/team/team";

const slides = [
  { id: "hero", node: <Hero /> },
  { id: "about", node: <About /> },
  { id: "team", node: <Team /> },
  { id: "services", node: <Competencies /> },
  { id: "portfolio", node: <Portfolio /> },
  { id: "contact", node: <Contact /> },
  { id: "footer", node: <Footer /> },
];

function Home() {
  return <HorizontalScroll slides={slides} />;
}
export default Home;
