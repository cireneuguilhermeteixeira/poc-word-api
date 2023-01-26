import axios from 'axios'
import { toast } from 'react-toastify'

export function getAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_WORDS_API
  })
  // @ts-ignore
  api.defaults.headers['X-RapidAPI-Key'] = process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY
  // @ts-ignore
  api.defaults.headers['X-RapidAPI-Host'] = process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST



  console.log('process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY', process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY);
  console.log('process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST', process.env.NEXT_PUBLIC_X_RAPIDAPI_HOST);



  api.interceptors.response.use(
    function (successRes) {
      return successRes
    },
    function (error) {
      console.log('error', error)
      if (error.response.status === 401) {
        toast.error('Você precisa se autenticar novamente.')
      }
    }
  )


  return api
}