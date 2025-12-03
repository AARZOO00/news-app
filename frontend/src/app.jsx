import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./components/footer.jsx";
import NewsDetail from "./Pages/NewsDetail.jsx";
import { NewsProvider } from "./context/NewsContext.jsx";

function App() {
  return (
    <NewsProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/:id" element={<NewsDetail />} />
        </Routes>
      </main>
      <Footer />
    </NewsProvider>
  );
}

export default App;
