import { QuizProvider } from "../_context/QuizContext";
import { QuizQuestion } from "../_types";



async function getQuizData(): Promise<{data: QuizQuestion[]}> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/quizzes?populate=*`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Failed to fetch quiz data");
    return res.json();
}

export default async function QuizLayout({ children }: { children: React.ReactNode }) {
    const questions = await getQuizData();

    return <QuizProvider questions={questions.data}>{children}</QuizProvider>;
}