import { useEffect, useRef } from 'react'


export default (f: () => any, dependencies: Array<any>) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    return f && f();
  }, [dependencies])
}
