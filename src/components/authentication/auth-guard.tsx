import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
type AuthGuardProps = {
  children: ReactNode;
};
export const AuthGuard: React.FC<AuthGuardProps> = (props) => {
  const { children } = props;
  // const router = useRouter();
  // const [checked, setChecked] = useState(false);
  // useEffect(
  //   () => {
  //     if (!router.isReady) {
  //       return;
  //     }

  //     setChecked(true);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [router.isReady]
  // );

  // if (!checked) {
  //   return null;
  // }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
