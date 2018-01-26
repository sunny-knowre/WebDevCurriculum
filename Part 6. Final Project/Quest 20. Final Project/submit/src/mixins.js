export const bootstrapColor = {
  methods: {
    getBootstrapColor (id) {
      const colors = {
        1: 'primary',
        2: 'warning',
        3: 'info',
        4: 'danger',
        5: 'success',
        6: 'dark'
      }
      return colors[id]
    }
  }
}
