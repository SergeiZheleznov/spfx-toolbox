import * as React from "react";

export interface IColorCardProps {
  color: string;
  name: string;
  onClickHandler(event: React.MouseEvent<HTMLButtonElement>): void;
}
