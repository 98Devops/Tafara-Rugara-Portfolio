/**
 * Utility functions for handling document downloads
 */

export interface DownloadResult {
  success: boolean;
  error?: string;
}

/**
 * Checks if a document file exists and is accessible
 * @param filePath - The path to the document file
 * @returns Promise<boolean> - Whether the file exists and is accessible
 */
export async function checkDocumentExists(filePath: string): Promise<boolean> {
  try {
    const response = await fetch(filePath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error checking document existence: ${filePath}`, error);
    return false;
  }
}

/**
 * Handles document download with error handling
 * @param filePath - The path to the document file
 * @param fileName - The name for the downloaded file
 * @returns Promise<DownloadResult> - Result of the download attempt
 */
export async function downloadDocument(
  filePath: string,
  fileName: string
): Promise<DownloadResult> {
  try {
    // Check if file exists first
    const exists = await checkDocumentExists(filePath);
    if (!exists) {
      return {
        success: false,
        error: 'Document not found. Please contact the site administrator.',
      };
    }

    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';

    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true };
  } catch (error) {
    console.error(`Error downloading document: ${filePath}`, error);
    return {
      success: false,
      error:
        'Failed to download document. Please try again or contact support.',
    };
  }
}

/**
 * Shows a user-friendly error message
 * @param message - The error message to display
 */
export function showDownloadError(message: string): void {
  // In a real application, you might use a toast notification library
  // For now, we'll use a simple alert
  alert(`Download Error: ${message}`);
}
