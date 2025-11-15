import React, { createContext, useContext, useState, ReactNode } from 'react';

type Gender = 'male' | 'female';

interface GenderContextType {
  gender: Gender;
  setGender: (gender: Gender) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export function GenderProvider({ children }: { children: ReactNode }) {
  const [gender, setGender] = useState<Gender>('male');

  return (
    <GenderContext.Provider value={{ gender, setGender }}>
      {children}
    </GenderContext.Provider>
  );
}

export function useGender() {
  const context = useContext(GenderContext);
  if (!context) {
    throw new Error('useGender must be used within GenderProvider');
  }
  return context;
}
