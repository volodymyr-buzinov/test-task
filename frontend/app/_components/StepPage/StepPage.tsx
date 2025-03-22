"use client"

import { useQuiz } from "@/app/_context/QuizContext"
import { MutipleStep } from "../MultipleStep"
import { SingleStep } from "../SingleStep"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import "./StepPage.css";


interface StepPageProps {
    step: number
}

export const StepPage = ({step}: StepPageProps) => {
    const quizProps = useQuiz()

    const currentQuestion = quizProps.questions.find(q => q?.sort === step)
   
    if (!currentQuestion || step > quizProps.questions.length) return <h1>Wrong step, try again</h1>
    
    return <div className="StepPage">
        <ProgressBar answersLength={Object.keys(quizProps.answers).length} questionsLength={quizProps.questions.length}/>
        {currentQuestion.multiple ? <MutipleStep {...quizProps} currentQuestion={currentQuestion}/> : <SingleStep {...quizProps} currentQuestion={currentQuestion}/>}
    </div>
}