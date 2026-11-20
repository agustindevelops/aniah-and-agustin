"use client";

import { useEffect } from "react";
import PotluckForm from "@/components/Potluck/PotluckForm";

export default function EditPotluckModal({ entry, onClose, onSuccess }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-potluck-title"
        className="w-full max-w-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <PotluckForm
          key={entry.id}
          entry={entry}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
