import { useRef, useState } from 'react';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
  };

  const pause = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    pause();
    setSeconds(0);
  };

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-component" style={{ marginTop: 12, marginBottom: 8 }}>
      <div style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>{format(seconds)}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={start} disabled={isRunning} className="btn btn-xs btn-green">Iniciar</button>
        <button onClick={pause} disabled={!isRunning} className="btn btn-xs btn-amber">Pausar</button>
        <button onClick={reset} className="btn btn-xs btn-gray">Reiniciar</button>
      </div>
    </div>
  );
}
