import React, { useContext, useState, useReducer, useRef, useEffect } from "react";
import { Card, Icon, Form, Button } from "semantic-ui-react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { useDidMount } from "../../hooks";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import settingsReducer, {
  initialState,
  CROP,
  DISCARD,
  SET_IMAGE_PARAMS
} from "./NewMemCard.reducer";

import ToolControl from "./components/ToolControl";
import ToolKits from "./components/ToolKits";
import MemTextList from "../../containers/MemesCreator/components/MemTextList";
import { drawNewImage } from "../../client.utils";

import { IPropsNewMemCard, IActiveTool, IMemText } from "../../client.types";

const NewMemCard = ({
  mem,
  setMem,
  handleOnNameChange,
  handleOnTagChange,
  isDisabled,
  handleSubmit
}: IPropsNewMemCard) => {
  const { user } = useContext(AuthContext);
  const [activeTool, setActiveTool] = useState<IActiveTool>(null);

  //for cropp
  const [settings, dispatch] = useReducer(settingsReducer, initialState);

  //for meme texts
  const [textList, setTextList] = useState<IMemText[]>([]);

  const croperRef: any = useRef();

  const src = mem.internalUrl || mem.url;

  useDidMount(() => {
    // escape press -> discard current mem and back to loading compoennt
    return window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setMem({
          file: null,
          url: null,
          internalUrl: null,
          name: "",
          memSrc: "none",
          createdAt: String(Date.now()),
          author: user ? user.id : null,
          tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
        });
      }
    });
  });

  useEffect(() => {
    if (activeTool === "crop") {
      croperRef.current.cropSelectRef.style.zIndex = 44;
    } else {
      croperRef.current.cropSelectRef && (croperRef.current.cropSelectRef.style.zIndex = 0);
    }
  }, [activeTool]);

  const updateImage = async () => {
    if (src) {
      const { file, url }: any = await drawNewImage(
        src,
        settings.imageParams,
        settings.crop,
        textList
      );

      dispatch({ type: DISCARD });
      setTextList([]);

      setMem((prev) => ({
        ...prev,
        file,
        url
      }));
    }

    setActiveTool(null);
  };

  const setImageParams = () =>
    dispatch({
      type: SET_IMAGE_PARAMS,
      payload: {
        width: croperRef.current.imageRef.offsetWidth,
        height: croperRef.current.imageRef.offsetHeight
      }
    });

  return (
    <Card fluid>
      <div className='img-crop__wrap'>
        {src && (
          <ReactCrop
            crossorigin='anonymous'
            ref={croperRef}
            onImageLoaded={() => setImageParams()}
            disabled={activeTool !== "crop"}
            src={src}
            crop={settings.crop}
            onComplete={(crop) => dispatch({ type: CROP, payload: crop })}
            onChange={(crop) => dispatch({ type: CROP, payload: crop })}
          />
        )}
        <MemTextList croperRef={croperRef} textList={textList} setTextList={setTextList} />
      </div>

      <ToolControl
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        updateImage={updateImage}
      />

      <ToolKits activeTool={activeTool} setTextList={setTextList} />

      <Card.Content>
        <Card.Header>
          <Form.Input
            fluid
            placeholder='Memes name'
            value={mem.name}
            onChange={handleOnNameChange}
          />
        </Card.Header>
        <Card.Meta>
          <span className='date'>{new Date().toLocaleDateString()}</span>
        </Card.Meta>
        <Card.Description>Author: {user ? user.username : "NoNemeNPC"}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {["1", "2", "3", "4", "5"].map((num) => {
          return (
            <div className='tag-wrap' key={num}>
              <Icon size='big' name='hashtag' />

              <Form.Input
                fluid
                value={mem.tags[num]}
                onChange={(e) => handleOnTagChange(e, num)}
                placeholder={"memes tag " + num}
              />
            </div>
          );
        })}
      </Card.Content>

      <Button fluid color='teal' onClick={handleSubmit} disabled={isDisabled()}>
        Submit
      </Button>
    </Card>
  );
};

export default NewMemCard;
