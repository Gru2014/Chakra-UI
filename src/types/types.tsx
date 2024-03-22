
export enum PropertyTypes { 
    COLOR="COLOR",
    TEXT= "TEXT", 
    NUMBER="NUMBER", 
    VISIBILITY="VISIBILITY", 
    ENUM="ENUM"
  }
  
  export type ComponentProperty = { 
    value: string;
    type: PropertyTypes;
    enumValues?: string[];
    name: string;
  }
  
  
  export type ConditionalToRender = {
    property?: string;
    operator?: string;
    value?: string;
  };
  
  export type ruleProperty = { 
    name: string;
    type: "ENUM" | "NUMBER" | "TEXT"
    enumValues: string[], 
  }
  
  export type apiVariantData = { 
    variantName: string 
    properties: ComponentProperty[], 
    rules: ConditionalToRender[], 
    percentage: Number
    isDefaultVariant: boolean;
  }
  