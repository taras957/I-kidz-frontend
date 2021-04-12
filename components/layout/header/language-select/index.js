import React, { useState } from "react";
import Select, { components } from "react-select";
import { useTranslation } from "react-i18next";

import { UkraineIcon, EnglandIcon, RussianIcon } from "images/custom-icons";
import css from "./style.module.css";
const options = [
  { value: "ua", label: "Українська", icon: UkraineIcon },
  { value: "rus", label: "Русский", icon: RussianIcon },
  { value: "eng", label: "English", icon: EnglandIcon },
];

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    background: "transparent",
    alignItems: "center",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",

    flexWrap: " wrap",
    justifyContent: "space-between",
    minHeight: "38px",
    outline: "0!important",
    position: "relative",
    transition: "all 100ms",
    boxSizing: "border-box",
    color: "red",
    fontFamily: "LatoM",
    fontSize: "1.2rem",
    textTransform: "uppercase",
    minWidth: "60px",
    zIndex: "1000",
  }),
};
const formatOptionLabel = ({ icon, label = "test" }, { context }) => {
  const SelectedIcon = icon;
  if (context === "value") {
    return (
      <div className={css["selectedItem"]}>
        <SelectedIcon />
        {/* <p className={css["selectedLabel"]}>{label}</p> */}
      </div>
    );
  } else if (context === "menu") {
    return (
      <>
        {/* {label} */}
        <SelectedIcon />
      </>
    );
  }
};
const { Option } = components;
const IconOption = (props) => {
  const Icon = props.data.icon;
  return (
    <Option {...props}>
      <div className={css["option-inner"]}>
        <Icon />
        {/* <p className={css["language-label"]}>{props.data.label}</p> */}
      </div>
    </Option>
  );
};
const LanguageSelect = () => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState(options[0]);
  const onLanguageChange = (data) => {
    setState(data);
    i18n.changeLanguage(data.value);
  };
  return (
    <div>
      <Select
        value={state}
        formatOptionLabel={formatOptionLabel}
        isSearchable={false}
        styles={customStyles}
        className={css["language-select"]}
        onChange={onLanguageChange}
        options={options}
        components={{ Option: IconOption, IndicatorSeparator: () => null }}
      />
    </div>
  );
};

export default LanguageSelect;
