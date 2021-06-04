import React from "react";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
};

const ChartListItem = ({ chart, onRemovePressed }) => {
  return (
    <div>
      <h3>{chart.name}</h3>
      <ul>
        <li>{chart.id}</li>
        <li>
          {Intl.DateTimeFormat("en-US", options).format(
            new Date(chart.createdAt)
          )}
        </li>
      </ul>
      <button onClick={() => onRemovePressed(chart.id)}>Remove</button>
    </div>
  );
};

export default ChartListItem;
