import { QuizContextType } from "@/app/_context/QuizContext"
import { QuizQuestion } from "@/app/_types"


interface SingleStepProps extends QuizContextType {
    currentQuestion: QuizQuestion
}

export const SingleStep = ({}: SingleStepProps) => {
    return <h1>SingleStep</h1>
}