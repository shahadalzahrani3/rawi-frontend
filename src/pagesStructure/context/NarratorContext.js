import { createContext, useContext } from "react";

export const NarratorContext = createContext(null);

export function useNarrator() {
  const context = useContext(NarratorContext);

  if (!context) {
    throw new Error("useNarrator must be used inside NarratorLayout");
  }

  return context;
}
// this gives the narrator contex most narrator components will 
// need to use the narrator context to get the current state of the narrator
//  and to update it.
//  The context provides a way to share data between 
// components without having to pass props down manually at every level.