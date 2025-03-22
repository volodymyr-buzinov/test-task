"use client"
import posthog from "posthog-js"
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

  const handleAnswersChange = (newAnswer: QuizAnswer) => {
    const answersState = answers[step] || [] 
    const answerExists = answersState.some(answ => answ.id === newAnswer.id)
    if (!currentQuestion.multiple) return saveAnswer({step, answer: answerExists ? [] : [newAnswer]})
    
    saveAnswer({step, answer: answerExists ? answersState.filter((answ) => answ.id !== newAnswer.id) : [...answersState, newAnswer]})
  }

  const goNext = () => {
    posthog.capture("user-answered-question", {quizAnswer: answers[step] || [] , quizStep: step})
    changeStep(step + 1, answers[step]?.find(answ => answ.setParam)?.setParam)
  }


  if (dataIsPending) return <div className="Step"><span className="Step-loader"></span></div>
    
    return <div className="Step">
        <h1 className="Step-title">{optionalData ? optionalData.title : currentQuestion.title}</h1>
        <ul className="Step-list">
        {(optionalData ? optionalData.answers : currentQuestion.answers).map(answer => 
        <li className={`Step-answer ${(answers[step] || []).some(answ => answ.id === answer.id) ? "active" : ""}`} key={answer.id} onClick={() => handleAnswersChange(answer)}>
         {answer.text}
        </li>)}
        </ul>
        <div className="Step-control">
            <button className="Step-btn" disabled={step <= 1} onClick={() => changeStep(step - 1)}>Prev</button>
            <button className="Step-btn" disabled={step >= questions?.length || !answers[step]?.length} onClick={goNext}>Next</button>
        </div>
    </div>
}