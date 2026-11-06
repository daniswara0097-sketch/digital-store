
const BASE_URL =
  process.env.MELOSTORE_BASE_URL ||
  "https://api.melostore.id/api/v1/h2h";

type MeloStoreOptions = {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
};

export async function melostoreRequest(
  endpoint: string,
  options: MeloStoreOptions = {}
) {
  const apiKey = process.env.MELOSTORE_API_KEY;
  const secretKey = process.env.MELOSTORE_SECRET_KEY;

  if (!apiKey || !secretKey) {
    throw new Error("Kredensial MeloStore belum dikonfigurasi.");
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "X-API-Key": apiKey,
      "X-Secret-Key": secretKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: options.body
      ? JSON.stringify(options.body)
      : undefined,
    cache: "no-store",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || `MeloStore API error: ${response.status}`
    );
  }

  return result;
}
