import React, { useState, useContext, useCallback } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import QUERIES from "../../queries/queries";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import NewMemCard from "../../components/NewMemCard/NewMemCard";
import UploadZone from "../../components/UploadZone/UploadZone";

import { IMemUpload } from "../../client.types";
import { usePrevious } from "../../hooks";

const MemesUploader = () => {
  const { user } = useContext(AuthContext);

  const [mem, setMem] = useState<IMemUpload>({
    file: null,
    url: null,
    internalUrl: null,
    name: "",
    memSrc: "none",
    createdAt: String(Date.now()),
    authorId: user ? user.id : "none",
    tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
  });

  const prevFile = usePrevious(mem.file);
  const prevURL = usePrevious(mem.url);

  const setPrevFile = useCallback(() => {
    if (prevFile && prevURL) {
      setMem((prev) => ({
        ...prev,
        file: prevFile,
        url: prevURL
      }));
    }
  }, [mem.file]);

  const [addNewMem, { loading }] = useMutation(QUERIES.ADD_NEW_MEM, {
    update: () => {
      setMem({
        file: null,
        url: null,
        internalUrl: null,
        name: "",
        memSrc: "none",
        createdAt: String(Date.now()),
        authorId: user ? user.id : "none",
        tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
      });
    },
    onError: (err) => console.error(err),
    variables: {
      ...mem,
      tags: Object.values(mem.tags)
    }
  });

  const handleUpload = ([file]: File[]) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (file.type.startsWith("image")) {
        setMem({
          ...mem,
          file: reader.result,
          url: URL.createObjectURL(file)
        });
      }
    };

    file && reader.readAsDataURL(file);
  };

  const handleUploadFromURL = (url: string) =>
    setMem((prev) => ({
      ...prev,
      internalUrl: url
    }));

  const handleOnNameChange = (e: any): void =>
    setMem({
      ...mem,
      name: e.target.value
    });

  const handleOnTagChange = (e: any, num: string): void =>
    setMem({
      ...mem,
      tags: {
        ...mem.tags,
        [num]: e.target.value
      }
    });

  const handleSubmit = () => addNewMem();

  const isDisabled = () =>
    mem.name.length &&
    mem.authorId &&
    mem.file &&
    mem.createdAt &&
    mem.tags["1"].length &&
    mem.tags["2"].length &&
    mem.tags["3"].length &&
    mem.tags["4"].length &&
    mem.tags["5"].length
      ? false
      : true;

  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}

      {mem.file ? (
        <NewMemCard
          setMem={setMem}
          mem={mem}
          prevFile={prevFile}
          setPrevFile={setPrevFile}
          handleOnNameChange={handleOnNameChange}
          handleOnTagChange={handleOnTagChange}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
        />
      ) : (
        <UploadZone
          handleUpload={handleUpload}
          setMem={setMem}
          handleUploadFromURL={handleUploadFromURL}
        />
      )}
    </>
  );
};

export default MemesUploader;
