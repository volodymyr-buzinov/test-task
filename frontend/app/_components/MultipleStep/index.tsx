import { QuizContextType } from "@/app/_context/QuizContext"
import { QuizQuestion } from "@/app/_types"


interface MutipleStepProps extends QuizContextType {
    currentQuestion: QuizQuestion
}

export const MutipleStep = ({}: MutipleStepProps) => {
    return <h1>Multiple Step</h1>
}