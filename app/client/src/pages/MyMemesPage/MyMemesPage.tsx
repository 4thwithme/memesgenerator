import React, { useState, useEffect, useContext } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import Scrollbars from "react-custom-scrollbars";

import QUERIES from "../../queries/queries";
import "../../styles/MyMemesPage.scss";
import { LIMIT } from "../../client.utils/constants";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import ControlBar from "../../containers/ControlBar/ControlBar";
import MemCard from "../../components/MemCard/MemCard";

import { IMem, IMemSearchState } from "../../client.types";

const MyMemesPage = () => {
  const { user } = useContext(AuthContext);

  // const [memesAutor, setMemesAuthor] = useState(user ? user.id : "all");
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState<IMemSearchState>({
    query: "",
    list: [],
    offset: 0,
    isActive: false
  });

  const [
    getMemesByQuery,
    { loading: searchLoading, data: searchData, fetchMore: searchFetchMore }
  ] = useLazyQuery(QUERIES.SEARCH_MEMES, {
    variables: { query: search.query, limit: LIMIT, offset: 0 }
  });

  const { loading, data, fetchMore } = useQuery(QUERIES.FETCH_MEMES_BY_AUTHOR_ID, {
    variables: { author: user ? user.id : "all", limit: LIMIT, offset: 0 }
  });

  useEffect(() => {
    data && setMemes(data.getMemes);
  }, [data]);

  useEffect(() => {
    searchData && setSearch((prev) => ({ ...prev, list: searchData.searchMemes }));
  }, [searchData]);

  const handleScroll = (e: any, type: "search" | "memes") => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (clientHeight + scrollTop === scrollHeight) {
      console.log("upload new memes");

      if (type === "search") {
        searchFetchMore({
          variables: {
            query: search.query,
            limit: LIMIT,
            offset: search.offset
          },
          updateQuery: (prevData, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevData;
            return Object.assign({}, prevData, {
              getMemes: [...prevData.searchMemes, ...fetchMoreResult.searchMemes]
            });
          }
        });
      } else {
        fetchMore({
          variables: { author: user ? user.id : "all", limit: LIMIT, offset: memes.length },
          updateQuery: (prevData, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevData;
            return Object.assign({}, prevData, {
              getMemes: [...prevData.getMemes, ...fetchMoreResult.getMemes]
            });
          }
        });
      }
    }
  };

  return (
    <main className='mem-page-wrap'>
      {(loading || searchLoading) && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}

      <div className='memes-list'>
        <ControlBar setSearch={setSearch} getMemesByQuery={getMemesByQuery} search={search} />

        {search.isActive ? (
          <Scrollbars autoHide onScroll={(e) => handleScroll(e, "search")}>
            {!!search.list.length &&
              search.list.map((mem: IMem) => {
                return <MemCard mem={mem} key={mem.id} />;
              })}
          </Scrollbars>
        ) : (
          <Scrollbars autoHide onScroll={(e) => handleScroll(e, "memes")}>
            {!!memes.length &&
              memes.map((mem: IMem) => {
                return <MemCard mem={mem} key={mem.id} />;
              })}
          </Scrollbars>
        )}
      </div>
    </main>
  );
};

export default MyMemesPage;
