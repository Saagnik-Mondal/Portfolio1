// Lightweight global scroll state read inside the R3F render loop.
export const scrollStore = {
  progress: 0, // 0..1 down the whole page
  velocity: 0, // smoothed scroll speed
}
