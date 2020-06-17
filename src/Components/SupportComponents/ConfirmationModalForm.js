import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import FocusLock from 'react-focus-lock';

export const Modal = ({ onKeyDown, modalRef, buttonRef, closeModal, onOK, confirmationMessage, title, showCancel }) => {
  return ReactDOM.createPortal(
    <div>
      <FocusLock>
        <aside tag="aside" role="dialog" tabIndex="-1" aria-modal="true" className="modal-cover" onKeyDown={onKeyDown}>
          <div className="modal-area" ref={modalRef}>
            <div className="_modal-titlebar-container-small">
              <h3 className="_modal-title">{title}</h3>
              <button ref={buttonRef} aria-label="Close Modal" aria-labelledby="close-modal" className="_modal-close-small" onClick={closeModal}>
                <span id="close-modal" className="_hide-visual">
                  Close
                </span>
                <svg className="_modal-close-icon-small" viewBox="0 0 25 25">
                  <path d="M 0,0 L 21,21 M 21,0 L 0,21" />
                </svg>
              </button>
            </div>
            <div className="modal-body">{confirmationMessage}</div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '5px' }}>
              <Button variant="outlined" onClick={onOK} style={{ width: '100px', marginRight: '5px' }}>
                OK
              </Button>
              {showCancel !== undefined && showCancel === 'true' ? (
                <Button variant="outlined" onClick={closeModal} style={{ width: '100px', marginLeft: '5px' }}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </div>
        </aside>
      </FocusLock>
    </div>,
    document.body
  );
};
export default Modal;
