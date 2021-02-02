import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'


export default class Gallery extends Component {

  state={
    visible: false
  }

  openGallery = (imgSrc) => {
    this.setState({
      visible: true,
      imgSrc: '/gallery/'+imgSrc
    })
  }

  render() {
    const {Meta} = Card;
    let { openGallery } = this;
    let imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'],
      ['7.png', '8.png', '9.png', '10.png', '11.png', '12.png'],
      ['13.png', '14.png', '15.png', '16.png', '17.png', '18.png'],
      ['19.png', '20.png', '21.png', '22.png', '23.png', '24.png']
    ];
    const imgList = imgs.map(list=>{
      return list.map((item,index)=>{
        return <Card
          style={{
            marginBottom: 7
          }}
          cover={<img src={'/gallery/'+item} alt='' key={index} onClick={()=>openGallery(item)}/>}
        >
          <Meta 
            title='React meta'
            description='I love React'
          />
        </Card>
      })
    }) 
    return (
      <div className='card-wrap'>
          <Row gutter='5'>
            <Col md={6}>
              {imgList[0]}
            </Col>
            <Col md={6}>
                {imgList[1]}
            </Col>
            <Col md={6}>
              {imgList[2]}
            </Col>
            <Col md={6}>
              {imgList[3]}
            </Col>
          </Row>
          <Modal
            visible={this.state.visible}
            onCancel={()=>this.setState({
              visible:false
            })}
            footer={null}
            width='300px'
            height='500px'
            title='图片画廊'
          >
            <img src={this.state.imgSrc} alt=""/>
          </Modal>
      </div>
    )
  }
}
