// import { toggleScroll } from "@/utils/helper";

//scss
// .no-scroll {
//     overflow: hidden;
//     padding-right: 8px;
//   }

import React, { memo, useEffect } from 'react';

const toggleScroll = () => {
  document.body.classList.toggle('no-scroll');
};

const BoxModal = ({ children, ...props }) => {
  useEffect(() => {
    toggleScroll();
    return () => toggleScroll();
  }, []);

  return <div {...props}>{children}</div>;
};

export default memo(BoxModal);
