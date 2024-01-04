import { useState } from 'react';
import QRCode from 'qrcode.react';

const QRcodeComponent = ({text,size }) => {
  return (
    <div className='QR'>
        {text && <QRCode value={text}  size={size}/>}
    </div>
  );
};

export default QRcodeComponent;
