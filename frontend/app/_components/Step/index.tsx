"use client"

import { QuizContextType } from "@/app/_context/QuizContext"
import { QuizAnswer, QuizQuestion } from "@/app/_types"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import "./index.css"


interface StepProps extends QuizContextType {
    currentQuestion: QuizQuestion
    step: number
}

export const Step = ({answers, changeStep, currentQuestion, questions, saveAnswer, step}: StepProps) => {
    const searchParams = useSearchParams();
    const [optionalData, setOptionalData] = useState<{title: string, answers: QuizAnswer[]}>()
    const [dataIsPending, setDataIsPending] = useState(true)
    
  useEffect(() => {
    searchParams.entries().find(([key, val]) => {
        const queryKey = `${key}=${val}`
        
        if (currentQuestion.optional[queryKey]) setOptionalData(currentQuestion.optional[queryKey])
    })
    setDataIsPending(false)

  }, [currentQuestion.optional, searchParams])

  const handleAnswersChange = (answer: string) => {
    const answersState = answers[step] || [] 

    if (!currentQuestion.multiple) return saveAnswer({step, answer: answersState.includes(answer) ? [] : [answer]})

    saveAnswer({step, answer: answersState.includes(answer) ? answersState.filter((answ: string) => answ !== answer) : [...answersState, answer]})
  }

  if (dataIsPending) return <div className="Step"><span className="Step-loader"></span></div>
    
    return <div className="Step">
        <h1 className="Step-title">{optionalData ? optionalData.title : currentQuestion.title}</h1>
        <ul className="Step-list">
        {(optionalData ? optionalData.answers : currentQuestion.answers).map(answer => 
        <li className={`Step-answer ${(answers[step] || []).includes(answer.text) ? "active" : ""}`} key={answer.id} onClick={() => handleAnswersChange(answer.text)}>
         {answer.text}
        </li>)}
        </ul>
        <div className="Step-control">
            <button className="Step-btn" disabled={step <= 1} onClick={() => changeStep(step - 1)}>Prev</button>
            <button className="Step-btn" disabled={step >= questions.length} onClick={() => changeStep(step + 1)}>Next</button>
        </div>
    </div>
}