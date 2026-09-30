export async function downloadCatalogueFile(url: string, fileName: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    const head = new Uint8Array(buffer.slice(0, 5));
    const signature = String.fromCharCode(...head);
    const looksLikePdf = signature.startsWith('%PDF');
    const looksLikeHtml = signature.toLowerCase().includes('<!') || signature.toLowerCase().includes('<ht');
    const isPptx = fileName.toLowerCase().endsWith('.pptx');

    if (looksLikeHtml || (!looksLikePdf && !isPptx)) {
      window.alert(
        'This catalogue file is not available right now. Please try again later or contact us on WhatsApp.',
      );
      return;
    }

    const blob = new Blob([buffer], {
      type: isPptx
        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        : 'application/pdf',
    });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  } catch {
    window.alert(
      'Unable to download this catalogue. Please try again or contact us on WhatsApp.',
    );
  }
}
