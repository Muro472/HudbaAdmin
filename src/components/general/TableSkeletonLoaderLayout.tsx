import { ReactNode } from "react";

import NoRecordsFoundComponent from "./NoRecordsFoundComponent.tsx";
import TableSkeletonLoaderComponent from "./TableSkeletonLoaderComponent.tsx";

interface IComponentProps {
  children: ReactNode;
  loading: boolean;
  length: number;
  loadedContentLength: number;
}

export default function TableSkeletonLoaderLayout({
  children,
  loading,
  length,
  loadedContentLength,
}: IComponentProps) {
  return loading ? (
    <TableSkeletonLoaderComponent length={length} />
  ) : !loadedContentLength ? (
    <NoRecordsFoundComponent />
  ) : (
    <>{children}</>
  );
}
