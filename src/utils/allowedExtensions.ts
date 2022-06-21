const allowedExtensions: string[] = ["application/pdf"];

export function checkExtensions(file: File): boolean {
  if (!file) return true;
  return allowedExtensions.includes(file.type);
}
