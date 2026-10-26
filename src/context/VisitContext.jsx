import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const VisitContext = createContext(null);

export function VisitProvider({ children }) {
  const [watched, setWatched] = useState([]);
  const [messages, setMessages] = useState([]);
  const [quieter, setQuieter] = useState({});
  const [lastChapterId, setLastChapterId] = useState(null);
  const idRef = useRef(1);

  const toggleQuieter = useCallback((noteId) => {
    setQuieter((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
  }, []);

  const markWatched = useCallback((chapterId) => {
    setWatched((prev) => (prev.includes(chapterId) ? prev : [...prev, chapterId]));
  }, []);

  const rememberChapter = useCallback((chapterId) => {
    setLastChapterId(chapterId);
  }, []);

  const addExchange = useCallback((chapterId, question, paragraphs) => {
    const id = idRef.current++;
    setMessages((prev) => [
      ...prev,
      { id: `${id}-q`, chapterId, from: "you", paragraphs: [question] },
      { id: `${id}-a`, chapterId, from: "answer", paragraphs },
    ]);
  }, []);

  const resetProgress = useCallback(() => {
    setWatched([]);
    setMessages([]);
    setLastChapterId(null);
  }, []);

  const value = useMemo(
    () => ({
      watched,
      messages,
      quieter,
      lastChapterId,
      toggleQuieter,
      markWatched,
      rememberChapter,
      addExchange,
      resetProgress,
    }),
    [
      watched,
      messages,
      quieter,
      lastChapterId,
      toggleQuieter,
      markWatched,
      rememberChapter,
      addExchange,
      resetProgress,
    ],
  );

  return <VisitContext.Provider value={value}>{children}</VisitContext.Provider>;
}

export function useVisit() {
  const value = useContext(VisitContext);
  if (!value) {
    throw new Error("useVisit must be used within VisitProvider");
  }
  return value;
}
