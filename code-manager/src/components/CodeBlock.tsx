import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // Clear existing content and remove highlighted flag
      codeRef.current.innerHTML = '';
      codeRef.current.removeAttribute('data-highlighted');
      
      // Create new code element
      const codeElement = document.createElement('code');
      codeElement.className = `language-${language}`;
      
      // Set the code content directly
      codeElement.textContent = code;
      
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
