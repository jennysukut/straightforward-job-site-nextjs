export default function DeleteHandler({
  item,
  type,
  setFunctions,
  hasId,
  clearErrors,
  setValue,
}: any) {
  const value = `"${type}"`;

  // Check if the type exists in setFunctions
  if (type in setFunctions) {
    const setFunction = setFunctions[type];

    setFunction((prevList: any) => {
      // Ensure prevList is an array before filtering
      if (!Array.isArray(prevList)) {
        return [];
      }
      if (hasId && hasId[type] === true) {
        return prevList.filter((prev: any) => prev.id !== item);
      } else {
        const updatedList = prevList.filter((prev: any) => prev !== item);
        if (clearErrors) {
          setValue(value, updatedList);
          clearErrors(value);
        }
        return updatedList;
      }
    });
  } else {
    // if there isn't a type of that in setFunctions, console.log an error
    // console.log("there isn't a function associated with this type of input");
  }
}
