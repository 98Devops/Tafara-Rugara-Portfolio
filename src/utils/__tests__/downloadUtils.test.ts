import {
  checkDocumentExists,
  downloadDocument,
  showDownloadError,
} from '../downloadUtils';

// Mock fetch for testing
global.fetch = jest.fn();

// Mock DOM methods
Object.defineProperty(document, 'createElement', {
  value: jest.fn(() => ({
    href: '',
    download: '',
    style: { display: '' },
    click: jest.fn(),
  })),
});

Object.defineProperty(document.body, 'appendChild', {
  value: jest.fn(),
});

Object.defineProperty(document.body, 'removeChild', {
  value: jest.fn(),
});

// Mock alert
global.alert = jest.fn();

describe('downloadUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkDocumentExists', () => {
    it('returns true when document exists', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await checkDocumentExists('/documents/test.pdf');

      expect(result).toBe(true);
      expect(fetch).toHaveBeenCalledWith('/documents/test.pdf', {
        method: 'HEAD',
      });
    });

    it('returns false when document does not exist', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const result = await checkDocumentExists('/documents/missing.pdf');

      expect(result).toBe(false);
    });

    it('returns false when fetch throws an error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await checkDocumentExists('/documents/test.pdf');

      expect(result).toBe(false);
    });
  });

  describe('downloadDocument', () => {
    it('successfully downloads when document exists', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const mockLink = {
        href: '',
        download: '',
        style: { display: '' },
        click: jest.fn(),
      };
      (document.createElement as jest.Mock).mockReturnValueOnce(mockLink);

      const result = await downloadDocument('/documents/test.pdf', 'test.pdf');

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockLink.href).toBe('/documents/test.pdf');
      expect(mockLink.download).toBe('test.pdf');
      expect(mockLink.click).toHaveBeenCalled();
    });

    it('returns error when document does not exist', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const result = await downloadDocument(
        '/documents/missing.pdf',
        'missing.pdf'
      );

      expect(result.success).toBe(false);
      expect(result.error).toBe(
        'Document not found. Please contact the site administrator.'
      );
    });

    it('handles download errors gracefully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      (document.createElement as jest.Mock).mockImplementationOnce(() => {
        throw new Error('DOM error');
      });

      const result = await downloadDocument('/documents/test.pdf', 'test.pdf');

      expect(result.success).toBe(false);
      expect(result.error).toBe(
        'Failed to download document. Please try again or contact support.'
      );
    });
  });

  describe('showDownloadError', () => {
    it('displays error message using alert', () => {
      showDownloadError('Test error message');

      expect(global.alert).toHaveBeenCalledWith(
        'Download Error: Test error message'
      );
    });
  });
});
