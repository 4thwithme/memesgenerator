import React, { useContext, useRef } from "react";
import { Image, Card, Button } from "semantic-ui-react";

import { ModalContext } from "../../context/ModalProvider/ModalProvider";
import { MODAL_NAME } from "../../client.utils/constants";

const NewMemPesponceModal = ({ url }: { url: string }) => {
  const { removeModal } = useContext(ModalContext);

  const linkRef: any = useRef();

  const downloadFile = () => {
    linkRef.current.click();
    removeModal(MODAL_NAME.NEW_MEM_RESPONCE_MODAL);
  };

  return (
    <div className='new-mem-responce-modal'>
      <Card fluid>
        <div className='img-crop__wrap'>
          {url && <Image onClick={downloadFile} src={url} alt='new mem' />}
        </div>

        <a href={url} target='_blank' className='hidden-link' ref={linkRef} />

        <div className='mem-creator__btns-wrap'>
          <Button fluid color='red' onClick={() => removeModal(MODAL_NAME.NEW_MEM_RESPONCE_MODAL)}>
            Close
          </Button>

          <Button fluid color='teal' onClick={downloadFile}>
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NewMemPesponceModal;
