const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'qr-codes');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const qrCodes = [
  {
    name: 'whatsapp',
    url: 'https://wa.me/263777553271',
    filename: 'whatsapp-qr.svg',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/tafara-rugara-0627b819b/',
    filename: 'linkedin-qr.svg',
  },
];

async function generateQRCodes() {
  for (const qr of qrCodes) {
    try {
      const svgString = await QRCode.toString(qr.url, {
        type: 'svg',
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      const outputPath = path.join(outputDir, qr.filename);
      fs.writeFileSync(outputPath, svgString);
      console.log(`✓ Generated ${qr.name} QR code: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${qr.name} QR code:`, error);
    }
  }
}

generateQRCodes()
  .then(() => {
    console.log('\n✓ All QR codes generated successfully!');
  })
  .catch(error => {
    console.error('\n✗ QR code generation failed:', error);
    process.exit(1);
  });
