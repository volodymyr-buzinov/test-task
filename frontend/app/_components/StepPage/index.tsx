"use client"

import { useQuiz } from "@/app/_context/QuizContext"
import { Step } from "../Step"
import { ProgressBar } from "../ProgressBar"
import "./index.css";


interface StepPageProps {
    step: number
}

export const StepPage = ({step}: StepPageProps) => {
    const quizProps = useQuiz()

    const currentQuestion = quizProps.questions.find(q => q?.sort === step)
   
    if (!currentQuestion || step > quizProps.questions.length) return <h1>Wrong step, try again</h1>
    
    return <div className="StepPage">
        <ProgressBar step={step} questionsLength={quizProps.questions.length}/>
        <Step {...quizProps} currentQuestion={currentQuestion} step={step}/>
    </div>
}