export const motionSettings = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { amount: 0.1 },
  transition: { duration: 0.5 },
  variants: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}
