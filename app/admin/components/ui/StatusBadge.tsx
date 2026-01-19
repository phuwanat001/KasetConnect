type StatusType =
  | "active"
  | "approved"
  | "pending"
  | "requested"
  | "suspended"
  | "rejected"
  | "returned"
  | "damaged"
  | "inactive"
  | "sent"
  | "scheduled";

interface StatusBadgeProps {
  status: StatusType | string;
}

const statusStyles: Record<string, string> = {
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  approved:
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  requested:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  suspended: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  inactive: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  returned: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  damaged:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  sent: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style =
    statusStyles[status] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";

  return (
    <span
      className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${style}`}
    >
      {status}
    </span>
  );
}
