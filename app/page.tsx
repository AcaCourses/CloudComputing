"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseSummary from "./components/CourseSummary";
import Units from "./components/Units";
import Labs from "./components/Labs";
import Evaluation from "./components/Evaluation";
import Profesor from "./components/Profesor";
import Footer from "./components/Footer";
import FloatingChatbot from "./components/FloatingChatbot";
import ExamGeneratorModal from "./components/ExamGeneratorModal";

export default function Home() {
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsExamModalOpen(true);
    window.addEventListener("open-exam-modal", handleOpenModal);
    return () => window.removeEventListener("open-exam-modal", handleOpenModal);
  }, []);

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

      {/* Componentes Flotantes e Interactivos RAG */}
      <FloatingChatbot />
      <ExamGeneratorModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
      />
    </>
  );
}
