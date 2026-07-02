"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Paperclip, Send } from "lucide-react";
import { ChatMessage, Horse } from "@/lib/types";

function MessageBubble({ message }: { message: ChatMessage }) {
  const isOwner = message.sender === "owner";

  return (
    <div className={`flex flex-col gap-1.5 ${isOwner ? "items-end" : "items-start"}`}>
      <span className="text-[11px] uppercase tracking-widest2 text-neutral-600">
        {isOwner ? "Vous" : "Gestionnaire"}
      </span>
      {message.kind === "file" ? (
        <div className="flex max-w-[85%] items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
            <FileText className="h-4 w-4 text-white" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-white">{message.content}</span>
            <span className="text-xs text-neutral-500">{message.fileName}</span>
          </div>
        </div>
      ) : (
        <div
          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isOwner
              ? "bg-white text-black"
              : "border border-neutral-800 bg-neutral-900 text-white"
          }`}
        >
          {message.content}
        </div>
      )}
    </div>
  );
}

export function MessagingScreen({
  horse,
  messages: initialMessages,
}: {
  horse: Horse;
  messages: ChatMessage[];
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `m-${Date.now()}`, sender: "owner", kind: "text", content: text },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100vh-4.5rem)] flex-col">
      <div className="flex items-center gap-3 border-b border-neutral-900 px-4 py-4">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
          <Image src={horse.photoUrl} alt={horse.name} fill className="object-cover" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" />
        </div>
        <div>
          <h2 className="font-serif text-lg text-white">{horse.name}</h2>
          <p className="text-xs text-neutral-500">
            {horse.breed}, {horse.age} ans
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <h3 className="mb-5 font-serif text-base text-white">
          Messagerie privée
        </h3>
        <div className="flex flex-col gap-5">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-neutral-900 px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
          <Paperclip className="h-4 w-4 shrink-0 text-neutral-600" strokeWidth={1.5} />
        </div>
        <button
          onClick={handleSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white active:scale-95"
        >
          <Send className="h-4 w-4 text-black" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
