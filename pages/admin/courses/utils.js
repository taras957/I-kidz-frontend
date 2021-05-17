const getUnique = (list) => {
  const uniqueCategories = list.reduce((acc, node) => {
    acc[node.category] = node.age;
    return acc;
  }, {});
  return uniqueCategories;
};
export const getSorted = (list) => {
  const unique = getUnique(list);
  const copy = Object.entries(unique);
  copy.sort((a, b) => {
    const matchesA = a[1].match(/(\d+)/);
    const matchesB = b[1].match(/(\d+)/);
    return matchesA[0] - matchesB[0];
  });
  return copy;
};