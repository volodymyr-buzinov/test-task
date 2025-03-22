import "./ProgressBar.css";

interface ProgressBarProps {
  answersLength: number;
  questionsLength: number;
}

export const ProgressBar = ({ answersLength, questionsLength }: ProgressBarProps) => {
  const progress = (answersLength / questionsLength) * 100;

  return (
    <div className="ProgressBar-wrap">
    <p className="ProgressBar-progress">Finished {answersLength} from {questionsLength}</p>
    <div className="ProgressBar">
      <div className="ProgressBar-bar" style={{ width: `${progress}%` }} />
    </div>
    </div>
  );
}