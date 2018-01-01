import React from 'react'
import LogoImg from './shixi.png'
import './logo.css'

export default class Logo extends React.Component {
  render () {
    return (
        <div className="logo-container">
          <img src={LogoImg} width={256} height={256} alt=""/>
        </div>
    )
  }
}