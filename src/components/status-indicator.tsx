import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const sizes = {
  small: 8,
  medium: 16,
  large: 23,
};

const colors = {
  offline: "#fafafa",
  away: "#fb8c00",
  busy: "#e53935",
  online: "#43a047",
};
interface RootProps {
  size: "small" | "medium" | "large";
  status: "online" | "offline" | "away" | "busy";
}
interface OwnerState {
  ownerState: RootProps;
}
const StatusIndicatorRoot = styled("span")<OwnerState>(({ ownerState }) => {
  const size = sizes[ownerState.size];
  const color = colors[ownerState.status];

  return {
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
    flexGrow: 0,
    flexShrink: 0,
    height: size,
    width: size,
  };
});

export const StatusIndicator: React.FC<RootProps> = (props) => {
  const { size, status, ...other } = props;

  const ownerState = { size, status };

  return <StatusIndicatorRoot ownerState={ownerState} {...other} />;
};

// StatusIndicator.propTypes = {
//   size: PropTypes.oneOf(["small", "medium", "large"]),
//   status: PropTypes.oneOf(["online", "offline", "away", "busy"]),
// };

StatusIndicator.defaultProps = {
  size: "medium",
  status: "offline",
};
