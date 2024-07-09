export const extractSortNumber = (sortObj) => {
  let sortNumber = 0;
  if (sortObj.sortOrder === "desc") {
    sortNumber++;
  }
  if (sortObj.sortBy === "releaseYear") {
    sortNumber += 2;
  }
  return sortNumber;
};

export const getSortObj = (sortNumber) => {
  const sortObj = {};
  if (sortNumber % 2 == 1) {
    sortObj.sortOrder = "desc";
  } else {
    sortObj.sortOrder = "asc";
  }
  if (Math.floor(sortNumber / 2) == 0) {
    sortObj.sortBy = "price";
  } else {
    sortObj.sortBy = "releaseYear";
  }
  return sortObj;
};
