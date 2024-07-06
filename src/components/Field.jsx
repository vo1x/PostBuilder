import { useState, useEffect } from 'react';
import useFileSize from '../hooks/useFileSize';
function Field(props) {
  const { getReadableFS } = useFileSize();

  return (
    <>
      <div className="flex flex-col rounded-md border border-white/20 bg-white/5 p-2">
        <div className="flex items-center justify-between ">
          <span className="font-bold text-neutral-100">Field {props.fieldIndex} </span>
        </div>
        <span className="my-2 border-b border-neutral-500"></span>

        <div className="overflow-hidden whitespace-normal break-all">
          {props.data.value.map((sub, i) => (
            <div className="mb-2 flex justify-center rounded-md border border-neutral-700 bg-neutral-700 p-1 text-sm">
              <div>{sub.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Field;
