import React, { useContext } from "react";
import { Card, Icon, Image, Form, Button } from "semantic-ui-react";

import { useDidMount } from "../../hooks";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import { IPropsNewMemCard } from "../../client.types";
import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import { MODAL_NAME } from "../../client.utils/constants";

const NewMemCard = ({
  mem,
  setMem,
  handleOnNameChange,
  handleOnTagChange,
  isDisabled,
  handleSubmit
}: IPropsNewMemCard) => {
  const { user } = useContext(AuthContext);
  const { addModal } = useContext(ModalContext);

  useDidMount(() => {
    return window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        user &&
          setMem({
            file: null,
            url: null,
            internalUrl: null,
            name: "",
            memSrc: "none",
            createdAt: String(Date.now()),
            authorId: user.id,
            tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
          });
      }
    });
  });

  return (
    <Card fluid>
      <Image
        src={mem.internalUrl || mem.url}
        wrapped
        ui={false}
        style={{ cursor: "pointer" }}
        onClick={() => addModal(MODAL_NAME.MEMES_CREATOR, { src: mem.internalUrl || mem.url })}
      />
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
