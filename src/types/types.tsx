export interface OpentdbResponse {
  response_code: number
  results: Result[]
}

export interface Result {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export interface UserProfileTypes {
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string 
}