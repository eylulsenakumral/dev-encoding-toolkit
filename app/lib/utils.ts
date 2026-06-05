// Encoding/Decoding utilities

export function base64Encode(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)));
  } catch (e) {
    return 'Error: Invalid input for Base64 encoding';
  }
}

export function base64Decode(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (e) {
    return 'Error: Invalid Base64 string';
  }
}

export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

export function urlDecode(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch (e) {
    return 'Error: Invalid URL encoded string';
  }
}

export function htmlEntityEncode(input: string): string {
  const entityMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;',
  };
  return input.replace(/[&<>"'`]/g, (char) => entityMap[char]);
}

export function htmlEntityDecode(input: string): string {
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`',
    '&apos;': "'",
  };
  return input.replace(/&(amp|lt|gt|quot|#39|#96|apos);/g, (match) => entityMap[match] || match);
}

export function textToHex(input: string): string {
  return input
    .split('')
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
}

export function hexToText(input: string): string {
  try {
    const hexString = input.replace(/\s+/g, '');
    if (!/^[0-9a-fA-F]*$/.test(hexString)) {
      return 'Error: Invalid hex characters';
    }
    let result = '';
    for (let i = 0; i < hexString.length; i += 2) {
      result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    }
    return result;
  } catch (e) {
    return 'Error: Invalid hex string';
  }
}

export function textToBinary(input: string): string {
  return input
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryToText(input: string): string {
  try {
    const binaryString = input.replace(/\s+/g, '');
    if (!/^[01]*$/.test(binaryString)) {
      return 'Error: Invalid binary characters';
    }
    if (binaryString.length % 8 !== 0) {
      return 'Error: Binary string must be multiple of 8';
    }
    let result = '';
    for (let i = 0; i < binaryString.length; i += 8) {
      result += String.fromCharCode(parseInt(binaryString.substr(i, 8), 2));
    }
    return result;
  } catch (e) {
    return 'Error: Invalid binary string';
  }
}

export function decodeJWT(token: string): {
  header: string | null;
  payload: string | null;
  signature: string;
  error?: string;
} {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return {
        header: null,
        payload: null,
        signature: '',
        error: 'Invalid JWT format. Must have 3 parts separated by dots.',
      };
    }

    const [headerB64, payloadB64, signature] = parts;

    let header: string | null = null;
    let payload: string | null = null;

    try {
      header = JSON.parse(atob(headerB64));
    } catch {
      header = 'Error decoding header';
    }

    try {
      payload = JSON.parse(atob(payloadB64));
    } catch {
      payload = 'Error decoding payload';
    }

    return {
      header: typeof header === 'object' ? JSON.stringify(header, null, 2) : header,
      payload: typeof payload === 'object' ? JSON.stringify(payload, null, 2) : payload,
      signature,
    };
  } catch (e) {
    return {
      header: null,
      payload: null,
      signature: '',
      error: 'Error parsing JWT',
    };
  }
}

export function formatJSON(obj: any): string {
  try {
    if (typeof obj === 'string') {
      return obj;
    }
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch {
        textArea.remove();
        return false;
      }
    }
  } catch {
    return false;
  }
}
