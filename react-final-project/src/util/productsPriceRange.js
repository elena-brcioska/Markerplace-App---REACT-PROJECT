export const copyData = (data) => {
  return JSON.parse(JSON.stringify(data));
}

export const getMinRange = (data) => {
    const minRangeArr = data.products.sort((a, b) => a.cost - b.cost);
    return parseInt(minRangeArr[0].cost);
  };

 export const getMaxRange = (data) => {
    const maxRangeArr = data.products.sort((a, b) => b.cost - a.cost);
    return parseInt(maxRangeArr[0].cost);
  };