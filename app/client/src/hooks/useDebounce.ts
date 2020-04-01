import useDidUpdate from './useDidUpdate';


const useDebounce = (fn: () => any, ms: number, args: any) => {
  useDidUpdate(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, [args]);
};

export default useDebounce;