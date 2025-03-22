

export default async function QuizStep({ params }: { params: { step: string } }) {
    const queryParams = await params
    const stepNumber = Number(queryParams.step);

    // const res = await fetch("https://your-api.com/quiz-questions", {
    //     next: { revalidate: 60 }, // ISR: Refreshes every 10 seconds
    // });

    // if (!res.ok) {
    //     notFound();
    // }

    // const questions = await res.json();
    // if (stepNumber > questions.length) {
    //     notFound();
    // }

   

    return (
        <div>
            <h1>Quiz Step {stepNumber}</h1>
            
        </div>
    );
}