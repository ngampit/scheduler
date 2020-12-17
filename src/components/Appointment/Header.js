import React from "react";

import "components/Button.scss";

export default function Headers(props) {

return (
      <header className = "appointment__time">
         <h4 className = "text--semi-bold">{props.time}</h4>
         <hr className = "appointment__separator" />
      </header>
)


}