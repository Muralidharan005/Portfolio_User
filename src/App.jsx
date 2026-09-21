import './App.css';
import { api } from './api.js';
import { useData } from './utils/helpers.js';
import { Loading, Err } from './components/Common.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Skill from './components/Skill.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

import { initialAbout } from './data/initialData.js';

export default function App() {
  const { data: aboutData, loading, error } = useData(api.getAbout, 'about', initialAbout);
  const name = aboutData?.[0]?.name;
  const resume = aboutData?.[0]?.resume;

  if (loading && !aboutData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <ScrollProgress />
      <Navbar name={name} resume={resume} />
      <main>
        {error ? <Err msg={error} /> : <Home about={aboutData} />}
        {!error && <About about={aboutData} />}
        <Skill />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer name={name} resume={resume} />
    </>
  );
}
