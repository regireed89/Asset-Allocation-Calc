import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

let probe

function textWidth(text, source, fontSize) {
  if (!probe) {
    probe = document.createElement('span')
    probe.style.position = 'fixed'
    probe.style.top = '0'
    probe.style.left = '0'
    probe.style.visibility = 'hidden'
    probe.style.whiteSpace = 'nowrap'
    probe.style.pointerEvents = 'none'
    document.body.appendChild(probe)
  }

  const style = getComputedStyle(source)
  probe.style.fontFamily = style.fontFamily
  probe.style.fontWeight = style.fontWeight
  probe.style.fontVariantNumeric = style.fontVariantNumeric
  probe.style.letterSpacing = style.letterSpacing
  probe.style.fontSize = `${fontSize}px`
  probe.textContent = text === '' ? '0' : text
  return probe.offsetWidth
}

export function useFitText(text, max, min) {
  const input = ref(null)
  const fontSize = ref(max)

  function fit() {
    const el = input.value
    if (!el) return
    const style = getComputedStyle(el)
    const available =
      el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 4
    let size = max
    while (size > min && textWidth(text.value, el, size) > available) size -= 1
    fontSize.value = size
  }

  watch(text, () => nextTick(fit))

  let observer
  onMounted(() => {
    fit()
    observer = new ResizeObserver(fit)
    observer.observe(input.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { input, fontSize }
}
