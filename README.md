# @virelia/qr-code

A React QR code component and utilities library extracted from Virelia.

## Installation

```bash
bun add @virelia/qr-code
# or
pnpm install @virelia/qr-code
```

## Usage

### Basic QR Code Component

```tsx
import { QRCodeComponent } from '@virelia/qr-code';

function MyComponent() {
  const { canvas, isLoading, downloadQR, shareQR } = QRCodeComponent({
    value: 'https://example.com',
    size: 200,
    onGenerated: () => console.log('QR code generated'),
    onError: (error) => console.error('QR code error:', error),
  });

  return (
    <div>
      {canvas}
      <button onClick={downloadQR} disabled={isLoading}>
        Download
      </button>
      <button onClick={shareQR} disabled={isLoading}>
        Share
      </button>
    </div>
  );
}
```

### Generate QR Code Data URL

```tsx
import { generateQRCodeDataURL } from '@virelia/qr-code';

const dataURL = await generateQRCodeDataURL('https://example.com', {
  width: 300,
  margin: 4,
  color: {
    dark: '#000000',
    light: '#FFFFFF',
  },
});
```

### Generate QR Code Buffer

```tsx
import { generateQRCodeBuffer } from '@virelia/qr-code';

const buffer = await generateQRCodeBuffer('https://example.com', {
  width: 200,
  margin: 2,
});
```

### QRCodeComponent

Returns an object with:
- `canvas`: React element containing the QR code canvas
- `isLoading`: Boolean indicating if QR code is being generated
- `downloadQR`: Function to download the QR code as PNG
- `shareQR`: Function to share the QR code (uses Web Share API or clipboard)

#### Props

- `value` (string): The value to encode in the QR code
- `size` (number, optional): Size of the QR code in pixels (default: 200)
- `className` (string, optional): CSS class for the canvas element
- `onGenerated` (function, optional): Callback when QR code is generated
- `onError` (function, optional): Callback when an error occurs

## Development

To install dependencies:

```bash
bun install
```

To build:

```bash
bun run build
```

## License

MIT
