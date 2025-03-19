import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export interface SmallCardProps {
  textOne: string;
  textTwo: string;
  //textThree: string;
  cssclass: string;
  icon: React.ReactNode;
}

function SmallCard(smallCardProps: SmallCardProps) {
  return (
    <Card
      className={cn(
        "bg-white bg-opacity-50 rounded-md w-26 h-26 border-1 border-gray-800 bg-blend-difference shadow-amber-700",
        smallCardProps.cssclass
      )}
    >
      <CardContent className="flex flex-col items-justify  px-0 ">
        <div className="text-1xl font-bold mt-0 text-gray-600 ">
          {smallCardProps.icon} {smallCardProps.textOne}
        </div>
        <p className="text-2xl text-primary ">{smallCardProps.textTwo}</p>
      </CardContent>
    </Card>
  );
}

export default SmallCard;
