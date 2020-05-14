import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import RecipeEdit from '../Components/RecipeEdit';
import FocusTrap from 'focus-trap-react';
import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FocusLock from 'react-focus-lock';

export const Modal = ({ onClickOutside, onKeyDown, modalRef, buttonRef, closeModal, onSubmit, recipe, baseUrl }) => {
  const [waterProfileList, setWaterProfileList] = React.useState(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  useEffect(() => {
    if (hasLoaded !== true) {
      console.log(baseUrl);
      axios
        .get(baseUrl + 'waterprofile/summary')
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setHasLoaded(true);
          setWaterProfileList(data);
        });
    }
  });

  return ReactDOM.createPortal(
    // <div>
    //   {hasLoaded ? (
    <div>
      {/* <FocusTrap> */}
      <FocusLock>
        <aside tag="aside" role="dialog" tabIndex="-1" aria-modal="true" className="modal-cover" onClick={onClickOutside} onKeyDown={onKeyDown}>
          <div className="modal-area" ref={modalRef}>
            <button ref={buttonRef} aria-label="Close Modal" aria-labelledby="close-modal" className="_modal-close" onClick={closeModal}>
              <span id="close-modal" className="_hide-visual">
                Close
              </span>
              <svg className="_modal-close-icon" viewBox="0 0 40 40">
                <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </button>
            <div className="modal-body">
              {hasLoaded ? <RecipeEdit onSubmit={onSubmit} recipe={recipe} waterProfiles={waterProfileList} /> : <div>Still loading</div>}
            </div>
          </div>
        </aside>
        {/* </FocusTrap> */}
      </FocusLock>
    </div>,
    //   ) : (
    //     <div>Still loading</div>
    //   )}
    // </div>,
    document.body
  );
};
export default Modal;
