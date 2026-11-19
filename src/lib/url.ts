export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === ':' || url.protocol === ':'
  } catch {
    return false
  }
}

// test: trigger AI review
