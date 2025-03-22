import "./index.css";

interface ProgressBarProps {
  step: number;
  questionsLength: number;
}

export const ProgressBar = ({ step, questionsLength }: ProgressBarProps) => {
  const progress = ((step) / questionsLength) * 100;

  return (
    <div className="ProgressBar-wrap">
    <p className="ProgressBar-progress">Step: {step} out of {questionsLength}</p>
    <div className="ProgressBar">
      <div className="ProgressBar-bar" style={{ width: `${progress}%` }} />
    </div>
    </div>
  );
}