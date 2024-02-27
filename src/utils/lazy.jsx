import { lazy, Suspense } from 'react';
import { Spin } from 'antd';

const LazyLoad = (importFunc) => {
  // const LazyComponent = lazy(() => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(importFunc());
  //     }, 1000);
  //   });
  // });
  const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={<Spin spinning={true} fullscreen />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyLoad;
