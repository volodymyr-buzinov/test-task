"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { QuizQuestion } from "../_types";
import { useRouter } from "next/navigation";


interface SaveAnswer {
    step: number
    answer: string[]
}

export type QuizContextType = {
    answers: { [key: number]: string[] }; 
    saveAnswer: (props: SaveAnswer) => void;
    questions: QuizQuestion[]
    changeStep: (nextStep: number) => void 
    clearAnswer: (step: number) => void
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);



interface QuizProviderProps {
    children: ReactNode
    questions: QuizQuestion[]
    
}

export function QuizProvider({ children, questions}: QuizProviderProps) {
    const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
    const router = useRouter()
    

    const saveAnswer = ({answer, step}: SaveAnswer) => {
        setAnswers((prev) => ({ ...prev, [step]: answer }))
    };

    const clearAnswer = (step: number) => {
        const newAnswers = JSON.parse(JSON.stringify(answers))
        delete newAnswers[step]
        setAnswers(newAnswers)
    }

    const changeStep = (nextStep: number) => {
        if (nextStep > questions.length || nextStep < 0) return;
        router.push(`/quiz/${nextStep}${location.search ? `${location.search}` : ""}`)
    }

    return (
        <QuizContext.Provider value={{ answers, saveAnswer, questions, changeStep, clearAnswer }}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}