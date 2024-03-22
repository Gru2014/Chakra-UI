'use client'
import React, { useContext, createContext, ReactNode } from 'react';
import { apiVariantData, ComponentProperty } from '../types/types'

interface MyContextProps {
  variants: Array<apiVariantData>;
  setVariants: (variants: Array<apiVariantData>) => void;
  currentVariant: apiVariantData;
  setCurrentVariant: (variant: apiVariantData) => void;
  duplicatedProperties: Array<ComponentProperty> | undefined;
  setDuplicatedProperties: (properties: Array<ComponentProperty>) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variants, setVariants] = React.useState<Array<apiVariantData>>([
    {
      variantName: "Variant1",
      properties: [],
      rules: [{property: "User Id", operator: "equals", value: "", indexWithinGroup: 0, orGroupId: 0}],
      percentage: 0,
      isDefaultVariant: false
    }
  ]);
  const [currentVariant, setCurrentVariant] = React.useState<apiVariantData>(
    {
      variantName: "Variant1",
      properties: [],
      rules: [],
      percentage: 0,
      isDefaultVariant: false
    }
  );
  const [duplicatedProperties, setDuplicatedProperties] = React.useState<Array<ComponentProperty>>();

  return <MyContext.Provider value={{ variants, setVariants, currentVariant, setCurrentVariant, duplicatedProperties, setDuplicatedProperties }}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};