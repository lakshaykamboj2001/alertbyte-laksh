import React, { useState,useEffect,useRef,useContext } from "react";
import {FaChevronDown} from 'react-icons/fa';

const filter = () => {
  const [showFilterExpand, setShowFilterExpand] = useState(false);
  
  const filterRef = useRef(null);
  const handleFilterButtonClick = () => {
    setShowFilterExpand(!showFilterExpand);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilterExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <>
      
      <div className="filter-main-div">
          <div className="filter-sub-div inout-sec" ref={filterRef}>
            <span className="head dropdowntoggle" onClick={handleFilterButtonClick}>Filter {!showFilterExpand && <FaChevronDown/>}</span>
            {showFilterExpand && (
              <div className="filter-expand">
                <p className="clr-all">
                  <span>Filter</span>
                </p>

                <div className="radios">
                  <span>Type</span>
                  <div>
                    <input type="radio" id="personal" name="monitor-type" value="personal" />
                    <label htmlFor="personal">Personal Monitor</label>
                  </div>
                  <div>
                    <input type="radio" id="community" name="monitor-type" value="community" />
                    <label htmlFor="community">Community Monitor</label>
                  </div>
                  <div>
                    <input type="radio" id="price" name="monitor-type" value="price" />
                    <label htmlFor="price">Price Alert</label>
                  </div>
                </div>

                <div className="radios">
                  <span>Direction</span>
                  <div>
                    <input type="radio" id="in" name="in-out" value="in" />
                    <label htmlFor="in">IN</label>
                  </div>
                  <div>
                    <input type="radio" id="out" name="in-out" value="out" />
                    <label htmlFor="out">OUT</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> {/* filter-main-div end */}
    </>
  )
}

export default filter
