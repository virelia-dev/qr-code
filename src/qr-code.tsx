"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  onGenerated?: () => void;
  onError?: (error: Error) => void;
}

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export function QRCodeComponent({
  value,
  size = 200,
  className = "",
  onGenerated,
  onError,
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      setIsLoading(true);
      try {
        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        onGenerated?.();
      } catch (error) {
        console.error("Error generating QR code:", error);
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [value, size, onGenerated, onError]);

  const downloadQR = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareQR = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob: Blob | null) => {
        if (!blob) return;

        if (navigator.share && typeof navigator.canShare === "function") {
          const file = new File([blob], "qr-code.png", { type: "image/png" });
          const canShareData = { files: [file] };

          if (navigator.canShare(canShareData)) {
            await navigator.share({
              files: [file],
              title: "QR Code",
              text: "Check out this QR code",
            });
            return;
          }
        }

        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
      });
    } catch (error) {
      console.error("Error sharing QR code:", error);
      onError?.(error as Error);
    }
  };

  return {
    canvasRef,
    isLoading,
    downloadQR,
    shareQR,
    canvas: (
      <canvas
        ref={canvasRef}
        className={`border rounded-lg ${isLoading ? "opacity-50" : ""} ${className}`}
        style={{ width: size, height: size }}
      />
    ),
  };
}

export async function generateQRCodeDataURL(
  value: string,
  options: QRCodeOptions = {},
): Promise<string> {
  return QRCode.toDataURL(value, {
    width: options.width || 200,
    margin: options.margin || 2,
    color: {
      dark: options.color?.dark || "#000000",
      light: options.color?.light || "#FFFFFF",
    },
  });
}

export async function generateQRCodeBuffer(
  value: string,
  options: QRCodeOptions = {},
): Promise<Buffer> {
  return QRCode.toBuffer(value, {
    width: options.width || 200,
    margin: options.margin || 2,
    color: {
      dark: options.color?.dark || "#000000",
      light: options.color?.light || "#FFFFFF",
    },
  });
}
