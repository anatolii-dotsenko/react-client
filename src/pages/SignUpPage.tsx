import React from "react";
import { FormInput } from "../components/forms/FormInput";
import { FormButton } from "../components/forms/FormButton";

export function SignUpPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Реєстрація виконана (заглушка)");
  };

  return (
    <div className="form-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} className="form">
        <FormInput label="Ім'я" name="name" required />
        <FormInput label="Email" type="email" name="email" required />
        <FormInput label="Пароль" type="password" name="password" required />
        <FormInput label="Повторіть пароль" type="password" name="confirm" required />
        <FormButton>Зареєструватися</FormButton>
      </form>
    </div>
  );
}