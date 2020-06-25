import React, { useRef, useEffect } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import { IMemText } from "../../../client.types";

const MemTextList = ({
  textList,
  setTextList,
  croperRef
}: {
  textList: IMemText[];
  setTextList: React.Dispatch<React.SetStateAction<IMemText[]>>;
  croperRef: any;
}) => {
  const handleDrag = (e: DraggableEvent, ui: DraggableData) =>
    setTextList((prev) => {
      const filteredMemText: IMemText[] = prev.filter((item) => !item.isActive);
      const updatedMemTextItem: IMemText | undefined = prev.find((item) => item.isActive);

      return updatedMemTextItem
        ? [
            ...filteredMemText,
            {
              ...updatedMemTextItem,
              coords: {
                x: updatedMemTextItem.coords.x + ui.deltaX,
                y: updatedMemTextItem.coords.y + ui.deltaY
              }
            }
          ]
        : prev;
    });

  const setMemText = (text: string, maxWidth: number) =>
    setTextList((prev) => {
      const filteredMemText: IMemText[] = prev.filter((item) => !item.isActive);
      const updatedMemTextItem: IMemText | undefined = prev.find((item) => item.isActive);

      return updatedMemTextItem
        ? [
            ...filteredMemText,
            {
              ...updatedMemTextItem,
              text,
              maxWidth
            }
          ]
        : prev;
    });

  const setActiveMemTextItem = (id: number) =>
    setTextList((prev) =>
      prev.map((item) => ({ ...item, isActive: item.id === id ? true : false }))
    );

  const selectAllText = ({ target }: any) => {
    let range = new Range();
    range.selectNodeContents(target);

    const selection = document.getSelection(); // create selection

    if (selection) {
      selection.removeAllRanges(); // cear current selections if exist
      selection.addRange(range);
    }
  };

  return (
    <>
      {!!textList.length && (
        <ul
          className='text-list'
          style={{
            height: croperRef.current.imageRef.offsetHeight,
            width: croperRef.current.imageRef.offsetWidth
          }}
        >
          {textList.map((item) => {
            return (
              <Draggable key={item.id} onDrag={(e, ui) => handleDrag(e, ui)}>
                <li className='text-list-item'>
                  <TextItem
                    item={item}
                    selectAllText={selectAllText}
                    setActiveMemTextItem={setActiveMemTextItem}
                    setMemText={setMemText}
                  />
                </li>
              </Draggable>
            );
          })}
        </ul>
      )}
    </>
  );
};

const TextItem = ({
  item,
  setMemText,
  setActiveMemTextItem,
  selectAllText
}: {
  item: IMemText;
  setMemText: (text: string, width: number) => void;
  selectAllText: (e: any) => void;
  setActiveMemTextItem: (id: number) => void;
}) => {
  const spanRef: any = useRef();

  useEffect(() => {
    spanRef.current.innerText = item.text;
  }, []);

  return (
    <span
      contentEditable
      ref={spanRef}
      className='text-list-item__input'
      onDoubleClick={selectAllText}
      onMouseDown={() => setActiveMemTextItem(item.id)}
      // dangerouslySetInnerHTML={{ __html: item.text }}
      style={{
        color: item.color,
        fontWeight: 700,
        maxWidth: 540 - item.coords.x,
        fontSize: item.fontSize,
        lineHeight: 1,
        display: "block",
        fontFamily: "Arial, sans-serif"
      }}
      onInput={(e: any) => setMemText(e.target.innerText, e.target.offsetWidth)}
    />
  );
};

export default MemTextList;
