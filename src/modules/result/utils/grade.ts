const calculateCorrectRatio = (
  correctTotal: number | undefined,
  questionTotal: number | undefined
) => {
  if (correctTotal && questionTotal) {
    if (questionTotal === 0) {
      return 100;
    }

    return parseFloat(((correctTotal / questionTotal) * 100).toFixed(1));
  }

  return 0;
};

export { calculateCorrectRatio };
