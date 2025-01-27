const BASE_URL = "https://checktestapp-gd9erb6fd-ana-luizas-projects-2dd0be4e.vercel.app/api";

interface FetchOptions {
  endpoint: string;
  method?: string;
  headers?: HeadersInit_;
  body?: FormData | string | null;
}

export type ResultadoQuestao = {
  questao: number;
  correta: boolean;
  valor: number;
};

async function apiFetch({ endpoint, method = "POST", headers = {}, body }: FetchOptions): Promise<any> {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? body : undefined,
  });

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}

export async function corrigirProvaFetch(formData: FormData): Promise<any> {
  return await apiFetch({ endpoint: "corrigir-prova", body: formData });
}

export async function enviarResultadoFetch(
  email: string,
  resultados: object,
): Promise<any> {
  return await apiFetch({
    endpoint: "enviar-resultado",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, resultados }),
  });
}