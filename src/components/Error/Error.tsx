import React, { FC } from "react";
import "./Error.css";

interface ErrorProps {
  message: string;
}

export const Error: FC<ErrorProps> = ({ message }) => {
  return (
    <div className="error" data-testid="error-state">
      <p>{message}</p>
    </div>
  );
};
