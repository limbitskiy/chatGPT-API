import { useEffect, useRef } from "react";
import clsx from "clsx";

import AnswerLoader from "./AnswerLoader";

import type { Message } from "../types";

interface AnswerOutputProps {
  messages: Message[];
  isLoading: boolean;
  error: { message?: string };
}

const welcomeMessage = `Welcome to the SkyNet terminal! \n \n Using this amazing technology you can ask AI anything! \n \n Type in your question below or use the microphone`;

const AnswerOutput: React.FC<AnswerOutputProps> = ({ messages, isLoading, error }) => {
  // scroll to last message
  useEffect(() => {
    if (messagesCntRef.current) {
      const lastMessage = messagesCntRef.current.children[messagesCntRef.current.children.length - 1];

      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  const messagesCntRef = useRef<HTMLDivElement>(null);

  return (
    <div className="answer-output backdrop-blur-sm ring-2 ring-[var(--grey-border)] flex-1  p-4 w-full overflow-y-auto">
      <div ref={messagesCntRef} className="messages flex flex-col gap-4">
        {messages.length ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx(
                `message px-4 py-3 break-words`,
                msg.sent ? `w-2/3 self-end bg-gray-300 text-black whitespace-pre-wrap` : ``
              )}
            >
              <span>{msg.text}</span>
            </div>
          ))
        ) : (
          <span className="whitespace-pre-line">{welcomeMessage}</span>
        )}
        {isLoading && <AnswerLoader />}
      </div>
      {error && (
        <div className="error text-rose-500 mt-6">
          <span>{error?.message}</span>
        </div>
      )}
    </div>
  );
};

export default AnswerOutput;
