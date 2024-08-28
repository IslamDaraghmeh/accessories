import React from 'react'
import Hero from '../components/Hero/Hero'
import Famous from '../components/Famous/Famous'
import ShowAll from '../components/ShowAll/ShowAll'
import FreePoint from '../components/FreePoint/FreePoint'
import CustomMap from '../components/CustomMap/CustomMap'

function Home() {
  return (
    <div>
      <Hero />
      {/* <Famous /> */}
      <FreePoint />
      <ShowAll />
    </div>
  )
}

export default Home