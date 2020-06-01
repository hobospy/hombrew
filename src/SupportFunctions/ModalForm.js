import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import RecipeEdit from '../Components/Edit/RecipeEdit';
import axios from 'axios';
import FocusLock from 'react-focus-lock';

export const Modal = ({
  onClickOutside,
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  onSubmit,
  onChange,
  onDeleteIngredient,
  recipe,
  baseUrl,
  title,
}) => {
  const [waterProfileList, setWaterProfileList] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [ingredientTypes, dispatchIngredientTypes] = useReducer(
    (ingredientTypes, { type, value }) => {
      switch (type) {
        case 'add':
          return [...ingredientTypes, value];
        case 'remove':
          return ingredientTypes.filter((_, index) => index !== value);
        default:
          return ingredientTypes;
      }
    },
    ['Grains', 'Hops', 'Adjuncts']
  );
  const [unitTypes, dispatchUnitTypes] = useReducer(
    (unitTypes, { type, value }) => {
      switch (type) {
        case 'add':
          return [...unitTypes, value];
        case 'remove':
          return unitTypes.filter((_, index) => index !== value);
        default:
          return unitTypes;
      }
    },
    ['kg', 'g', 'l', 'ml']
  );

  useEffect(() => {
    if (hasLoaded !== true) {
      console.log(baseUrl);
      axios
        .get(baseUrl + 'waterprofile/summary')
        .then((response) => response.data)
        .then((data) => {
          setHasLoaded(true);
          setWaterProfileList(data);
          console.log(data);
        });
    }
  });

  return ReactDOM.createPortal(
    <div>
      <FocusLock>
        <aside tag="aside" role="dialog" tabIndex="-1" aria-modal="true" className="modal-cover" onClick={onClickOutside} onKeyDown={onKeyDown}>
          <div className="modal-area" ref={modalRef}>
            <div className="_modal-titlebar-container">
              <h2 className="_modal-title">{title}</h2>
              <button ref={buttonRef} aria-label="Close Modal" aria-labelledby="close-modal" className="_modal-close" onClick={closeModal}>
                <span id="close-modal" className="_hide-visual">
                  Close
                </span>
                <svg className="_modal-close-icon" viewBox="0 0 40 40">
                  <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {waterProfileList !== null ? (
                <RecipeEdit
                  onSubmit={onSubmit}
                  onChange={onChange}
                  onDeleteIngredient={onDeleteIngredient}
                  recipe={recipe}
                  waterProfiles={waterProfileList}
                  ingredientTypes={ingredientTypes}
                  unitTypes={unitTypes}
                  baseUrl={baseUrl}
                />
              ) : (
                <div>Still loading</div>
              )}
            </div>
          </div>
        </aside>
      </FocusLock>
    </div>,
    document.body
  );
};
export default Modal;
