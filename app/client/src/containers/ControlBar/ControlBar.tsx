import React from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";
import { Input, Button } from "semantic-ui-react";

import { LIMIT } from "../../client.utils/constants";

import { IControlBar } from "../../client.types";

const ControlBar = ({ getMemesByQuery, setSearch, search }: IControlBar) => {
  const searchMemes = () => {
    if (search.query.length) {
      setSearch((prev) => ({ ...prev, isActive: true }));

      getMemesByQuery({
        variables: {
          query: search.query,
          limit: LIMIT,
          offset: search.offset
        }
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("eee", e.target.value);
    e.persist();

    setSearch((prev) => {
      return e.target.value === ""
        ? { ...prev, query: e.target.value, isActive: false }
        : { ...prev, query: e.target.value };
    });
  };

  return (
    <div className='control-bar'>
      <div className='toggle-wrap'>
        <Toggle defaultChecked={true} onChange={() => console.log("change")} />
        Only YOUR
      </div>

      <div className='link-input-wrapper'>
        <Input
          type='text'
          fluid
          placeholder='link img...'
          value={search.query}
          action
          onChange={handleOnChange}
        >
          <input />
          <Button color='teal' onClick={searchMemes}>
            Search
          </Button>
        </Input>
      </div>
    </div>
  );
};

export default React.memo(ControlBar);
