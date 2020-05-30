import React from "react";
import { Card, Icon, Image, Form, Button } from "semantic-ui-react";

import LS from "../../client.utils/LS";
import { useDidMount } from "../../hooks";

import { IPropsNewMemCard } from "../types";

const NewMemCard = ({
  mem,
  setMem,
  handleOnNameChange,
  handleOnTagChange,
  isDisabled,
  handleSubmit
}: IPropsNewMemCard) => {
  useDidMount(() => {
    return window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setMem({
          file: null,
          url: null,
          internalUrl: null,
          name: "",
          memSrc: "none",
          createdAt: new Date().toLocaleDateString(),
          authorId: LS.getItem("id"),
          tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
        });
      }
    });
  });

  return (
    <Card fluid>
      <Image src={mem.internalUrl || mem.url} wrapped ui={false} />
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
        <Card.Description>Author: {LS.getItem("username") || "NoNemeNPC"}</Card.Description>
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
