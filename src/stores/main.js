import { defineStore } from 'pinia'
import * as styles from '@/styles'
import { darkModeKey, styleKey } from '@/config'
import axios from 'axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    /* Styles */
    style: '',
    bodyStyle: '',
    lightBorderStyle: '',
    lightBgStyle: '',
    asideStyle: '',
    asideBrandStyle: '',
    asideMenuCloseLgStyle: '',
    asideMenuLabelStyle: '',
    asideMenuItemStyle: '',
    asideMenuItemActiveStyle: '',
    asideMenuItemInactiveStyle: '',
    asideSubmenuListStyle: '',
    navBarItemLabelStyle: '',
    navBarItemLabelHoverStyle: '',
    navBarItemLabelActiveColorStyle: '',
    navBarMenuListUpperLabelStyle: '',
    tableTrStyle: '',
    tableTrOddStyle: '',
    overlayStyle: '',

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: true,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    sensors: []
  }),
  getters: {
    allTempResults: (state) => {
      return state.sensors.map(sensor => {
        return sensor.tempResults.map(tempResult => {
            return {
              sensorId: sensor.id,
              ...tempResult
            }
        })
      }).flat()
    },
    sensorsTempResultsSorted: (state) => {
      let result = {}

      state.sensors.forEach(sensor => {
        result[sensor.id] = sensor.tempResults.sort((a, b) => new Date(a.date) - new Date(b.date))
      })

      return result
    }
  },
  actions: {
    setStyle (payload) {
      if (!styles[payload]) {
        return
      }

      this.style = payload

      const style = styles[payload]

      document.body.className = style.body

      if (localStorage[styleKey] !== payload) {
        localStorage.setItem(styleKey, payload)
      }

      for (const key in style) {
        this[`${key}Style`] = style[key]
      }
    },

    asideMobileToggle (payload = null) {
      const isShow = payload !== null ? payload : !this.isAsideMobileExpanded

      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60', 'lg:ml-0')

      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      this.isAsideMobileExpanded = isShow
    },

    asideLgToggle (payload = null) {
      this.isAsideLgActive = payload !== null ? payload : !this.isAsideLgActive
    },

    fullScreenToggle (payload) {
      this.isFullScreen = payload

      document.documentElement.classList[payload ? 'add' : 'remove']('full-screen')
    },

    setDarkMode (payload = null) {
      const value = payload !== null ? payload : !this.darkMode

      document.documentElement.classList[value ? 'add' : 'remove']('dark')

      localStorage.setItem(darkModeKey, value ? '1' : '0')

      this.darkMode = value
    },

    setSensors () {
      axios
        .get('https://temp-analyze-api.herokuapp.com/sensor')
        .then(r => {
          if (r.data && r.data.length) {
            this.sensors = r.data
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
})
