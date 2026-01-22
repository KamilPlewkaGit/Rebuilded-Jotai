import { useSyncExternalStore } from "react";

interface Atom<AtomType> {
  get: () => AtomType;
  set: (newValue: AtomType) => void;
  subscribe: (callback: (newValue: AtomType) => void) => () => void;
}
type AtomGetter<AtomType> = (
  get: <Target>(a: Atom<Target>) => Target,
) => AtomType;
export function atom<AtomType>(
  initialValue: AtomType | AtomGetter<AtomType>,
): Atom<AtomType> {
  let value =
    typeof initialValue === "function" ? (null as AtomType) : initialValue;
  let isDerived = typeof initialValue === "function";
  let isInitialized = !isDerived;
  const subscribers = new Set<(newValue: AtomType) => void>();
  const dependencyUnsubscribers = new Set<() => void>();

  function get<Target>(atom: Atom<Target>) {
    let currentValue = atom.get();
    const unsubscribe = atom.subscribe((newValue) => {
      if (currentValue === newValue) return;
      currentValue = newValue;
      computeValue();
      subscribers.forEach((callback) => callback(value));
    });
    dependencyUnsubscribers.add(unsubscribe);
    return currentValue;
  }
  function computeValue() {
    value =
      typeof initialValue === "function"
        ? (initialValue as AtomGetter<AtomType>)(get)
        : value;
  }
  return {
    get: () => {
      if (!isInitialized) {
        computeValue();
        isInitialized = true;
      }
      return value;
    },
    set: (newValue) => {
      value = newValue;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe: (callback) => {
      if (!isInitialized && isDerived) {
        computeValue();
        isInitialized = true;
      }
      subscribers.add(callback);

      return () => {
        subscribers.delete(callback);
      };
    },
  };
}

export function useAtom<AtomType>(
  atom: Atom<AtomType>,
): [AtomType, (newValue: AtomType) => void] {
  return [useSyncExternalStore(atom.subscribe, atom.get), atom.set];
}

export function useAtomValue<AtomType>(atom: Atom<AtomType>) {
  return useSyncExternalStore(atom.subscribe, atom.get);
}
