import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

import convertToDate from "../../client.utils/convertToDate";

import { IMem } from "../../client.types";

const MemCard = ({ mem }: { mem: IMem }) => {
  return (
    <Card fluid className='mem-card'>
      <Image src={mem.file} wrapped ui={false} className='mem-img' />
      <Card.Content>
        <Card.Header className='mem-name'>{mem.name.toUpperCase()}</Card.Header>
        <Card.Meta>
          <span className='date'>{convertToDate(mem.createdAt)}</span>
        </Card.Meta>
        <Card.Description>
          Author: {typeof mem.author === "object" && mem.author ? mem.author.username : "NoNameNPC"}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {Object.values(mem.tags).map((tag, i) => {
          return (
            <div className='tag-wrap' key={i}>
              <Icon size='small' name='hashtag' />
              <span>{tag}</span>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
};

export default React.memo(MemCard);
