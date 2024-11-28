export default function AddHandler({
  item,
  type,
  setFunctions,
  setValue,
  clearErrors,
}: any) {
  // Check if the type exists in setFunctions
  if (type in setFunctions) {
    const setFunction = setFunctions[type]; // Get the corresponding function

    setFunction((prevList: any) => {
      const updatedList = [...prevList, item];
      setValue(type, updatedList);
      clearErrors(type);
      return updatedList;
    });
  } else {
    console.warn(`No function found for type: ${type}`);
  }
}
