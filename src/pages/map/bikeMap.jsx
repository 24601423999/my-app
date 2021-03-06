import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from './../../components/BaseForm'
import axios from './../../axios/index'

export default class bikeMap extends Component {

  state={  }
  map=''
  params = {
    page:1
  }
  
  
  
  formList = [
    {
      type:"城市",
      width:80
    },{
      type:"时间查询"
    },{
      type:'SELECT',
      label:"订单状态",
      field:"order_status",
      placeholder: '全部',
      initialValue: '0',
      width:100,
      list:[{id:"0",name:"全部"},{id:"1",name:"进行中"},{id:"2",name:"行程结束"}]
    }
  ]

  requestList = () => {
    axios.ajax({
      url:'/map/bike_list',
      data: {
        params:this.params
      }
    }).then(res=>{
      if(res.code === 0){
        this.setState({
          total_count: res.result.total_count
        })
        this.renderMap(res);
      }
    })
  }

  componentWillMount(){
    this.requestList();
  }

  // 渲染地图数据
  renderMap = (res) => {
    let list = res.result.route_list;
    this.map = new window.BMapGL.Map('container');
    let gps1 = list[0].split(',');
    let startPoint = new window.BMapGL.Point(gps1[0],gps1[1]);
    let gps2 = list[list.length-1].split(',');
    let endPoint = new window.BMapGL.Point(gps2[0],gps2[1]);
    this.map.centerAndZoom(endPoint,11);
    // 行驶起点
    let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{imageSize:new window.BMapGL.Size(36,42),anchor:new window.BMapGL.Size(18,42)});
    let bikeMarkerStart = new window.BMapGL.Marker(startPoint,{icon:startPointIcon});
    this.map.addOverlay(bikeMarkerStart);
    // 行驶终点
    let endPointIcon = new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{imageSize:new window.BMapGL.Size(36,42),anchor:new window.BMapGL.Size(18,42)})
    let bikeMarkerEnd = new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
    this.map.addOverlay(bikeMarkerEnd);

    // 绘制车辆行驶路线
    let routeList = [];
    list.forEach(item=>{
      let p = item.split(',');
      routeList.push(new window.BMapGL.Point(p[0],p[1]))
    })

    let polyLine = new window.BMapGL.Polyline(routeList,{
      strokeColor: '#ef4076',
      strokeWeight: 2,
      strokeOpacity: 1
    })
    this.map.addOverlay(polyLine);
    // 添加控件
    this.map.addControl(new window.BMapGL.ScaleControl());
    this.map.addControl(new window.BMapGL.CityListControl());
    this.map.addControl(new window.BMapGL.ZoomControl());
    this.map.addControl(new window.BMapGL.LocationControl());

    // 绘制服务区
    let servicePointList = [];
    let serviceList = res.result.service_list;
    serviceList.forEach(item=>{
      servicePointList.push(new window.BMapGL.Point(item.lon,item.lat))
    })
    let polyServiceLine = new window.BMapGL.Polygon(servicePointList,{
      strokeColor: "#ce0000",
      strokeWeight: 3,
      strokeOpacity: 0.8,
      fillColor: '#ff8605',
      fillOpacity: 0.1
    })
    this.map.addOverlay(polyServiceLine);

    // 添加地图中的自行车图标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMapGL.Icon('/assets/bike.jpg',new window.BMapGL.Size(36,42),{imageSize:new window.BMapGL.Size(36,42),anchor:new window.BMapGL.Size(18,42)})
    bikeList.forEach(item=>{
      let p = item.split(',');
      let point = new window.BMapGL.Point(p[0],p[1]);
      let bikeMarker = new window.BMapGL.Marker(point,{icon:bikeIcon});
      this.map.addOverlay(bikeMarker);
    })
  }

  // 接收查询功能的数据
  filterSubmit = (filterParams) => {
    this.params = filterParams;
    this.requestList()
  }


 
  render() {
    let { formList, filterSubmit } = this;
    let { total_count } = this.state;
    return (
      <div>
        <Card>
          <BaseForm formList={formList} filterSubmit={filterSubmit} />
        </Card>

        <Card style={{marginTop:10}}>
          <div>共{total_count}辆车</div>
          <div id='container' style={{height:500}}></div>
        </Card>
      </div>
    )
  }
}
