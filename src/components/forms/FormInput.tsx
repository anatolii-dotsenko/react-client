interface InputProps {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
}

export function FormInput({
  label,
  type = "text",
  name,
  required,
}: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        className="form-input"
      />
    </div>
  );
}
