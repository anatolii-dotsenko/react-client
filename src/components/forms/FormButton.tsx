import React from "react";

export function FormButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="form-btn">
      {children}
    </button>
  );
}