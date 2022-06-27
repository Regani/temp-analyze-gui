<script setup>
import { computed, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiMonitorCellphone,
  mdiCoolantTemperature
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import cloneDeep from 'lodash/cloneDeep'

const mainStore = useMainStore()

onMounted(() => {
  mainStore.setSensors()

  setInterval(() => {
    mainStore.setSensors()
  }, 5000)

})
const sensors = computed(() => mainStore.sensors)

const sensorsTemp = computed(() => mainStore.allTempResults)
const sensorsTempSorted = computed(() => {
  return cloneDeep(sensorsTemp.value).sort((a, b) => a.temp - b.temp)
})
const sensorTempMax = computed(() => sensorsTempSorted.value[sensorsTempSorted.value.length - 1])
const sensorTempMin = computed(() => sensorsTempSorted.value[0])
</script>

<template>
  <SectionMain>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <CardBoxWidget
        color="text-emerald-500"
        :icon="mdiAccountMultiple"
        :number="sensors.length"
        label="Сенсори"
      />
      <CardBoxWidget
        color="text-blue-500"
        :icon="mdiCoolantTemperature"
        :number="sensorTempMin?.temp || 0"
        label="Мінімальна температура"
      />
      <CardBoxWidget
        color="text-red-500"
        :icon="mdiCoolantTemperature"
        :number="sensorTempMax?.temp || 0"
        label="Максимальна температура"
      />
    </div>

    <CardBox
      :icon="mdiMonitorCellphone"
      title="Список сенсорів"
      has-table
    >
      <TableSampleClients />
    </CardBox>
  </SectionMain>
</template>
