import moment from 'moment'

export const mapRskOverBtcToChartData = (colors, data, activeTab) => {
  const datasets = data.reduce(
    (acc, { data }) => {
      const { btcHashrate, rskHashrate, rskObjectiveHashrate } = data

      const btcData = {
        borderColor: colors.orange,
        label: 'BTC Hashrate',
        data: [btcHashrate.value]
      }

      const rskData = {
        borderColor: colors.green,
        label: 'RSK Hashrate',
        data: [rskHashrate.value]
      }

      const rskObjectiveData = {
        borderColor: colors.red,
        borderDash: [1, 2],
        label: '51% BTC',
        data: [rskObjectiveHashrate.value]
      }

      const existingBtcData = acc.find(item => item.label === 'BTC Hashrate')
      const existingRskData = acc.find(item => item.label === 'RSK Hashrate')
      const existingRskObjectiveData = acc.find(
        item => item.label === '51% BTC'
      )

      if (existingBtcData) existingBtcData.data.push(...btcData.data)
      else acc.push(btcData)

      if (existingRskData) existingRskData.data.push(...rskData.data)
      else acc.push(rskData)

      if (existingRskObjectiveData) existingRskObjectiveData.data.push(...rskObjectiveData.data)
      else acc.push(rskObjectiveData)

      return acc
    },
    []
  )

  const labels = data.map(
    ({ time }) => {
      const format = activeTab.name === 'Week' ? 'MMMM D' : 'h:mm a'
      return moment(time).utc(true).format(format)
    }
  )

  return {
    labels,
    datasets
  }
}
