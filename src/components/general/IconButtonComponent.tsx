import { ReactNode } from "react";

import "../../scss/components/_icon-button.scss";

interface IComponentProps {
  icons: { icon: ReactNode; onClick: () => void }[];
}
export default function IconButtonComponent({ icons }: IComponentProps) {
  return (
    <div className="icon-button-wrap">
      {icons.map((icon, index) => (
        <div key={index} className="icon-button-button" onClick={icon.onClick}>
          {icon.icon}
        </div>
      ))}
    </div>
  );
}
