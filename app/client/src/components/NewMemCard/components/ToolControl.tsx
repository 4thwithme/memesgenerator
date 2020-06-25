import React from "react";
import { Card } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faCrop, faSquare, faSave } from "@fortawesome/free-solid-svg-icons";

import { IActiveTool } from "../../../client.types";

const ToolControl = ({
  activeTool,
  setActiveTool,
  updateImage
}: {
  activeTool: IActiveTool;
  setActiveTool: React.Dispatch<React.SetStateAction<IActiveTool>>;
  updateImage: () => void;
}) => {
  return (
    <Card.Content>
      <div className='tool-control'>
        <FontAwesomeIcon
          onClick={() => (activeTool === "text" ? setActiveTool(null) : setActiveTool("text"))}
          icon={faPenSquare}
          size='2x'
          color={activeTool === "text" ? "#00b5ad" : "#bfbfbf"}
        />

        <FontAwesomeIcon
          onClick={() => (activeTool === "crop" ? setActiveTool(null) : setActiveTool("crop"))}
          icon={faCrop}
          size='2x'
          color={activeTool === "crop" ? "#00b5ad" : "#bfbfbf"}
        />

        <FontAwesomeIcon
          onClick={() => (activeTool === "square" ? setActiveTool(null) : setActiveTool("square"))}
          icon={faSquare}
          size='2x'
          color={activeTool === "square" ? "#00b5ad" : "#bfbfbf"}
        />

        <FontAwesomeIcon
          icon={faSave}
          color='#00b5ad'
          size='2x'
          className='tool-kits__text-add'
          onClick={updateImage}
        />
      </div>
    </Card.Content>
  );
};

export default ToolControl;
