/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from 'react';

import { Options } from 'react-lottie';
const Lottie = React.lazy(() => import('react-lottie').then((lib) => ({ default: lib.default })));

type Props = {
  src: any;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const Animation: React.FC<Props> = ({ src, width, height, className }) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: src,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={className}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default Animation;
