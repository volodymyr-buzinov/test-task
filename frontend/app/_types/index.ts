export interface QuizAnswer {
    id: string
    text: string
}


export interface QuizQuestion {
  title: string
  id: string
  documentId: string
  multiple: boolean
  optional: Record<string, {title: string, answers: QuizAnswer[]}>
}