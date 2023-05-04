import { useState } from "react";
import "../selectBox.css";

function SelectBox(props) {
  const { perPage, handlePerPageChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setIsOpen(false);
    handlePerPageChange(value);
  };

  return (
    <div class="select">
      <div className={`selectBox2 ${isOpen ? "active" : ""}`}>
        <button
          className="label"
          onClick={() => setIsOpen(!isOpen)}>
          {perPage}
        </button>
        <ul className="optionList">
          <li
            className="optionItem"
            onClick={() => handleSelect(6)}>
            6
          </li>
          <li
            className="optionItem"
            onClick={() => handleSelect(12)}>
            12
          </li>
          <li
            className="optionItem"
            onClick={() => handleSelect(18)}>
            18
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SelectBox;
