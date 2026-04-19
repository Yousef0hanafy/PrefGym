'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DemoView = 'landing' | 'admin' | 'portal';

interface DemoContextType {
  currentView: DemoView;
  setCurrentView: (view: DemoView) => void;
}

const DemoContext = createContext<DemoContextType>({
  currentView: 'landing',
  setCurrentView: () => {},
});

export function useDemoView() {
  return useContext(DemoContext);
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<DemoView>('landing');

  return (
    <DemoContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </DemoContext.Provider>
  );
}