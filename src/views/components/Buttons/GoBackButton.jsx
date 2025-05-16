import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoBackButton = () => {
    const navigation = useNavigate()
  return (
    <button onClick={() => navigation(-1)}>Go back</button>
  )
}

export default GoBackButton