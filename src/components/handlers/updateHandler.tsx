export default function UpdateHandler({
  item,
  updatedData,
  type,
  setFunctions,
}: any) {
  // Check if the type exists in setFunctions
  if (type in setFunctions) {
    const setFunction = setFunctions[type]; // Get the corresponding function
    setFunction((prevList: any) => {
      return prevList.map((prev: any) =>
        prev.id === item ? { ...prev, ...updatedData } : prev,
      );
    });
  } else {
    // if there isn't a type of that in setFunctions, we can simply setValue and clearErrors based on type
    console.log("there's an issue with updating this info");
  }
}
