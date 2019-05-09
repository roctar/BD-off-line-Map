$(function() {
	var map = new BMap.Map("container");      //设置底图
	var point = new BMap.Point(118.548581, 24.8716);    // 创建点坐标
	map.centerAndZoom(new BMap.Point(118.56, 24.873338),15);                     // 初始化地图,设置中心点坐标和地图级别。
	
	//map.addControl(new BMap.MapTypeControl());
	map.addControl(new BMap.NavigationControl());
	map.enableScrollWheelZoom();                  // 启用滚轮放大缩小。
	map.enableKeyboard();                         // 启用键盘操作。
	
	var marker = new BMap.Marker(new BMap.Point(118.548581, 24.8716)); // 创建点
	var marker11 = new BMap.Marker(new BMap.Point(118.547, 24.87)); // 创建点
	map.addOverlay(marker);            //增加点
	marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	var opts = {
		width: 200,     // 信息窗口宽度
		height: 100,     // 信息窗口高度
		title: "黑金刚", // 信息窗口标题
	}
	var infoWindow = new BMap.InfoWindow("地址：崇宏街33号黑金刚科技有限公司", opts);  // 创建信息窗口对象 
	marker.addEventListener("click", function () {
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	});
	
	var marker2 = new BMap.Marker(new BMap.Point(116.403694, 39.914935)); // 创建点
	map.addOverlay(marker2);            //增加点
	
	//addClick();
	
	//创建小狐狸
	var pt = new BMap.Point(116.417, 39.909);
	var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
	
	//var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
	//map.addOverlay(marker2);              // 将标注添加到地图中
	//setTimeout(() => {
	//  console.log('定位成功...')
	//  map.addOverlay(marker11);
	//	// marker11.addEventListener("mouseover", function () {
	//	// 	this.setIcon(myIcon);
	//	// });
	//	var pointA = new BMap.Point(118.548581, 24.8716);
	//	var pointB = new BMap.Point(118.547, 24.87);
	//	console.log('距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。');  //获取两点距离,保留小数点后两位
	//	//addClick();
	//}, 3000);
	
	
	$(document).ready(function(){
		$("#getpeople").click(function(){
	        //获取人员位置
	        $.get('jsondata/onlinep.json').done(function(data){
		  		var mapalllist = data.data;
		  		if(data.code == 1){
		  			console.log('数据获取成功！');
		  			for(let i=0;i<mapalllist.length;i++){
		  				//console.log(mapalllist[i]);
		  				let listmarker = new BMap.Marker(new BMap.Point(mapalllist[i].longitude, mapalllist[i].latitude)); // 创建点
		  				map.addOverlay(listmarker);
		  				listmarker.addEventListener("click", function () {
							map.openInfoWindow(
								new BMap.InfoWindow(
									"在线人：" + mapalllist[i].deviceName + "<br>当前行为: " + mapalllist[i].doing, 
									{
										width: 180,     // 信息窗口宽度
										height: 80,     // 信息窗口高度
										title: '<b>'+"在线人员信息"+'</b>', // 信息窗口标题
									}
								), 
								new BMap.Point(mapalllist[i].longitude, mapalllist[i].latitude)
							); //开启信息窗口
						});
		  			}
		  		}
		  	}).error(function(err) {
		  		console.log(err);
		  		alert('请把项目置于服务器环境运行!');
		  	});
		})
		  
		$("#getline").click(function(){
		    //获取轨迹
		    $.get('jsondata/guiji.json').done(function(data){
				var guijilist = data.data;
				if(data.code == 1){
					console.log('轨迹获取成功！');
					var polylist1 = [];
					for(let i=0;i<guijilist.length;i++){
						polylist1[i] = new BMap.Point(guijilist[i].longitude, guijilist[i].latitude);
					}
					console.log(polylist1);
					var polyline = new BMap.Polyline(polylist1,
					{strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5}
					);
					map.addOverlay(polyline);
				}
			}).error(function(err) {
		  		console.log(err);
		  		alert('请把项目置于服务器环境运行!');
		    });
		})
	});
	
	function showInfo(e) {
		console.log(e.point.lng + ", " + e.point.lat);
	    var clickpoit = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
		map.addOverlay(clickpoit);
		clickpoit.setAnimation(BMAP_ANIMATION_BOUNCE);
	}
	function addClick() {
		map.addEventListener("click", showInfo);
	}
	function removeClick() {
		map.removeEventListener("click", showInfo);
	}
});
