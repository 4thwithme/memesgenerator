import { useEffect, EffectCallback } from 'react'


export default (fn: EffectCallback) => useEffect(() => fn && fn(), []);