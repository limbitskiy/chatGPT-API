import { useEffect, useRef, useState } from "react";
import { sendQuestion } from "../api";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import clsx from "clsx";

import AnswerOutput from "./AnswerOutput";
import BackgroundFigures from "./BackgroundFigures";

import type { Message } from "../types";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [currentLang, setCurrentLang] = useState("En");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const currentMessageId = useRef(1);

  const addMessage = (messageText: string, sent: boolean) => {
    const messageId = ++currentMessageId.current;
    setMessages((m) => [...m, { id: messageId, sent, text: messageText }]);
  };

  const onSend = async () => {
    if (!input.length) return;

    const _input = input.trim();
    setInput("");
    setError({});
    addMessage(_input, true);
    setIsLoading(true);
    let result;

    try {
      result = await sendQuestion(_input);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error);
      } else {
        console.error(error);
      }
      return;
    } finally {
      setIsLoading(false);
    }

    addMessage(result.answer, false);
  };

  const onKeyDown = (e) => {
    if ((e.code === "Enter" || e.code === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const onMicrophone = () => {
    SpeechRecognition.startListening({ language: currentLang === "En" ? "en-EN" : "ru-RU" });
  };

  return (
    <div className="chat-container relative flex h-dvh flex-col items-center max-w-[600px] p-8 gap-4 mx-auto">
      <BackgroundFigures />
      <header className="title">- SkyNet alpha v0.5.12 -</header>
      <AnswerOutput messages={messages} isLoading={isLoading} error={error} />
      <footer className="input w-full z-10">
        <div className="textarea-wrapper">
          <textarea
            className="ring-2 ring-[var(--grey-border)] w-full p-3 max-h-36 field-sizing-content resize-none z-10"
            placeholder="Type here"
            value={transcript ? transcript : input}
            ref={textareaRef}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <div className="button-container flex justify-end gap-2 py-1">
            <div className="microphone-btn">
              <button
                title={
                  !browserSupportsSpeechRecognition ? "Browser doesn't support speech recognition." : "Use microphone"
                }
                onClick={onMicrophone}
                className={clsx(listening ? "bg-[var(--green-color)]" : "")}
                disabled={!browserSupportsSpeechRecognition}
              >
                {listening ? "Say something" : "Microphone"}
              </button>
              <button onClick={() => setCurrentLang(currentLang === "En" ? "Ru" : "En")}>{currentLang}</button>
            </div>

            <button
              onClick={onSend}
              disabled={!input.length || isLoading}
              title={input.length ? "Send text" : "Type something into the input field"}
            >
              Send
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Chat;
