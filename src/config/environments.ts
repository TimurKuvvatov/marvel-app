const envs = import.meta.env;

export default {
  apiKey: envs.VITE_PUBLIC_API_KEY,
  baseApiUrl: envs.VITE_BASE_API_URL,
};
