import type {IExchangeCouple} from '../../types/apiTypes'
import {exchangeCouples} from '../../static/mockAPIData/exchangeCouples'

export default defineEventHandler(async (): Promise<IExchangeCouple[]> => {
  return exchangeCouples
})