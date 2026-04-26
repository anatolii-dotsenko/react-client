import React from "react";
import { FormInput } from "../components/forms/FormInput";
import { FormButton } from "../components/forms/FormButton";

export function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Логін виконано (заглушка)");
  };

  return (
    <div className="form-container">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit} className="form">
        <FormInput label="Email" type="email" name="email" required />
        <FormInput label="Пароль" type="password" name="password" required />
        <FormButton>Увійти</FormButton>
      </form>
    </div>
  );
}