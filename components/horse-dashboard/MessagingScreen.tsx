"use client";

import { useRef, useState } from "react";
import { ChevronLeft, FileText, Loader2, Paperclip, Send } from "lucide-react";
import { ChatMessage, Conversation } from "@/lib/types";

function FileBubble({ message }: { message: ChatMessage }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleOpen() {
    setIsOpening(true);
    // MVP: simulates opening the shared file before wiring real file storage.
    setTimeout(() => setIsOpening(false), 900);
  }

  return (
    <button
      onClick={handleOpen}
      className="flex max-w-[85%] items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-left transition active:scale-[0.98]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-800">
        {isOpening ? (
          <Loader2 className="h-4 w-4 animate-spin text-white" strokeWidth={1.5} />
        ) : (
          <FileText className="h-4 w-4 text-white" strokeWidth={1.5} />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-white">{message.content}</span>
        <span className="text-xs text-neutral-500">
          {isOpening ? "Ouverture..." : message.fileName}
        </span>
      </div>
    </button>
  );
}

function Avatar({ name, online }: { name: string; online: boolean }) {
  return (
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-medium text-white">
      {name.charAt(0)}
      {online && (
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-black bg-emerald-400" />
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isOwner = message.sender === "owner";

  return (
    <div className={`flex flex-col gap-1.5 ${isOwner ? "items-end" : "items-start"}`}>
      <span className="text-[11px] uppercase tracking-widest2 text-neutral-600">
        {isOwner ? "Vous" : "Eux"}
      </span>
      {message.kind === "file" ? (
        <FileBubble message={message} />
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

function ConversationListItem({
  conversation,
  onOpen,
}: {
  conversation: Conversation;
  onOpen: () => void;
}) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-3 border-b border-neutral-900 py-4 text-left"
    >
      <Avatar name={conversation.name} online={conversation.online} />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium text-white">{conversation.name}</span>
        <span className="text-xs text-neutral-500">{conversation.role}</span>
        {lastMessage && (
          <p className="mt-1 truncate text-xs text-neutral-600">
            {lastMessage.kind === "file" ? lastMessage.fileName : lastMessage.content}
          </p>
        )}
      </div>
    </button>
  );
}

export function MessagingScreen({
  conversations: initialConversations,
}: {
  conversations: Conversation[];
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const active = conversations.find((c) => c.id === activeId);

  function appendMessage(message: ChatMessage) {
    if (!active) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id ? { ...c, messages: [...c.messages, message] } : c
      )
    );
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;
    appendMessage({ id: `m-${Date.now()}`, sender: "owner", kind: "text", content: text });
    setDraft("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      appendMessage({
        id: `m-${Date.now()}`,
        sender: "owner",
        kind: "file",
        content: "Document partagé",
        fileName: file.name,
      });
    }
    e.target.value = "";
  }

  if (!active) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="px-4 py-4">
          <h2 className="font-serif text-lg text-white">Messages</h2>
        </div>
        <div className="flex flex-col px-4">
          {conversations.map((c) => (
            <ConversationListItem
              key={c.id}
              conversation={c}
              onOpen={() => setActiveId(c.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex shrink-0 items-center gap-3 border-b border-neutral-900 px-4 py-4">
        <button
          onClick={() => setActiveId(null)}
          aria-label="Retour aux messages"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full active:scale-90"
        >
          <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
        </button>
        <Avatar name={active.name} online={active.online} />
        <div>
          <h2 className="text-sm font-medium text-white">{active.name}</h2>
          <p className="text-xs text-neutral-500">{active.role}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="flex flex-col gap-5">
          {active.messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-neutral-900 px-4 py-4">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
          <button onClick={() => fileInputRef.current?.click()} aria-label="Joindre un fichier">
            <Paperclip className="h-4 w-4 shrink-0 text-neutral-600" strokeWidth={1.5} />
          </button>
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
