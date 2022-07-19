import axios from 'axios';
import { OpentdbResponse } from '../types/types';

export const fetchQuestionData = async (): Promise<OpentdbResponse> => {
  const data: any = await axios
    .get(`https://opentdb.com/api.php?amount=10&category=27&type=multiple`)
    .catch(e => console.log(e));
  return data.data;
}