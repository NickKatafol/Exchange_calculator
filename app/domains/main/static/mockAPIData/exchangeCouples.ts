import type {IExchangeCouple} from '../../types/apiTypes'

export const exchangeCouples: IExchangeCouple[] = [
  {
    currencyPair: ['USD', 'SSa'],
    exchengCourse: [0.9, 1.1]            //[direct_course, reverse_course]
  },
  {
    currencyPair: ['USD', 'EUR'],
    exchengCourse: [3, 0.5]
  },
  {
    currencyPair: ['USD', 'DDC'],
    exchengCourse: [3.3, 0.6]
  },
  {
    currencyPair: ['SSa', 'EUR'],
    exchengCourse: [1.7, 0.55]
  },
  {
    currencyPair: ['SSa', 'DDC'],
    exchengCourse: [34, 0.0222]
  },
  {
    currencyPair: ['EUR', 'DDC'],
    exchengCourse: [100, 0.011]
  },
]