import React from "react";
import { Header, Segment, Button, Input, Divider } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import { IPropsUploadZone } from "../types";

const UploadZone = ({ setMem, handleUpload, handleUploadFromURL }: IPropsUploadZone) => {
  return (
    <>
      <div className='link-input-wrapper'>
        <Input
          type='text'
          fluid
          placeholder='link img...'
          action
          onChange={(e) => handleUploadFromURL(e.target.value)}
        >
          <input />
          <Button color='teal' onClick={() => setMem((prev: any) => ({ ...prev, file: true }))}>
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
            <input {...getInputProps()} />
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
