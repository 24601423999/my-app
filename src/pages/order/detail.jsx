import React, { Component } from 'react'
import { Card } from 'antd'
import axios from './../../axios/index'
// import Utils from './../../utils/utils' 
import './detail.less'



export default class Detail extends Component {

  state = {
    orderInfo: {}
  }

  componentWillMount(){
    let orderId = this.props.match.params.orderId;
    if(orderId){
      this.getDetailInfo(orderId);
    }
  }

  getDetailInfo = (orderId) => {
    axios.ajax({
      url:'/order/detail',
      data: {
        params: {
          orderId: orderId
        }
      }
    }).then(res=>{
      // console.log('res: ',res);
      if(res.code === 0){
        this.setState({
          orderInfo: res.result
        })
        this.renderMap(res.result);
      }
      // console.log('set:orderInfo: ',this.state.orderInfo);
    })
  }

  renderMap = (result) => {
    this.map = new window.BMapGL.Map('orderDetailMap');
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list);
    this.drwaServiceArea(result.area);
  }

  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMapGL.ScaleControl());
    map.addControl(new window.BMapGL.CityListControl());
    map.addControl(new window.BMapGL.ZoomControl());
    map.addControl(new window.BMapGL.LocationControl());
  }

  // 绘制用户路线图
  drawBikeRoute = (positionList) => {
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if(positionList.length > 0){
      // console.log('drawBikeRoute');

      let first = positionList[0];
      let last = positionList[positionList.length-1];
      // 开始点
      startPoint = new window.BMapGL.Point(first.lon,first.lat);
      let startIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{imageSize:new window.BMapGL.Size(36,42),anchor:new window.BMapGL.Size(36,42)}
      )
      let startMarker = new window.BMapGL.Marker(startPoint,{icon:startIcon});
      map.addOverlay(startMarker)

      // 结束点
      endPoint = new window.BMapGL.Point(last.lon,last.lat);
      let endIcon = new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{imageSize:new window.BMapGL.Size(36,42),anchor:new window.BMapGL.Size(36,42)}
      )
      let endMarker = new window.BMapGL.Marker(endPoint,{icon:endIcon});
      map.addOverlay(endMarker)

      // 连接路线图
      let trackPoint = [];
      for(let i = 0;i<positionList.length; i++){
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
      }
      let polyline = new window.BMapGL.Polyline(trackPoint,{
        strokeColor: '#1869ad',
        strokeWeight: 3,
        strokeOpacity: 1,
      })
      map.addOverlay(polyline);
      map.centerAndZoom(endPoint,11);

    }
  }

  // 绘制服务区
  drwaServiceArea = (positionList) => {
    let map = this.map;
    let trackPoint = [];
    for(let i = 0;i<positionList.length; i++){
      let point = positionList[i];
      trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
    }
     // 绘制服务区
     let polygon = new window.BMapGL.Polygon(trackPoint,{
      strokeColor: "#ce0000",
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.2
    })
    map.addOverlay(polygon);
  }

  render() {
    let { orderInfo } = this.state;
    // console.log('orederInfo: ',orderInfo);
    return (
      <div>
        <Card>
          <div id="orderDetailMap" style={{height:'450px',margin:'25px 0px -31px 0'}}></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{orderInfo.mode === 1?"服务区":"停车点"}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{orderInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{orderInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{orderInfo.mobile }</div>
              </li>
            </ul> 
          </div>
        </Card>
        <Card>
          <div id="orderDetailMap"></div>
          <div className="detail-items">
            <div className="item-title">行程轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{orderInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程重点</div>
                <div className="detail-form-content">{orderInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{orderInfo.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}
