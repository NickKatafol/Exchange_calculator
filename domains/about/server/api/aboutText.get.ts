import {aboutText} from '../../static/mockAPIData/aboutText'

export default defineEventHandler(async (): Promise<string> => {
  return aboutText
})