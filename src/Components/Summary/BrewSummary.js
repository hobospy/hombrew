import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BrewSummaryItem from './BrewSummaryItem';
import BrewSummaryItemMobile from './BrewSummaryItemMobile';
import LoadingIndicator from '../SupportComponents/LoadingIndicator';

function BrewSummary(props) {
  const [brews, setBrewValues] = useState([]);
  const largeScreenSize = useMediaQuery('(min-width:600px)');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const url = `${props.baseUrl}brew/summary`;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setBrewValues(data);
        setHasLoaded(true);
      });
  }, [props.baseUrl]);

  return (
    <div>
      {hasLoaded ? (
        <div>
          {largeScreenSize ? (
            <div className="grid-brew-summary-link-indicator">
              {brews.map((b) => (
                <NavLink to={`/brew/${b.id}`}>
                  <BrewSummaryItem key={b.id} brew={b} />
                </NavLink>
              ))}
            </div>
          ) : (
            <div className="grid-brew-summary-link-indicator">
              {brews.map((b) => (
                <NavLink to={`/brew/${b.id}`}>
                  <BrewSummaryItemMobile key={b.id} brew={b} />
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

export default BrewSummary;
