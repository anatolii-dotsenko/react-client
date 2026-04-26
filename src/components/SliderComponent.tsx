import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function SliderComponent() {
  const [value, setValue] = useState(50);
  const socketRef = useRef<Socket | null>(null);
  const isLocal = useRef(false); // Прапор власної зміни

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    // Отримати синхронізацію від інших
    socket.on("slider:sync", (val: number) => {
      if (!isLocal.current) {
        setValue(val);
      }
      isLocal.current = false;
    });

    return () => { socket.disconnect(); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    isLocal.current = true; // Позначаємо що це наша зміна
    setValue(val);
    socketRef.current?.emit("slider:change", val);
  };

  return (
    <div className="panel">
      <h2>Синхронізований слайдер</h2>
      <p>Відкрийте кілька вкладок — значення буде однаковим</p>
      <input
        type="range" min="0" max="100"
        value={value} onChange={handleChange}
        style={{ width: "100%" }}
      />
      <div className="slider-value">{value}</div>
    </div>
  );
}
