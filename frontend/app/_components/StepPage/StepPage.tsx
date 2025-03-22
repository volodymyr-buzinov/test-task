"use client"

import { useQuiz } from "@/app/_context/QuizContext"
import { MutipleStep } from "../MultipleStep"
import { SingleStep } from "../SingleStep"
import { ProgressBar } from "../ProgressBar/ProgressBar"


interface StepPageProps {
    step: number
}

export const StepPage = ({step}: StepPageProps) => {
    const quizProps = useQuiz()

    const currentQuestion = quizProps.questions.find(q => q?.sort === step)
   
    if (!currentQuestion || step > quizProps.questions.length) return <h1>Wrong step, try again</h1>
    
    return <div>
        <ProgressBar/>
        {currentQuestion.multiple ? <MutipleStep {...quizProps}/> : <SingleStep {...quizProps}/>}
    </div>
}