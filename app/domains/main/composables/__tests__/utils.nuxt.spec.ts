
import { describe, it, expect } from 'vitest'
import { clearStringForNumbers, rankingNumbers, exchangeCalculator } from '../utils'


const clearingStringForNumbers_testSets = [
  { a: {age:25}, result: '' },
  { a: ['25'], result: '' },
  { a: '25ss', result: '25' },
  { a: '2ss5', result: '25' },
  { a: 'ss25', result: '25' },
  { a: '25.', result: '25' },
  { a: '2..5', result: '25' },
  { a: '.25', result: '25' },
  { a: '2,,5', result: '25' },
  { a: ',25', result: '25' },
  { a: '025', result: '025' },
  { a: '0 2 5', result: '025' },
  { a: ' 25 ', result: '25' },
  { a: ' 25 ', result: '25' },
  { a: '0@2-5!#$%^&*()_-+=~`:;"<>?/\| 😋️', result: '025' },
]

it.each(clearingStringForNumbers_testSets)('clearStringForNumbers return string with only numbers', ({ a, result }) => {
  expect(clearStringForNumbers(a)).toBe(result)
})


describe("rankingNumbers return string with right number", () => {
  const dotTestSets = [
    { a: '.', result: '0.' },
    { a: '.25', result: '0.25' },
    { a: '0.25', result: '0.25' },
    { a: '2.5', result: '2.5' },
  ]

  it.each(dotTestSets)('add 0 before dot in the start', ({ a, result }) => {
    expect(rankingNumbers(a)).toBe(result)
  })

  const zeroTestSets = [
    { a: '025', result: '25' },
    { a: '0', result: '0' },
    { a: '0.', result: '0.' },
    { a: '0.5', result: '0.5' },
  ]

  it.each(zeroTestSets)('to eliminate 0 in the start', ({ a, result }) => {
    expect(rankingNumbers(a)).toBe(result)
  })

  const clearNumberTestSets = [
    { a: '2.5.86', result: '2.5' },
    { a: '25.', result: '25.' },
    { a: '25.5', result: '25.5' },
    { a: '02.3.4.5', result: '2.3' },
    { a: '.2.3.5', result: '0.2' },
  ]

  it.each(clearNumberTestSets)('make a clear number', ({ a, result }) => {
    expect(rankingNumbers(a)).toBe(result)
  })

})
