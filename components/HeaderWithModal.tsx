"use client";

import { useState } from "react";
import Header from "./Header";
import QuoteModal from "./QuoteModal";

export default function HeaderWithModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
