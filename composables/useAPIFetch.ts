import { useFetch, type UseFetchOptions } from "#app"

type useFetchType = typeof useFetch

export const useAPIFetch: useFetchType = (path, options : any = {}) => {
  const config = useRuntimeConfig()

  // modify options as needed
  options.baseURL = config.public.apiURL
  console.log(config.public.apiURL)
  return useFetch(path, options)
}
