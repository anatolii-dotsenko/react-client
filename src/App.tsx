import { useState } from "react";
import { ListComponent } from "./components/ListComponent";
import { ImageComponent } from "./components/ImageComponent";
import "./App.css";

function App() {
  const [showList, setShowList] = useState(true);

  return (
    <div>
      <header className="header">
        <h1>Мій React сайт</h1>
        <p>Демонстрація перемикання компонентів</p>
      </header>
      <main className="main">
        <button className="toggle-btn" onClick={() => setShowList((s) => !s)}>
          Показати {showList ? "Зображення" : "Список"}
        </button>
        <div className="content">
          {showList ? <ListComponent /> : <ImageComponent />}
        </div>
      </main>
    </div>
  );
}

export default App;