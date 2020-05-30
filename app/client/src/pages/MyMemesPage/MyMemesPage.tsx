import React, { useState, useEffect } from "react";
import { Dimmer, Loader, Card, Image, Icon } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import QUERIES from "../../queries/queries";
import "../../styles/MyMemesPage.scss";
import { LIMIT } from "../../client.utils/constants";
import LS from "../../client.utils/LS";

import { IMem } from "../../client.types";
import Scrollbars from "react-custom-scrollbars";

const MyMemesPage = () => {
  const [memes, setMemes] = useState([]);

  const { loading, data, fetchMore } = useQuery(QUERIES.FETCH_MEMES_BY_AUTHOR_ID, {
    variables: { authorId: LS.getItem("id"), limit: LIMIT, offset: 0 }
  });

  useEffect(() => {
    data && setMemes(data.getMemes);
  }, [data]);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (clientHeight + scrollTop === scrollHeight) {
      console.log("upload new memes");

      fetchMore({
        variables: { authorId: LS.getItem("id"), limit: LIMIT, offset: memes.length },
        updateQuery: (prevData, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevData;
          return Object.assign({}, prevData, {
            getMemes: [...prevData.getMemes, ...fetchMoreResult.getMemes]
          });
        }
      });
    }
  };

  return (
    <main className='mem-page-wrap'>
      {loading && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}

      <div className='memes-list'>
        <Scrollbars autoHide onScroll={handleScroll}>
          {memes.length
            ? memes.map((mem: IMem) => {
                return (
                  <Card key={mem.id} fluid className='mem-card'>
                    <Image src={mem.file} wrapped ui={false} className='mem-img' />
                    <Card.Content>
                      <Card.Header className='mem-name'>{mem.name.toUpperCase()}</Card.Header>
                      <Card.Meta>
                        <span className='date'>{mem.createdAt}</span>
                      </Card.Meta>
                      <Card.Description>
                        Author: {LS.getItem("username") || "NoNemeNPC"}
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
              })
            : null}
        </Scrollbars>
      </div>
    </main>
  );
};

export default MyMemesPage;
