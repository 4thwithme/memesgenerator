import React, { useContext, useState } from "react";
import { Header, Segment, Button, Input, Divider } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/react-hooks";
import QUERIES from "../../queries/queries";

import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import { IPropsUploadZone } from "../../client.types";
import { createImage } from "../../client.utils";

const UploadZone = ({ setMem, handleUpload }: IPropsUploadZone) => {
  const [tempUrl, setTempUrl] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  const drawInitImg = async (url: string) => {
    const image: HTMLImageElement = await createImage(url);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    if (ctx) {
      ctx.drawImage(image, 0, 0, image.width, image.height);
    }

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        resolve({ file: canvas.toDataURL("image/jpeg"), url: URL.createObjectURL(file) });
      }, "image/jpeg");
    });
  };

  const [handleUploadFromUrl, { loading }] = useMutation(
    QUERIES.UPLOAD_FROM_EXTERNAL_URL_TO_AMAZON,
    {
      update: async (apolloResponceMagic, res) => {
        console.log("resss", res);

        const { url, file }: any = await drawInitImg(res.data.uploadFromUrlToAmazon.url);

        setMem((prev) => ({
          file: file,
          url: url,
          externalUrl: null,
          name: "",
          memSrc: "none",
          createdAt: String(Date.now()),
          author: user ? user.id : null,
          tags: { "1": "", "2": "", "3": "", "4": "", "5": "" }
        }));
      },
      onError: console.error,
      variables: {
        externalUrl: tempUrl
      }
    }
  );

  console.log("loading", loading);

  return (
    <>
      <div className='link-input-wrapper'>
        <Input
          type='text'
          fluid
          placeholder='link img...'
          action
          onChange={(e) => setTempUrl(e.target.value)}
        >
          <input />
          <Button color='teal' onClick={() => handleUploadFromUrl()}>
            Upload
          </Button>
        </Input>

        <Divider inverted horizontal>
          OR
        </Divider>
      </div>

      <Dropzone onDrop={handleUpload}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className='dropzone-wrapper'>
            <input {...getInputProps()} accept='image/*' />
            <Segment circular style={{ width: 540, height: 540 }}>
              <FontAwesomeIcon icon={faImages} color='#000' size='4x' />
              <Header as='h2'>
                Drag 'n' drop
                <Header.Subheader>some files here</Header.Subheader>
                <Header.Subheader>or click to select file</Header.Subheader>
              </Header>
            </Segment>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default UploadZone;
