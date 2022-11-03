import React from 'react';

import { useBreakpoint } from '@utils/useBreakpoint';

type Props = {
  children: React.ReactNode;
  notDesktopComponent?: React.ReactNode;
};

const CheckScreen: React.FC<Props> = ({ children, notDesktopComponent }) => {
  const { isDesktop } = useBreakpoint();

  return <>{isDesktop ? children : notDesktopComponent}</>;
};

CheckScreen.defaultProps = {
  notDesktopComponent: null,
};

export default CheckScreen;
