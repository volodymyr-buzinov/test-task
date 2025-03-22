import { StepPage } from "@/app/_components/StepPage";
import { notFound } from "next/navigation";

interface QuizStepProps {
    params: { step: string }
}

export default async function QuizStep({ params }: QuizStepProps) {
    const queryParams = await params
    const step = Number(queryParams.step);

    if (isNaN(step) || !isFinite(step)) {
        return notFound()
    }

    return <StepPage step={step}/>
}