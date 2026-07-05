"use client";

import { useState } from "react";
import { ChevronLeft, Hash, MessageCircle, Send } from "lucide-react";
import { ChannelMessage, ChatChannel } from "@/lib/types";

function ChannelIcon({ kind }: { kind: ChatChannel["kind"] }) {
  if (kind === "horse") {
    return <MessageCircle className="h-4 w-4 text-white" strokeWidth={1.5} />;
  }
  return <Hash className="h-4 w-4 text-white" strokeWidth={1.5} />;
}

function ChannelListItem({
  channel,
  onOpen,
}: {
  channel: ChatChannel;
  onOpen: () => void;
}) {
  const last = channel.messages[channel.messages.length - 1];

  return (
    <button
      onClick={onOpen}
      className="flex items-center gap-3 border-b border-neutral-900 py-4 text-left"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900">
        <ChannelIcon kind={channel.kind} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm font-medium text-white">{channel.name}</span>
        {last ? (
          <p className="mt-1 truncate text-xs text-neutral-600">
            {last.author} : {last.content}
          </p>
        ) : (
          <p className="mt-1 text-xs text-neutral-700">Aucun message</p>
        )}
      </div>
    </button>
  );
}

export function ManagerChatScreen({
  channels,
  staffName,
  onSendMessage,
}: {
  channels: ChatChannel[];
  staffName: string;
  onSendMessage: (channelId: string, message: ChannelMessage) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const broadcastChannels = channels.filter((c) => c.kind === "general" || c.kind === "urgent");
  const horseChannels = channels.filter((c) => c.kind === "horse");
  const active = channels.find((c) => c.id === activeId);

  function handleSend() {
    const text = draft.trim();
    if (!text || !active) return;
    onSendMessage(active.id, {
      id: `cm-${Date.now()}`,
      author: staffName,
      authorRole: "Palefrenier",
      kind: "text",
      content: text,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    });
    setDraft("");
  }

  if (!active) {
    return (
      <div className="no-scrollbar h-full overflow-y-auto">
        <div className="px-4 py-4">
          <h2 className="font-serif text-lg text-white">Messages</h2>
        </div>
        <div className="flex flex-col px-4">
          {broadcastChannels.map((c) => (
            <ChannelListItem key={c.id} channel={c} onOpen={() => setActiveId(c.id)} />
          ))}
        </div>
        {horseChannels.length > 0 && (
          <>
            <div className="px-4 pb-1 pt-5">
              <span className="text-[10px] uppercase tracking-widest2 text-neutral-600">
                Chats privés par cheval
              </span>
            </div>
            <div className="flex flex-col px-4">
              {horseChannels.map((c) => (
                <ChannelListItem key={c.id} channel={c} onOpen={() => setActiveId(c.id)} />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-neutral-900 px-4 py-4">
        <button
          onClick={() => setActiveId(null)}
          aria-label="Retour aux messages"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full active:scale-90"
        >
          <ChevronLeft className="h-5 w-5 text-white" strokeWidth={1.5} />
        </button>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900">
          <ChannelIcon kind={active.kind} />
        </div>
        <h2 className="text-sm font-medium text-white">{active.name}</h2>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-5">
        <div className="flex flex-col gap-5">
          {active.messages.length === 0 && (
            <p className="pt-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
              Aucun message pour l&apos;instant
            </p>
          )}
          {active.messages.map((m) => {
            const isMe = m.author === staffName;
            return (
              <div key={m.id} className={`flex flex-col gap-1.5 ${isMe ? "items-end" : "items-start"}`}>
                <span className="text-[11px] uppercase tracking-widest2 text-neutral-600">
                  {isMe ? "Vous" : m.author} · {m.time}
                </span>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isMe
                      ? "bg-white text-black"
                      : "border border-neutral-800 bg-neutral-900 text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-neutral-900 px-4 py-4">
        <div className="flex flex-1 items-center rounded-full border border-neutral-800 bg-neutral-900 px-4 py-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Écrire un message..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 focus:outline-none"
          />
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
