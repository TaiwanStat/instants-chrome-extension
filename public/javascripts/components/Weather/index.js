import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'
import style from './style.css'

export default class Weather extends Component {

  constructor(props, context) {
    super(props, context)
  }


  render() {
    const {
      weatherData
    } = this.props

    if (weatherData) {
      let temp = weatherData.tEMP

      // check temperature
      if (isNaN(temp) || temp < -30) 
        return (<div></div>)

      let url, 
        title,
        weatherStatus = weatherData.predStatus;

      if (weatherStatus.indexOf('晴') === -1 && weatherStatus.indexOf('雨') > -1) {
        url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/rain.png';
        title = '雨';
      }
      else if (weatherStatus.indexOf('陰') > -1) {
        url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/cloudy.png';
        title = '多雲';
      }
      else if (weatherStatus.indexOf('雲') > -1) {
        if (time === '白天')
          url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/sun_cloud.png';
        else 
          url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/moon_cloud.png';
          title = '晴時多雲';
      }
      else {
        if (time === '白天')
          url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/sun.png';
        else 
          url = 'https://s3-ap-northeast-1.amazonaws.com/now.instants.xyz/moon.png';
        title = '晴';
      }

      let city = weatherData.cITY.substring(0, weatherData.cITY.length-1);
      return (
        <div id="weather" className={style.weather}>
          <img src={url} title={title} alt={title} />
          <h5> 
          {city} {temp} 
          <sup>˚C</sup> 
          </h5>
        </div>
      );
    }

    return (
      <div id="weather">
      </div>
    )
  }
}
