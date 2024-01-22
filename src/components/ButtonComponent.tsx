import React, { useState } from "react";
export interface ButtonComponentProps {
  callback: () => void;
  className: string;
  isAsync?: boolean;
  text: string;
  Icon?: React.ComponentType<any>;
}
const ButtonComponent: React.FC<ButtonComponentProps> = ({
  callback,
  text,
  className,
  Icon,
  isAsync,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  return (
    <div
      className={`cursor-pointer flex flex-row justify- items-center justify-around ${className} ${
        isLoading && "cursor-not-allowed	"
      }`}
      onClick={async (e) => {
        e.preventDefault();
        if (isLoading === true) return;
        if (isAsync) {
          setLoading(true);
          await callback();
          setLoading(false);
        }
      }}
    >
      <button className="bg-transparent">{text}</button>
      {isLoading && Icon && <Icon className="w-6 h-6" />}
    </div>
  );
};

export default ButtonComponent;
