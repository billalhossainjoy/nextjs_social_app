export function sanitizeReturnTo(returnTo?: string | null) {
  if (
    !returnTo ||
    !returnTo.startsWith("/") ||
    returnTo.startsWith("//") ||
    returnTo.includes("\\") ||
    /[\u0000-\u001F\u007F]/.test(returnTo)
  ) {
    return "/";
  }

  return returnTo;
}

export function getLoginPath(returnTo: string) {
  return `/login?returnTo=${encodeURIComponent(sanitizeReturnTo(returnTo))}`;
}
