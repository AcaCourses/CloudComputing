"use client";

import { useState, useEffect } from "react";
import FloatingChatbot from "./FloatingChatbot";
import FloatingSearchBar from "./FloatingSearchBar";
import ExamGeneratorModal from "./ExamGeneratorModal";

export default function GlobalProviders({ children }: { children: React.ReactNode }) {
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsExamModalOpen(true);
    window.addEventListener("open-exam-modal", handleOpenModal);
    return () => window.removeEventListener("open-exam-modal", handleOpenModal);
  }, []);

  return (
    <>
      {children}
      {/* Componentes Globales Persistentes en Toda la App */}
      <FloatingSearchBar />
      <FloatingChatbot />
      <ExamGeneratorModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
      />
    </>
  );
}
