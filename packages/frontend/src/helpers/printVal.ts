export function printVal(value: unknown): string {
  if (value) {
    return String(value);
  } else {
    return "-";
  }
}
