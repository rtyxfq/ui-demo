import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleDot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-circle-dot-icon lucide-circle-dot"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <circle cx={12} cy={12} r={1} />
  </svg>
);
SvgCircleDot.displayName = "SvgCircleDot";
export default SvgCircleDot;
