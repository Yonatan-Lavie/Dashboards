import React, { useEffect } from "react";
import { connect } from "react-redux";
import ChartListItem from "./ChartListItem";
import { getCharts } from "../redux/selectors";
import {
  loadCharts,
  removeChartRequest,
  addChartRequest,
} from "../redux/thunks";
import styled from "styled-components";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const ChartList = ({
  charts = [],
  onRemovePressed,
  onCreatePressed,
  isLoading,
  staretLoadingCharts,
}) => {
  useEffect(() => {
    staretLoadingCharts();
  }, []);

  const LoadingMessage = <div>Loading todos...</div>;
  const content = (
    <>
      <ListWrapper>
        <h3>Charts:</h3>
        {charts.map((chart, key) => (
          <ChartListItem
            key={key}
            chart={chart}
            onRemovePressed={onRemovePressed}
          />
        ))}
      </ListWrapper>
      <button onClick={() => onCreatePressed("new Chart")}>+</button>
    </>
  );
  return isLoading ? LoadingMessage : content;
};
const mapStateToProps = (state) => ({
  charts: getCharts(state),
});

const mapDispatchToProps = (dispatch) => ({
  staretLoadingCharts: () => dispatch(loadCharts()),
  onRemovePressed: (id) => dispatch(removeChartRequest(id)),
  onCreatePressed: (name) => dispatch(addChartRequest(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartList);
