import React, { useState, useContext, useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import QUERIES from "../../queries/queries";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import { usePrevious } from "../../hooks";

import NewMemCard from "../../components/NewMemCard/NewMemCard";
import UploadZone from "../../components/UploadZone/UploadZone";

import { IMemUpload } from "../../client.types";
import { MODAL_NAME } from "../../client.utils/constants";

const MemesUploader = () => {
  const { addModal } = useContext(ModalContext);
  const { user } = useContext(AuthContext);
  const prevUser = usePrevious(user);

  const [mem, setMem] = useState<IMemUpload>({
    file: null,
    url: null,
    externalUrl: null,
    name: "",
    memSrc: "none",
    createdAt: String(Date.now()),
    author: user ? user.id : null,
    tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
  });

  useEffect(() => {
    if (user && prevUser === null) {
      setMem((prev) => ({
        ...prev,
        author: user.id
      }));
    }
  }, [user]);

  const [addNewMem, { loading }] = useMutation(QUERIES.ADD_NEW_MEM, {
    update: (apolloResponceMagic, res) => {
      addModal(MODAL_NAME.NEW_MEM_RESPONCE_MODAL, { url: res.data.addNewMem.file });

      setMem((prev) => ({
        file: null,
        url: null,
        externalUrl: null,
        name: "",
        memSrc: "none",
        createdAt: String(Date.now()),
        author: user ? user.id : null,
        tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
      }));
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

      {mem.url || (mem.externalUrl && mem.file) ? (
        <NewMemCard
          setMem={setMem}
          mem={mem}
          handleOnNameChange={handleOnNameChange}
          handleOnTagChange={handleOnTagChange}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
        />
      ) : (
        <UploadZone handleUpload={handleUpload} setMem={setMem} />
      )}
    </>
  );
};

export default MemesUploader;
