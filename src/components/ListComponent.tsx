export function ListComponent() {
  const items = ["Елемент 1", "Елемент 2", "Елемент 3", "Елемент 4"];

  return (
    <div className="list-container">
      <h2>Список</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
