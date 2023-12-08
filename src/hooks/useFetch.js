import { useState, useEffect } from 'react'

const useFetch = (url, options = {}) => {
  const { fetchOptions, skip } = options

  const [data, setData] = useState(undefined)
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (skip) return
    const abortController = new AbortController()
    const signal = abortController.signal
    const doFetch = async () => {
      setLoading(true)
      try {
        const res = await fetch(url, {
          'Cache-Control': 'no-cache',
          cache: "no-store",
          ...fetchOptions
        }) // eslint-disable-line no-undef
        setResponse(res)
        const respContent = (
          fetchOptions?.headers?.['Content-Type'] || ''
        ).includes('text/html')
          ? await res.text()
          : await res.json()
        if (!signal.aborted) {
          setData(respContent)
        }
      } catch (e) {
        if (!signal.aborted) {
          setError(e)
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }
    doFetch()
    return () => {
      abortController.abort()
    }
  }, [skip])
  return { data, error, loading: loading || data === undefined && !error, response }
}

export default useFetch
