import Label from '../common/Label';
function Field(props) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label>Field {props.fieldIndex}</Label>
        <div className="flex flex-col gap-2 overflow-hidden whitespace-normal break-all">
          {props.data.value.map((sub, i) => (
            <div
              key={i}
              className="mr-4 flex justify-center rounded-md bg-[#2c2c2e] p-2 px-4  text-sm"
            >
              <div>{sub.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Field;
