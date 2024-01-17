import { cn } from "@/lib/utils";
import React from "react";

const EmptyState = () => {
  return (
    <section
      className={cn(
        " px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-primary-foreground"
      )}
    >
     <div className= {cn("text-center items-center flex flex-col ")}>
      <h3 className= {cn(" mt-2 text-2xl font-medium text-primary/20")}>
        Select a chat or start new conversation 
      </h3>
     </div>
    </section>
  );
};

export default EmptyState;
