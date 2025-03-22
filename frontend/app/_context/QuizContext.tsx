"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { QuizQuestion } from "../_types";


export type QuizContextType = {
    answers: { [key: number]: string[] }; 
    saveAnswer: (step: number, answer: string[]) => void;
    questions: QuizQuestion[]
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);



interface QuizProviderProps {
    children: ReactNode
    questions: QuizQuestion[]
}

export function QuizProvider({ children, questions }: QuizProviderProps) {
    const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});

    const saveAnswer = (step: number, answer: string[]) => {
        setAnswers((prev) => ({ ...prev, [step]: answer }));
    };

    return (
        <QuizContext.Provider value={{ answers, saveAnswer, questions }}>
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