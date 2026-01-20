"use client";

import { useState } from "react";
import TryOnButton from "./TryOnButton";
import TryOnModal from "./TryOnModal";

export default function ProductTryOn() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TryOnButton onClick={() => setOpen(true)} />
      <TryOnModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
