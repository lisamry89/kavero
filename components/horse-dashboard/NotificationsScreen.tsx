import { CalendarClock, CircleCheck, MessageCircle, type LucideIcon } from "lucide-react";
import { AppNotification, NotificationKind } from "@/lib/types";

const KIND_ICON: Record<NotificationKind, LucideIcon> = {
  reminder: CalendarClock,
  care: CircleCheck,
  message: MessageCircle,
};

export function NotificationsScreen({
  notifications,
}: {
  notifications: AppNotification[];
}) {
  return (
    <div className="no-scrollbar h-full overflow-y-auto">
      <div className="px-4 py-4">
        <h2 className="font-serif text-lg text-white">Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <p className="py-10 text-center text-xs uppercase tracking-widest2 text-neutral-600">
          Aucune notification
        </p>
      ) : (
        <div className="flex flex-col px-4">
          {notifications.map((n, i) => {
            const Icon = KIND_ICON[n.kind];
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 py-4 ${
                  i === 0 ? "" : "border-t border-neutral-900"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900">
                  <Icon className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm text-white">{n.title}</span>
                  <span className="text-xs text-neutral-500">{n.subtitle}</span>
                </div>
                <span className="shrink-0 text-[11px] tracking-wide text-neutral-600">
                  {n.time}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
