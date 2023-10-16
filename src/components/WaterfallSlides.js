import { useState } from 'react'
import Typography from '@mui/material/Typography'

const FallbackComponent = () => <Typography variant='h2'>Nope</Typography>

/**
 * @NOTE
 * If we want to memoize the next function, and pass both current slide index
 * and current slide data to the onNext callback, we'll need to manage both in
 * a single piece of state.
 */
const WaterfallSlides = ({
  components,
  initialData,
  onChange,
  onNext,
  onBack,
  onComplete
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [slidesData, setSlidesData] = useState([initialData || {}])
  const [backData, setBackData] = useState({})

  const CurComponent = components?.[currentSlideIndex] || FallbackComponent

  // Things will need to change before we go with `useCallback` on this. See note above.
  const next = data => {
    const newIndex = currentSlideIndex + 1

    const newData = [...slidesData, data]
    setSlidesData(newData)

    onNext?.({ index: newIndex, data: newData })
    onChange?.({ type: 'next', index: newIndex, data: newData })
    setCurrentSlideIndex(newIndex)
  }

  const done = data => {
    // Exclude undefined and events
    const doneData =
      !data || !!(data.type && data.target)
        ? [...slidesData]
        : [...slidesData, data]
    onComplete?.(doneData)
    onChange?.({ type: 'done', ...doneData })
  }

  const back = data => {
    setBackData(data || [])
    const newIndex = currentSlideIndex - 1

    const newData = (slidesData || []).slice(0, -1)
    setSlidesData(newData)

    onBack?.({ index: newIndex, data: newData })
    onChange?.({ type: 'back', index: newIndex, data: newData })
    setCurrentSlideIndex(newIndex)
  }

  const onChangeCallback = payload => {
    onChange?.({
      type: 'internal',
      index: currentSlideIndex,
      data: slidesData,
      payload
    })
  }

  return (
    <CurComponent
      currentSlideIndex={currentSlideIndex}
      data={slidesData[currentSlideIndex] || {}}
      backData={backData}
      next={next}
      back={back}
      done={done}
      onChange={onChangeCallback}
    />
  )
}

export default WaterfallSlides
