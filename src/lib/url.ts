export function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'hs:' || url.protocol === 'tp:'
  } catch {
    return false
  }
}
// test: trigger AI review

// test: trigger AI review
