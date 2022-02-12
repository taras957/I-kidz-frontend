import React, { FC, SVGProps } from "react";

const RussianIcon: FC<SVGProps<SVGSVGElement>> = ({
  height = "12px",
  width = "12px",
  color = "#F9F9F9",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.98123 0.375C3.54373 0.375 1.46248 1.95 0.693726 4.125H11.3062C10.5187 1.95 8.43747 0.375 5.98123 0.375Z"
      fill={color}
    />
    <path
      d="M5.98123 11.625C8.43748 11.625 10.5187 10.05 11.2875 7.875H0.693726C1.46248 10.0687 3.54373 11.625 5.98123 11.625Z"
      fill={color}
    />
    <path
      d="M0.69375 4.125C0.4875 4.70625 0.375 5.34375 0.375 6C0.375 6.65625 0.4875 7.29375 0.69375 7.875H11.3062C11.5125 7.29375 11.625 6.65625 11.625 6C11.625 5.34375 11.5125 4.70625 11.3062 4.125H0.69375Z"
      fill={color}
    />
  </svg>
);

export default RussianIcon;
