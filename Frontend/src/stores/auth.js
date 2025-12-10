import { reactive } from 'vue'

export const auth = reactive({
  user: JSON.parse(localStorage.getItem('currentUser') || 'null'),

  login(user) {
    this.user = user
    localStorage.setItem('currentUser', JSON.stringify(user))
  },

  logout() {
    this.user = null
    localStorage.removeItem('currentUser')
    localStorage.removeItem('authToken')
  },
})
