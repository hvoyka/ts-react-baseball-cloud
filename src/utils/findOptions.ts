type Option = {
  label: string;
  value: string;
};

type OptionsData = Option[];

export const findOneOption = (optionsData: OptionsData, value: string) => {
  return optionsData.find((element) => element.value === value);
};
