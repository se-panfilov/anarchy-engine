export type TDateMessage = Readonly<{
  date: string; // "now" or ISO-like "yyyy-MMMM-dd" or full ISO
  format: string; // date-fns tokens (yyyy, MM, dd, ...)
}>;
