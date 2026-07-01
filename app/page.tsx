import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseSummary from "./components/CourseSummary";
import Units from "./components/Units";
import Labs from "./components/Labs";
import Evaluation from "./components/Evaluation";
import Profesor from "./components/Profesor";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CourseSummary />
      <Units />
      <Labs />
      <Evaluation />
      <Profesor />
      <Footer />
    </>
  );
}
