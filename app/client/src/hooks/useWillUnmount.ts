import { useEffect } from 'react'

export default (fn: () => void | undefined) => useEffect(() => () => fn && fn(), []);