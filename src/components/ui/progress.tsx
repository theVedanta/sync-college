"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, color, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={`h-full w-full flex-1 transition-all ${
                color === "orange"
                    ? "bg-orange-600"
                    : color === "green"
                      ? "bg-green-600"
                      : color === "red"
                        ? "bg-red-600"
                        : color === "blue"
                          ? "bg-blue-600"
                          : "bg-gray-600"
            }`}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
