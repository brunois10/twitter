import React from "react";
import { Buttons } from "./styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
    <Buttons {...props}>{children}</Buttons>
);

export default Button;
