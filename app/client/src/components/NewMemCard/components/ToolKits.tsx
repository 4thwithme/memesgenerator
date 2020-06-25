import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import Select from "react-select";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TEXT_COLORS, TEXT_SIZE } from "../../../client.utils/constants";

import { IActiveTool, IMemText } from "../../../client.types";

const ToolKits = ({
  activeTool,
  setTextList
}: {
  activeTool: IActiveTool;
  setTextList: React.Dispatch<React.SetStateAction<IMemText[]>>;
}) => {
  const [color, setColor] = useState(TEXT_COLORS[1].value);

  //add new empty meme text item
  const createNewMemText = () =>
    setTextList((prev) => [
      ...prev.map((item) => ({ ...item, isActive: false })),
      {
        id: Math.random() * 1000,
        coords: { x: 0, y: 0 },
        text: "Meme Text",
        fontSize: TEXT_SIZE[2].value,
        color,
        isActive: true,
        maxWidth: 300
      }
    ]);

  // for select meme text font size
  const setMemTextSize = (value: number) =>
    setTextList((prev) => {
      const filteredMemText: IMemText[] = prev.filter((item) => !item.isActive);
      const updatedMemTextItem: IMemText | undefined = prev.find((item) => item.isActive);

      return updatedMemTextItem
        ? [
            ...filteredMemText,
            {
              ...updatedMemTextItem,
              fontSize: value
            }
          ]
        : prev;
    });

  // for select meme text font color
  const setMemTextColor = (color: string) => {
    setColor(color);

    setTextList((prev) => {
      const filteredMemText: IMemText[] = prev.filter((item) => !item.isActive);
      const updatedMemTextItem: IMemText | null = prev.find((item) => item.isActive) || null;

      return updatedMemTextItem
        ? [
            ...filteredMemText,
            {
              ...updatedMemTextItem,
              color
            }
          ]
        : prev;
    });
  };

  //switch-case statment for rendering
  const renderKits = () => {
    switch (activeTool) {
      case "text":
        return (
          <Card.Content>
            <div className='tool-kits'>
              <FontAwesomeIcon
                icon={faPlus}
                color='#00b5ad'
                size='2x'
                className='tool-kits__text-add'
                onClick={createNewMemText}
              />

              <ul className='tool-kits__list'>
                {TEXT_COLORS.map((colorItem) => {
                  return (
                    <li
                      onClick={() => setMemTextColor(colorItem.value)}
                      data-isactive={color === colorItem.value}
                      key={colorItem.value}
                      style={{
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        backgroundColor: colorItem.value
                      }}
                    />
                  );
                })}

                <input type='color' onInput={(e: any) => setMemTextColor(e.target.value)} />
              </ul>

              <Select
                options={TEXT_SIZE}
                isSearchable
                defaultValue={TEXT_SIZE[2]}
                onChange={(selectedItem: any) => setMemTextSize(selectedItem.value)}
                className='select-size__wrap'
                classNamePrefix='select-size'
              />
            </div>
          </Card.Content>
        );

      default:
        return null;
    }
  };

  return renderKits();
};

export default React.memo(ToolKits);
