import React from 'react'
import { Page, Gauge, Navbar, Block, BlockTitle } from 'framework7-react'

const BalanceGaugePage = () => {
  const localStorageKey = 'csvData' // replace with your actual key
  const storedData = localStorage.getItem(localStorageKey)
  const results = storedData ? JSON.parse(storedData) : []
  const countBalancesGreaterThanFive = results.filter(
    item => item.Balance > 5
  ).length
  const countBalancesGreaterThanFive2 =
    976 - results.filter(item => item.Balance > 5).length
  const maxValue = 976
  const percentage = (countBalancesGreaterThanFive / maxValue) * 100

  return (
    <Page>
      <Navbar title='Users' backLink='Back' />
      <Block>
        <BlockTitle>Store Occupancy</BlockTitle>
        <div className='grid grid-cols-2 grid-gap'>
          <Gauge
            type='semicircle'
            value={countBalancesGreaterThanFive / maxValue} // Normalize value between 0 and 1
            size={250}
            borderWidth={20}
            borderBgColor='#ddd'
            borderColor='#2196f3'
            valueText={`${countBalancesGreaterThanFive2}`}
            valueTextColor='#2196f3'
            labelText='Pallet Space available'
          />

          <Gauge
            type='semicircle'
            value={percentage / 100} // Normalize value between 0 and 1
            size={250}
            borderWidth={20}
            borderBgColor='#ddd'
            borderColor='#4caf50'
            valueText={`${percentage.toFixed(2)}%`}
            valueTextColor='#4caf50'
            labelText='Store Occupancy'
          />
          
        </div>
      </Block>
    </Page>
  )
}

export default BalanceGaugePage
