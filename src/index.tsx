import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';
import AxisExample from './components/AxisExample';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<ParentSize>
  {({width,height})=><AxisExample  width={width} height={height}/>}
</ParentSize>
);


