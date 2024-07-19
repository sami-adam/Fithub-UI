// QRCodeComponent.js
import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ data, setQrCodeUrl }) => {
  useEffect(() => {
    const canvas = document.getElementById('qrCode');
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setQrCodeUrl(dataUrl);
    }
  }, [data, setQrCodeUrl]);

  return (
    <QRCode
      id="qrCode"
      value={data}
      size={128}
      includeMargin={true}
      style={{ display: 'none' }}  // Hide the QR code element
    />
  );
};

export default QRCodeComponent;
