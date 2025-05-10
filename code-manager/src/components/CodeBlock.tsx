import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

// Helper function to safely escape HTML
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Clear existing content and remove highlighted flag
      codeRef.current.innerHTML = '';
      codeRef.current.removeAttribute('data-highlighted');
      
      // Create new code element with proper escaping
      const codeElement = document.createElement('code');
      codeElement.className = `language-${language}`;
      
      // Escape HTML entities using our helper function
      const escapedCode = escapeHtml(code);
      
      // Create a new text node for safe content
      const textNode = document.createTextNode(escapedCode);
      codeElement.appendChild(textNode);
      
      // Append to pre element
      codeRef.current.appendChild(codeElement);
      
      // Highlight the code
      hljs.highlightElement(codeRef.current);
      
      // Set highlighted flag after successful highlighting
      codeRef.current.setAttribute('data-highlighted', 'true');
    }
  }, [code, language]);

  return (
    <pre
      ref={codeRef}
      className={`hljs ${className || ''}`}
      data-safe="true"
    />
  );
}
