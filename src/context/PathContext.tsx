import React, { createContext, useState, useContext, ReactNode } from 'react'

type SelectedPathContextType = {
  selectedPath: string
  setSelectedPath: (path: string) => void
}

const SelectedPathContext = createContext<SelectedPathContextType | undefined>(
  undefined
)

export const SelectedPathProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPath, setSelectedPath] = useState('/')

  return (
    <SelectedPathContext.Provider value={{ selectedPath, setSelectedPath }}>
      {children}
    </SelectedPathContext.Provider>
  )
}

export const useSelectedPath = () => {
  const context = useContext(SelectedPathContext)
  if (context === undefined) {
    throw new Error(
      'useSelectedPath must be used within a SelectedPathProvider'
    )
  }
  return context
}
