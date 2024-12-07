export default function AddHandler({
  item,
  type,
  setFunctions,
  setValue,
  clearErrors,
  hasId,
  counterFunctions,
  counterDetails,
}: any) {
  const value = `"${type}"`;

  // Check if there are setFunctions and if the type exists in setFunctions
  if (setFunctions) {
    if (type in setFunctions) {
      const setFunction = setFunctions[type]; // Get the corresponding function

      if (hasId === true) {
        const counterFunction = counterFunctions[type]; // Get the corresponding function
        const counterData = counterDetails[type];
        const newData = {
          ...item,
          id: counterData,
        };
        counterFunction((prev: any) => prev + 1);
        setFunction((prev: any) => [...prev, newData]);
      } else {
        setFunction((prevList: any) => {
          const updatedList = [...prevList, item];
          setValue(value, updatedList);
          clearErrors(value);
          return updatedList;
        });
      }
    }
  } else {
    // if there isn't a type of that in setFunctions, we can simply setValue and clearErrors based on type
    setValue(type, item);
    clearErrors(type);
  }
}
