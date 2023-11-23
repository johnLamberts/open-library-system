import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex p-5 justify-center items-center w-screen">
      <div className="flex flex-col items-center h-auto w-auto p-2 space-y-2">
        <h1>Unauthorized user!</h1>

        <div className="relative">
          <p>You do not have access to the requested page.</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
            <defs>
              <linearGradient
                gradientTransform="rotate(270)"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="sssquiggly-grad"
              >
                <stop
                  stopColor="hsl(206, 75%, 49%)"
                  stopOpacity="1"
                  offset="0%"
                ></stop>
                <stop
                  stopColor="hsl(331, 90%, 56%)"
                  stopOpacity="1"
                  offset="100%"
                ></stop>
              </linearGradient>
            </defs>
            <g
              strokeWidth="3.5"
              stroke="url(#sssquiggly-grad)"
              fill="none"
              strokeLinecap="round"
              transform="matrix(1,0,0,1,-5,349.5449562072754)"
            >
              <path d="M10,10C31.726190476190478,12.708333333333332,68.75,30.083333333333336,114.28571428571429,23C159.82142857142858,15.916666666666666,180.95238095238096,-26.291666666666668,228.57142857142858,-24C276.1904761904762,-21.708333333333332,295.2380952380953,31.291666666666668,342.8571428571429,34C390.4761904761905,36.708333333333336,409.5238095238095,-8.916666666666666,457.14285714285717,-11C504.7619047619048,-13.083333333333334,523.8095238095239,25.875,571.4285714285714,24C619.047619047619,22.125,638.0952380952382,-22.291666666666668,685.7142857142858,-20C733.3333333333334,-17.708333333333332,776.1904761904761,23.541666666666668,800,35"></path>
              <path
                d="M10,10C31.726190476190478,12.708333333333332,68.75,30.083333333333336,114.28571428571429,23C159.82142857142858,15.916666666666666,180.95238095238096,-26.291666666666668,228.57142857142858,-24C276.1904761904762,-21.708333333333332,295.2380952380953,31.291666666666668,342.8571428571429,34C390.4761904761905,36.708333333333336,409.5238095238095,-8.916666666666666,457.14285714285717,-11C504.7619047619048,-13.083333333333334,523.8095238095239,25.875,571.4285714285714,24C619.047619047619,22.125,638.0952380952382,-22.291666666666668,685.7142857142858,-20C733.3333333333334,-17.708333333333332,776.1904761904761,23.541666666666668,800,35"
                transform="matrix(1,0,0,1,0,90)"
              ></path>
            </g>
          </svg>
        </div>
        <Button className="z-100" onClick={() => navigate(-1)}>
          Go back to your page.
        </Button>
      </div>
    </div>
  );
}
