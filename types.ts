
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Quiz: {
    category: {
      id: string;
      name: string;
      subcategories: string[];
    };
  };
  Result: {
    score: number;
    totalQuestions?: number;
  };
};
