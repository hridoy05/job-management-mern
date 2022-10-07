import React from 'react';
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartsContainer} from '../../components'

const Stats = () => {
  const {showStats, isLoading, monthlyApplications} = useAppContext()

  useEffect(()=> {   
    showStats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (isLoading) {
    return <Loading center />
  }
  console.log(monthlyApplications);

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
};

export default Stats;