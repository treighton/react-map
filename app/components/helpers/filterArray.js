const filterArrayByField = (searchedArray, arrayOfFilters, fieldName) => {
  // filter return new array consisting from elements that satisfy condition
  let filteredArray = searchedArray.filter(element => {
    // tests whether at least one element in the array passes the test implemented by the provided function
    return element[fieldName].some(el => arrayOfFilters.indexOf(el) != -1)
  })
  return filteredArray
}

export default filterArrayByField;