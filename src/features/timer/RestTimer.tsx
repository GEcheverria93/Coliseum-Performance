import { useEffect, useRef, useState } from 'react';

export function RestTimer({ seconds = 60 }: { seconds?: number }) {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setIsRunning(false);
            clearInterval(intervalRef.current!);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, remaining]);

  const start = () => setIsRunning(true);
  const reset = () => {
    setIsRunning(false);
    setRemaining(seconds);
  };

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rest-timer" style={{ marginTop: 8, marginBottom: 8 }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
        Descanso sugerido: {format(remaining)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={start} disabled={isRunning || remaining === 0} className="btn btn-xs btn-blue">Iniciar</button>
        <button onClick={reset} className="btn btn-xs btn-gray">Reiniciar</button>
      </div>
      {remaining === 0 && <div style={{ color: 'green', marginTop: 4 }}>¡Descanso finalizado!</div>}
    </div>
  );
}
