import { ReactNode } from "react";

import "../../scss/components/_icon-button.scss";

interface IComponentProps {
  icons: { [key: string]: ReactNode };
  clickHandlers: { [key: string]: () => void };
}
export default function IconButtonComponent({
  icons,
  clickHandlers,
}: IComponentProps) {
  return (
    <div className="icon-button-wrap">
      {Object.keys(icons).map((key) => (
        <div
          key={key}
          className="icon-button-button"
          onClick={clickHandlers[key]}
        >
          {icons[key]}
        </div>
      ))}
    </div>
  );
}
