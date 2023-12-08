export const getStepMap = stepLabels =>
  stepLabels.reduce((prev, cur, index) => {
    const prevMax = Math.max(...[...Object.keys(prev), 0])
    const curSteps =
      cur?.subSteps === undefined
        ? {
          [prevMax + 1]: `${index + 1}`
        }
        : {
          ...cur?.subSteps?.reduce(
            (subPrev, subCur, subIndex) => ({
              ...subPrev,
              [prevMax + subIndex + 1]: `${index + 1}-${subIndex + 1}`
            }),
            {}
          )
        }

    return {
      ...prev,
      ...curSteps
    }
  }, {})
