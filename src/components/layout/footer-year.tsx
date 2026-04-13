"use client";

import { useState, useEffect } from "react";

export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <span>{year || "2025"}</span>;
}
