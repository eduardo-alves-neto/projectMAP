const formatCurrency = (value: number, currency: string): string => {
  return value.toLocaleString('pt-br', { style: 'currency', currency });
};

export default formatCurrency;
