import { FC, ReactNode, Children, cloneElement, isValidElement } from "react";
import styles from "./Steps.module.css";
import { Icon } from "../index";

export interface StepsProps {
  current?: number;
  direction?: "horizontal" | "vertical";
  status?: "wait" | "process" | "finish" | "error";
  size?: "default" | "small";
  children: ReactNode;
  className?: string;
}

export interface StepProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  status?: "wait" | "process" | "finish" | "error";
}

interface StepsComponent extends FC<StepsProps> {
  Step: FC<StepProps>;
}

export const Steps: StepsComponent & { Step: FC<StepProps> } = ({
  current = 0,
  direction = "horizontal",
  status = "process",
  size = "default",
  children,
  className = "",
}) => {
  const stepsCount = Children.count(children);

  const renderSteps = () => {
    return Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;

      const stepStatus =
        index < current ? "finish" : index === current ? status : "wait";

      const stepProps = {
        index,
        isLast: index === stepsCount - 1,
        status: stepStatus,
        direction,
        size,
        ...child.props,
      };

      return cloneElement(child, stepProps);
    });
  };

  return (
    <div
      className={`${styles.steps} ${styles[direction]} ${styles[size]} ${className}`}>
      {renderSteps()}
    </div>
  );
};

interface InternalStepProps extends StepProps {
  index: number;
  isLast: boolean;
  status: "wait" | "process" | "finish" | "error";
  direction: "horizontal" | "vertical";
  size: "default" | "small";
}

const Step: FC<InternalStepProps> = ({
  title,
  description,
  icon,
  index,
  isLast,
  status,
  direction,
}) => {
  const renderIcon = () => {
    if (icon) {
      return <div className={styles.customIcon}>{icon}</div>;
    }

    if (status === "finish") {
      return (
        <div className={`${styles.stepIcon} ${styles.finish}`}>
          <Icon
            name="check"
            size="sm"
          />
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className={`${styles.stepIcon} ${styles.error}`}>
          <Icon
            name="close"
            size="sm"
          />
        </div>
      );
    }

    return (
      <div
        className={`${styles.stepIcon} ${
          status === "process" ? styles.process : ""
        }`}>
        {index + 1}
      </div>
    );
  };

  return (
    <div className={`${styles.step} ${styles[status]}`}>
      <div className={styles.stepContainer}>
        <div className={styles.iconContainer}>
          {renderIcon()}
          {!isLast && (
            <div className={`${styles.stepTail} ${styles[direction]}`}></div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.stepTitle}>{title}</div>
          {description && (
            <div className={styles.stepDescription}>{description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

Steps.Step = Step as FC<StepProps>;
