import React, { type ReactNode } from "react";

interface ContentsProps {
  children: ReactNode;
}

const Contents: React.FC<ContentsProps> = ({ children }) => {
  return <main className="flex-1 p-8">{children}</main>;
};

export default Contents;
