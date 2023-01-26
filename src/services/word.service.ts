import Params  from 'next/dist/server/router';
import { Word } from 'src/models/Word';

import { api } from './api'



export async function get(wordName: string, params?: Params): Promise<Word> {
  const resp: any = await api.get(`/${wordName}`, { params })
  return resp.data;
}



export async function getByFilter(wordName: string, filterName: string): Promise<Word> {
  const resp: any = await api.get(`/${wordName}/${filterName}`)
  return resp.data;

}


export default {
  get,
  getByFilter,
}