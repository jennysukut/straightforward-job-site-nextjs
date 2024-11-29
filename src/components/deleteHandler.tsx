export default function DeleteHandler({
  item,
  type,
  setFunctions,
  hasId,
}: any) {
  // Check if the type exists in setFunctions
  if (type in setFunctions) {
    const setFunction = setFunctions[type]; // Get the corresponding function
    setFunction((prevList: any) => {
      // check if the thing to be deleted needs to be sorted by an id or not
      if (hasId === true) {
        return prevList.filter((prev: any) => prev.id !== item);
      } else {
        return prevList.filter((prev: any) => prev !== item);
      }
    });
  } else {
    // if there isn't a type of that in setFunctions, console.log an error
    console.log("there isn't a function associated with this type of input");
  }
}
