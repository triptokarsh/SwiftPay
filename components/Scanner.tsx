import React from "react";

interface IconProps {
  color: string;
  width: number;
  height: number;
}

function Icon({ color, width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width= {width}
      height= {height}
      fill="none"
      viewBox= {"0 0 " + width + " " + height}
    >
      <g clipPath="url(#clip0_13_67)">
        <path
          fill="#000"
          d="M7.292 21.875H4.375v5.833a2.925 2.925 0 002.917 2.917h5.833v-2.917H7.292v-5.833zm0-14.583h5.833V4.375H7.292a2.925 2.925 0 00-2.917 2.917v5.833h2.917V7.292zm20.416-2.917h-5.833v2.917h5.833v5.833h2.917V7.292a2.925 2.925 0 00-2.917-2.917zm0 23.333h-5.833v2.917h5.833a2.925 2.925 0 002.917-2.917v-5.833h-2.917v5.833zM17.5 11.667a5.832 5.832 0 00-5.833 5.833 5.832 5.832 0 005.833 5.833 5.832 5.832 0 005.833-5.833 5.832 5.832 0 00-5.833-5.833zm0 8.75a2.925 2.925 0 01-2.917-2.917 2.925 2.925 0 012.917-2.917 2.925 2.925 0 012.917 2.917 2.925 2.925 0 01-2.917 2.917z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_13_67">
          <path fill={color} d="M0 0H35V35H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default Icon;