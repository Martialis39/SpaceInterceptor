// I want to be able to add a listener
// To send a signal
// And call each listener with that signal

type Listener = (payload?: any[]) => void;

const signals = () => {
  let listeners: { listener: Listener; signal: string }[] = [];
  const addListener = (signalName: string, l: Listener) => {
    listeners.push({ signal: signalName, listener: l });
  };

  const removeListener = (signalName: string, l: Listener) => {
    listeners.push({ signal: signalName, listener: l });
    listeners = listeners.filter(({ signal, listener }) => {
      return !(signal === signalName && listener === l);
    });
  };

  const emit = (signalName: string, payload?: any[]) => {
    listeners.forEach(({ listener, signal }) => {
      //
      if (signalName === signal) {
        listener(payload);
      }
    });
  };
  return { emit, addListener, removeListener };
};

export const Signals = signals();
