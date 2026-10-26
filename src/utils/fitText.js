import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

let ruler

function textWidth(text, source, fontSize) {
  if (!ruler) {
    ruler = document.createElement('span')
    ruler.style.position = 'fixed'
    ruler.style.top = '0'
    ruler.style.left = '0'
    ruler.style.visibility = 'hidden'
    ruler.style.whiteSpace = 'nowrap'
    ruler.style.pointerEvents = 'none'
    document.body.appendChild(ruler)
  }

  const style = getComputedStyle(source)
  ruler.style.fontFamily = style.fontFamily
  ruler.style.fontWeight = style.fontWeight
  ruler.style.fontVariantNumeric = style.fontVariantNumeric
  ruler.style.letterSpacing = style.letterSpacing
  ruler.style.fontSize = `${fontSize}px`
  ruler.textContent = text === '' ? '0' : text
  return ruler.offsetWidth
}

export function useFitText(text, max, min, reserve = 0) {
  const input = ref(null)
  const fontSize = ref(max)
  const width = ref(0)

  function fit() {
    const el = input.value
    if (!el) return
    const style = getComputedStyle(el)
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
    const room = el.clientWidth - padding - reserve - 4
    let size = max
    while (size > min && textWidth(text.value, el, size) > room) size -= 1
    fontSize.value = size
    width.value = textWidth(text.value, el, size)
  }

  watch(text, () => nextTick(fit))

  let observer
  onMounted(() => {
    fit()
    observer = new ResizeObserver(fit)
    observer.observe(input.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { input, fontSize, width }
}
