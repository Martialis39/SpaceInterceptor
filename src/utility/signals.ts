// I want to be able to add a listener
// To send a signal
// And call each listener with that signal

type Payload = any[];

type Listener = (payload?: any[]) => void;

type AddListener = (signalName: string, l: Listener) => void;
type RemoveListener = (signalName: string, l: Listener) => void;
type Emit = (signalName: string, payload?: Payload) => void;

const createEventBus = (): {
  emit: Emit;
  addListener: AddListener;
  removeListener: RemoveListener;
} => {
  let listeners: { listener: Listener; signal: string }[] = [];
  const addListener = (signalName: string, l: Listener) => {
    listeners.push({ signal: signalName, listener: l });
  };

  const removeListener = (signalName: string, l: Listener) => {
    listeners = listeners.filter(({ signal, listener }) => {
      return listener !== l;
    });
  };

  const emit = (signalName: string, payload?: any[]) => {
    listeners.forEach(({ listener, signal }) => {
      if (signalName === signal) {
        listener(payload);
      }
    });
  };
  return { emit, addListener, removeListener };
};

export const eventBus = createEventBus();
