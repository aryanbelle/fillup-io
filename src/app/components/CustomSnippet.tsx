import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCheck, FiCopy } from "react-icons/fi";

const CustomSnippet = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative bg-gray-800 p-3 rounded-lg shadow-md flex items-center">
      <pre className="whitespace-pre-wrap break-all font-mono text-sm text-white overflow-hidden pr-12">
        {url}
      </pre>
      <CopyToClipboard text={url} onCopy={handleCopy}>
        <button
          className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-white text-lg rounded transition duration-300 ease-in-out ${
            copied ? "bg-green-500" : "bg-blue-500"
          } p-2`}
          title="Copy URL"
        >
          {copied ? <FiCheck /> : <FiCopy />}
        </button>
      </CopyToClipboard>
      {copied && (
        <div className="absolute bottom-0 right-0 mb-2 mr-2 text-xs text-green-500 animate-bounce">
          Copied!
        </div>
      )}
    </div>
  );
};

export default CustomSnippet;
