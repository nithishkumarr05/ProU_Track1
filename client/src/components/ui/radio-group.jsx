import React, { createContext, useContext } from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = createContext({})

const RadioGroup = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, value, id, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(RadioGroupContext)
  const isSelected = selectedValue === value

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isSelected}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-gray-300 text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        isSelected && "border-teal-600 bg-teal-50",
        className
      )}
      onClick={() => onValueChange?.(value)}
      {...props}
    >
      {isSelected && (
        <div className="h-2.5 w-2.5 rounded-full bg-teal-600 mx-auto" />
      )}
    </button>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
