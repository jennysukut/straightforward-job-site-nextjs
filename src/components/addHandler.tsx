export default function AddHandler({
  item,
  type,
  setFunctions,
  setValue,
  clearErrors,
  hasId,
  counterFunctions,
  counterDetails,
  oneChoice,
}: any) {
  const value = `"${type}"`;

  // Check if there are setFunctions and if the type exists in setFunctions
  if (setFunctions) {
    console.log(
      "trying to add something with a setFunction - hasId:",
      hasId,
      "type:",
      type,
      "setFunctions:",
      setFunctions,
    );
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
      } else if (oneChoice === true) {
        setFunction(item);
        setValue(value, item);
        clearErrors(value);
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
