"use client";

import { QRCodeComponent, type QRCodeProps } from "./qr-code";

interface QRCodeUIProps extends QRCodeProps {
  showActions?: boolean;
  onDownload?: () => void;
  onShare?: () => void;
}

export function QRCodeWithActions({
  value,
  size = 200,
  className = "",
  showActions = true,
  onDownload,
  onShare,
  onGenerated,
  onError,
}: QRCodeUIProps) {
  const { canvas, isLoading, downloadQR, shareQR } = QRCodeComponent({
    value,
    size,
    className,
    onGenerated,
    onError,
  });

  const handleDownload = () => {
    downloadQR();
    onDownload?.();
  };

  const handleShare = () => {
    shareQR();
    onShare?.();
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        {canvas}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {showActions && !isLoading && (
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Download
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
}
