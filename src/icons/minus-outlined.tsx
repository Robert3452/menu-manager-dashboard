import { SvgIcon, SvgIconProps, createSvgIcon } from '@mui/material';

export const MinusOutlined = (props: SvgIconProps) => {
  return (<SvgIcon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
    </svg>
  </SvgIcon>)
}
