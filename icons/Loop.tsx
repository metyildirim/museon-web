import * as React from "react";

function SvgLoop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-256 -256 1024 1024"
      {...props}
    >
      <defs>
        <path
          d="M416 320H127.87v-64L0 352l127.87 96v-64H416c52.94 0 96-43.12 96-96h-64c-9.58 21.33-20.25 32-32 32z"
          id="loop_svg__a"
        />
        <path
          d="M384 192v64l128-96-128-96v64H96c-52.94 0-96 43.01-96 96h64c0-17.63 14.37-32 32-32h288z"
          id="loop_svg__b"
        />
      </defs>
      <use xlinkHref="#loop_svg__a" />
      <use
        xlinkHref="#loop_svg__a"
        fillOpacity={0}
        stroke="#000"
        strokeOpacity={0}
      />
      <g>
        <use xlinkHref="#loop_svg__b" />
        <use
          xlinkHref="#loop_svg__b"
          fillOpacity={0}
          stroke="#000"
          strokeOpacity={0}
        />
      </g>
    </svg>
  );
}

export default SvgLoop;
