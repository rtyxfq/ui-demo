import * as React from "react";
import type { SVGProps } from "react";
const SvgSquareCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-square-check-icon lucide-square-check"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={18} height={18} x={3} y={3} rx={2} />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
SvgSquareCheck.displayName = "SvgSquareCheck";
export default SvgSquareCheck;
