import About from "../components/about/about";
import Competencies from "../components/competencies/competencies";
import Contact from "../components/contact/contact";
import Footer from "../components/footer/footer";
import Hero from "../components/hero/hero";
import Navbar from "../components/navbar/navbar";
import Portfolio from "../components/portfolio/portfolio";
import Team from "../components/team/team";
function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <About/>
      <Team/>
      <Competencies/>
      <Portfolio/>
      <Contact/>
      <Footer/>
    </>
  );
}
export default Home;
