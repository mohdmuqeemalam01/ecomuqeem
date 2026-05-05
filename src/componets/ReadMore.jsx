import React, { useState } from "react";

const ReadMore = ({ text, limit = 120 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <p style={{marginLeft:'15px', marginRight:'0px'}}>
      {isExpanded ? text : text.slice(0, limit) + ","}
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ color: "#BF1A1A", cursor: "pointer", marginLeft: "0px" }}
      >
        {isExpanded ? "" : "..."}
      </span>
    </p>
  );
};

export default ReadMore;
