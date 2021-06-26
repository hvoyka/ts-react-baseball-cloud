import React from "react";

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="#667784"
      viewBox="0 0 372.826 372.826"
      {...props}
    >
      <path d="M303.761 153.483h-17.666V99.692C286.095 44.727 241.378 0 186.416 0c-54.982 0-99.691 44.721-99.691 99.692v53.791h-17.66c-10.164 0-18.399 8.239-18.399 18.399v182.546c0 10.16 8.235 18.398 18.399 18.398h234.697c10.143 0 18.399-8.238 18.399-18.398V171.882c0-10.16-8.257-18.399-18.4-18.399zM123.519 99.692c0-34.687 28.21-62.897 62.896-62.897 34.678 0 62.889 28.21 62.889 62.897v53.791H123.519V99.692z" />
    </svg>
  );
}

export default LockIcon;