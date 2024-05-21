// import { createSvgIcon } from '@mui/material';

import { SvgIcon, SvgIconProps } from "@mui/material";
const CheckCircleOutlinedIcon = (props:SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </SvgIcon>
  )
}

// const CheckCircleOutlinedIcon =
//   createSvgIcon(
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>, 'CheckCircleOutlined')

// const CheckCircleOutlined: React.FC<SvgIconProps> = (props) => {
//   return <CheckCircleOutlinedIcon component={CheckCircleOutlinedIcon} {...props} />
// }
export default CheckCircleOutlinedIcon
