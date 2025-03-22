"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type QuizContextType = {
    answers: { [key: number]: string[] }; 
    saveAnswer: (step: number, answer: string[]) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
    const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
    console.log(answers, "answers");
    

    const saveAnswer = (step: number, answer: string[]) => {
        setAnswers((prev) => ({ ...prev, [step]: answer }));
    };

    return (
        <QuizContext.Provider value={{ answers, saveAnswer }}>
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