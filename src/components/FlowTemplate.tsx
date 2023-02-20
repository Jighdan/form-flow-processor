import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "enums/routes";

interface Props {
  shouldNavigateHomeOnArrowBack?: boolean;
  onArrowBackClick: () => void;
  progressPercentage: number;
  children: ReactNode;
}

export const FlowTemplate = ({
  onArrowBackClick,
  progressPercentage,
  shouldNavigateHomeOnArrowBack = false,
  children,
}: Props) => {
  const navigate = useNavigate();
  const progress = `${progressPercentage}%`;

  const handleArrowBackClick = () => {
    if (shouldNavigateHomeOnArrowBack) {
      navigate(Routes.HOME);
    }

    return onArrowBackClick();
  };

  return (
    <div>
      <div>
        <button type="button" onClick={handleArrowBackClick}>
          ↩ Back Home
        </button>
      </div>

      <div>
        <progress max="100" value={progressPercentage}>
          {progress}
        </progress>
      </div>

      {children}
    </div>
  );
};
