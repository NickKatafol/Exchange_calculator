import type { IInputSet } from '@/domains/main/types/pickUpGroupTypes'
import type { IExchangeCouple } from '../types/apiTypes'

export function clearStringForNumbers(str: any): string {
  if (typeof str === 'string')
    return str.replace(/\D/g, '')
  return ''
}


export function rankingNumbers(str: string): string {
  let valBuffer = str

  //add 0 before dot in the start
  if (valBuffer.startsWith('.'))
    valBuffer = `0${valBuffer}`

  //to eliminate 0 in the start
  else if (valBuffer.startsWith('0') && !valBuffer.startsWith('.', 1) && valBuffer.length > 1)
    valBuffer = valBuffer.substring(1)

  //make a clear number
  let valChunks = valBuffer.split('.')
  valBuffer = `${clearStringForNumbers(valChunks[0])}${valChunks.length > 1 ? '.' : ''}${clearStringForNumbers(valChunks[1]) || ''}`

  return valBuffer
}

export interface ICalculatorOutput {
  exchengCourse: number
  exchangeOutput: string
}

export function exchangeCalculator(exchangCouples: IExchangeCouple[], 
                                   inputSets: Record<string, IInputSet>, 
                                   whereFocusIsValue: string, 
                                   secondInputSetName: string
): ICalculatorOutput {
  const fromInputSetVal = inputSets[whereFocusIsValue].currencyAmount
  const fromUnitType = inputSets[whereFocusIsValue].unitType
  const toUnitType = inputSets[secondInputSetName].unitType

  let exchengCourse = 0

  if (fromUnitType === toUnitType)
    return { exchengCourse: 1, exchangeOutput: fromInputSetVal }
  else {
    const exchangCouple: IExchangeCouple | undefined = exchangCouples.find((item: IExchangeCouple) => item.currencyPair.includes(fromUnitType) && item.currencyPair.includes(toUnitType))
    if (exchangCouple) {
      const exchangedCurencyIndex = exchangCouple.currencyPair.findIndex((unitType: string) => unitType === inputSets.AS.unitType)
      exchengCourse = exchangCouple.exchengCourse[exchangedCurencyIndex]
    } else
      return { exchengCourse: 0, exchangeOutput: '' }
  }

  if (fromInputSetVal === '')
    return { exchengCourse, exchangeOutput: '' }
  else {
    if (whereFocusIsValue === 'AS')
      return { exchengCourse, exchangeOutput: String((+fromInputSetVal) * exchengCourse) }
    else if (whereFocusIsValue === 'DS')
      return { exchengCourse, exchangeOutput: String((+fromInputSetVal) / exchengCourse) }
  }
}
