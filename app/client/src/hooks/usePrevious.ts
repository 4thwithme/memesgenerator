import { useEffect, useRef } from 'react'


export default <T>(value: T): T | null => {
  const ref = useRef<T | null>(value);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}