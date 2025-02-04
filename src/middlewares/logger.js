export default function logger() {
  return (next) => (action) => {
    console.log("Dispatch: ", action.type);
    console.log("Payload: ", action.payload);
    return next(action);
  };
}
