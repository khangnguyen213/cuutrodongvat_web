import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import PermissionDenied from '../components/PermissionDenied/PermissionDenied';

const LazyLoad = (importFunc, access = true, url) => {
  // const LazyComponent = lazy(() => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(importFunc());
  //     }, 1000);
  //   });
  // });

  if (!access) {
    return <PermissionDenied url={url}></PermissionDenied>;
  }
  const LazyComponent = lazy(() => importFunc());

  return (
    <Suspense fallback={<Spin spinning={true} fullscreen />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyLoad;
