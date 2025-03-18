import React from "react";
import SettingHeader from "./component/SettingHeader";
import General from "./portions/General";
import { useLocation } from "react-router-dom";

const Setting = () => {
  const url = useLocation().pathname;
  return (
    <>
      <SettingHeader url={url} />
      <General/>
    </>
  );
};

export default Setting;
