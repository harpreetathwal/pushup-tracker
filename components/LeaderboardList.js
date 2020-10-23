import Leader from "./Leader.js";
export default (props) => {
  console.log("PROPS", props.leaders);
  return (
    <div className="container">
      {props.leaders.map((leader, index) => (
        <div className="container">
          <Leader leader={leader} index={index + 1} />
        </div>
      ))}
    </div>
  );
};