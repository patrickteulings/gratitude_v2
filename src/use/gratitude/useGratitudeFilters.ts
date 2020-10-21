// Core
import { computed } from 'vue'
import store from '@/store'

import isSameDay from 'date-fns/isSameDay'
import subMonths from 'date-fns/subMonths'

// Interfaces
import { Gratitude, GratitudeWrapper } from '@/types/Gratitude'

export const useGratitudeFilters = () => {
  const allGratitudes: Array<GratitudeWrapper> = store.getters['gratitudeStore/getGratitudes']

  const getGratitudesPerDay = (_date: Date): Array<GratitudeWrapper> => {
    const duplicate: Array<GratitudeWrapper> = [...allGratitudes]
    const filteredGratitudes: GratitudeWrapper[] = []

    duplicate.map((gratitudewrapper: GratitudeWrapper) => {
      const { data: gratitude } = gratitudewrapper
      const dayStamp = gratitude.dayStamp.toDate()

      if (isSameDay(dayStamp, _date)) filteredGratitudes.push(gratitudewrapper)
    })

    return filteredGratitudes
  }

  const getLastMonthsGratitude = (_date: Date = new Date(), _monthsToSubtract = 1) => {
    const duplicate: Array<GratitudeWrapper> = [...allGratitudes]
    const pastDate = subMonths(_date, _monthsToSubtract)
    const filteredGratitudes: GratitudeWrapper[] = []
    console.log(pastDate)
    duplicate.map((gratitudewrapper: GratitudeWrapper) => {
      const { data: gratitude } = gratitudewrapper
      const dayStamp = gratitude.dayStamp.toDate()

      if (isSameDay(dayStamp, pastDate)) filteredGratitudes.push(gratitudewrapper)
    })

    return filteredGratitudes
  }

  return {
    getGratitudesPerDay,
    getLastMonthsGratitude,
    allGratitudes
  }
}

export default useGratitudeFilters
