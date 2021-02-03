import React, { Component } from 'react'
import { Carousel, Card } from 'antd'
import './ui.less'

export default class Carousels extends Component {
  render() {
    return (
      <div>
        <Card title='背景轮播' className='card-wrap'>
          <Carousel autoplay={true}>
            <div><h3>Ant Motion Banner -React</h3></div>
            <div><h3>Ant Motion Banner -Vue</h3></div>
            <div><h3>Ant Motion Banner -Hooks</h3></div>
          </Carousel>
        </Card>
        <Card title='图片背景轮播' className='card-wrap slider-wrap'>
          <Carousel autoplay={true}>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt=""/>
            </div>
            <div>
            <img src="/carousel-img/carousel-2.jpg" alt=""/>
            </div>
            <div>
            <img src="/carousel-img/carousel-3.jpg" alt=""/>
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}
