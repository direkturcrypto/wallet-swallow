import React from "react"

import MKBox from "components/MKBox";

function View({children, height, bgColor, maxHeight, ...rest}) {
  return (
		<MKBox
			bgColor={bgColor}
			width="100%"
			height={height}
			maxHeight={maxHeight}
			borderRadius="xl"
			{...rest}
			sx={{ overflowX: "scroll", overflowY: "scroll" }}>
			{children}
		</MKBox>
	)
}

View.defaultProps = {
	bgColor:'grey-100',
	height: "auto",
	maxHeight:"50rem"
};

export default View