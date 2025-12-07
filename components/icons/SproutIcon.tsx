
import React from 'react';

const SproutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c-4.805 0-8.716-3.91-8.716-8.716C3.284 7.58 7.195 3.67 12 3.67c4.805 0 8.716 3.91 8.716 8.716 0 4.806-3.91 8.716-8.716 8.716zM12 15.375a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3V2.25m6.364-.364l.707-.707M21 12h.75m-1.364 6.364l.707.707M12 21v.75m-6.364.364l-.707.707M3 12H2.25m1.364-6.364l-.707-.707" />
  </svg>
);

export default SproutIcon;
