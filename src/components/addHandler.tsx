export default function AddHandler({
  item,
  type,
  setFunctions,
  setValue,
  clearErrors,
}: any) {
  const value = `"${type}"`;

  // Check if the type exists in setFunctions
  if (type in setFunctions) {
    const setFunction = setFunctions[type]; // Get the corresponding function

    setFunction((prevList: any) => {
      const updatedList = [...prevList, item];
      setValue(value, updatedList);
      clearErrors(value);
      return updatedList;
    });
  } else {
    // if there isn't a type of that in setFunctions, we can simply setValue and clearErrors based on type
    setValue(type, item);
    clearErrors(type);
  }
}
