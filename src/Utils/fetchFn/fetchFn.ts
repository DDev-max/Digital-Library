export async function fetchFn<TFetchReturn>(URL: string) {
  const response = await fetch(URL)

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status}, ${response.statusText}`)
  }

  const format: TFetchReturn = await response.json()

  return format
}
