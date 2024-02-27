import React, { useEffect, useRef, useState } from 'react';
import { sleep } from '@/utils/sleep';
import { Spin } from 'antd';

import { useModalContext } from '@/contexts/modalContext';

import BoxModal from '@/components/BoxModal';
import { useDispatch } from 'react-redux';

const LoadingModal = () => {
  return <Spin spinning={true} fullscreen />;
};

export default LoadingModal;
