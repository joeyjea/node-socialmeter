
var http = require('http');
var https = require('https');
var comunity = function(url){
  var targeturl = "";
	var updated = false;
	
	var socialsPlugIns = [
			{	
				name : "facebook",
				
				requestdataType: "jsonp",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Shares",
				likestring: "Likes",
				getLikeField : function(data){
					return data.data[0].like_count;
				},
				getShareField : function(data){
					return data.data[0].share_count;
				},
				
				getSharePageUrl: function(txt){
					return "http://www.facebook.com/sharer/sharer.php?u=" + targeturl + "&t=" + txt;
				},
				getRequestBody : function(){
					return {};
				},
				getData: function(index, donefunc){
					var options = {
					  hostname: 'graph.facebook.com',
					  port: 443,
					  path: '/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27' + targeturl + '%27',
					  method: 'GET'
					};
					
					var req = https.request(options, function(res) {
					  //console.log('STATUS: ' + res.statusCode);
					  //console.log('HEADERS: ' + JSON.stringify(res.headers));
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						//console.log('BODY: ' + chunk);
						donefunc.call(null, index, JSON.parse(chunk));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					// write data to request body
					req.write('data\n');
					req.write('data\n');
					req.end();
				}
			},
			{	
				name : "twitter",
				requesturl : "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
				requestdataType: "jsonp",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Tweets",
				likestring: "Tweets",
				getLikeField : function(data){
					return 0;
				},
				getShareField : function(data){
					return data.count;
				},
				getSharePageUrl: function(txt){
					return "https://twitter.com/intent/tweet?text=" + txt + "&url=" + targeturl;
					
				},
				getRequestBody : function(){
					return {};
				},
				getData: function(index, donefunc){
					//requesturl : "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
					var options = {
					  hostname: 'cdn.api.twitter.com',
					  port: 80,
					  path: '/1/urls/count.json?url=' + targeturl,
					  method: 'GET'
					};
					
					var req = http.request(options, function(res) {
					  //console.log('STATUS: ' + res.statusCode);
					  //console.log('HEADERS: ' + JSON.stringify(res.headers));
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						//console.log('BODY: ' + chunk);
						donefunc.call(null, index, JSON.parse(chunk));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					// write data to request body
					req.write('data\n');
					req.write('data\n');
					req.end();
				}
			},
			{	
				name : "googleplus",
				requestdataType: "json",
				requesttype: "POST",
				requestcontentType: "application/json; charset=utf-8",
				sharecount: 0,
				likecount: 0,
				sharestring: "+1s",
				likestring: "+1s",
				getShareField : function(data){
					return data[0].result.metadata.globalCounts.count;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return "https://plus.google.com/share?url="+ targeturl;
				},
				getRequestBody : function(){
					var objs = [{
						"method":"pos.plusones.get",
						"id":"p",
						"params":{
							"nolog":true,
							"id":"http://stylehatch.co/",
							"source":"widget",
							"userId":"@viewer",
							"groupId":"@self"
							},
						"jsonrpc":"2.0",
						"key":"p",
						"apiVersion":"v1"
					}];
					//console.log(objs);
					//console.log(JSON.stringify($.parseJSON(objs)));
					//return $.parseJSON(objs);
					return JSON.stringify(objs);
					//return objs;
				},
				getData: function(index, donefunc){
					//requesturl : "https://clients6.google.com/rpc/?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ",
					var options = {
					  hostname: 'clients6.google.com',
					  port: 443,
					  path: '/rpc/?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ',
					  method: 'POST'
					};
					
					var req = https.request(options, function(res) {
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						//console.log('BODY: ' + chunk);
						donefunc.call(null, index, JSON.parse(chunk));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					var objs = [{
						"method":"pos.plusones.get",
						"id":"p",
						"params":{
							"nolog":true,
							"id":targeturl,
							"source":"widget",
							"userId":"@viewer",
							"groupId":"@self"
							},
						"jsonrpc":"2.0",
						"key":"p",
						"apiVersion":"v1"
					}];
					// write data to request body
					req.write(JSON.stringify(objs));
					req.end();
				}
				
			},
			{	
				name : "linkedin",
				requestdataType: "jsonp",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Shares",
				likestring: "Shares",
				getShareField : function(data){
					return data.count;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return 'https://www.linkedin.com/cws/share?url=' + targeturl + '&token=&isFramed=true';
				},
				getRequestBody : function(){
					return {};
				},
				getData: function(index, donefunc){
					//requesturl : "http://www.linkedin.com",
					var options = {
					  hostname: 'www.linkedin.com',
					  port: 80,
					  path: '/countserv/count/share?format=jsonp&url=' + targeturl + "&callback=",
					  method: 'GET'
					};
					
					var req = http.request(options, function(res) {
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						var c = chunk.replace("IN.Tags.Share.handleCount(", "");
						c = c.substring(0 ,c.length -1);
						c = c.substring(0 ,c.length -1);
						donefunc.call(null, index, JSON.parse(c));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					req.end();
				}
			},
			{	
				name : "delicious",
				
				requestdataType: "jsonp",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Bookmarks",
				likestring: "Bookmarks",
				getShareField : function(data){
					return data[0].total_posts;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return 'http://www.delicious.com/save?v=5&noui&jump=close&url=' + targeturl + '&title='+ txt;
				},
				getRequestBody : function(){
					return {};
				},
				getData: function(index, donefunc){
					//requesturl : "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
					var options = {
					  hostname: 'feeds.delicious.com',
					  port: 80,
					  path: '/v2/json/urlinfo/data?url=' + targeturl,
					  method: 'GET'
					};
					
					var req = http.request(options, function(res) {
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						console.log('BODY: ' + chunk);
						donefunc.call(null, index, JSON.parse(chunk));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					req.end();
				}
			},
			{	
				name : "stumbleupon",
				
				requestdataType: "json",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Stumbles",
				likestring: "Stumbles",
				getShareField : function(data){
					console.log(data);
					if(data.result.views == null){
						return 0;
					}
					return data.result.views;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return 'http://www.stumbleupon.com/badge/?url='+ targeturl;
				},
				getRequestBody : function(){
					return {};
				},
				getData: function(index, donefunc){
					//requesturl : "http://www.stumbleupon.com/services/1.01/badge.getinfo?url={url}",
					var options = {
					  hostname: 'www.stumbleupon.com',
					  port: 80,
					  path: '/services/1.01/badge.getinfo?url=' + targeturl,
					  method: 'GET'
					};
					
					var req = http.request(options, function(res) {
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						//console.log('BODY: ' + chunk);
						donefunc.call(null, index, JSON.parse(chunk));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					req.end();
				}
			},
			{	
				name : "pinterest",
				requesturl : "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
				requestdataType: "jsonp",
				requesttype: "GET",
				sharecount: 0,
				likecount: 0,
				sharestring: "Pinned",
				likestring: "Pinned",
				getShareField : function(data){
					console.log(data);
					return data.count;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return 'http://pinterest.com/pin/create/button/?url='+targeturl+'&description='+txt;
				},
				getRequestBody : function(){
					return null;
				},
				getData: function(index, donefunc){
					//requesturl : "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
					var options = {
					  hostname: 'api.pinterest.com',
					  port: 80,
					  path: '/v1/urls/count.json?url=' + targeturl,
					  method: 'GET'
					};
					
					var req = http.request(options, function(res) {
					  res.setEncoding('utf8');
					  res.on('data', function (chunk) {
						//console.log('BODY: ' + chunk);
						
						var c = chunk.replace("receiveCount(", "");
						c = c.substring(0 ,c.length -1);
						donefunc.call(null, index, JSON.parse(c));
					  });
					});
					
					req.on('error', function(e) {
					  console.log('problem with request: ' + e.message);
					});

					req.end();
				}
			},
			
			
			/*
			{	
				name : "digg",
				requesturl : "http://widgets.digg.com/buttons/count?url={URL}",
				requesttype: "jsonp",
				sharecount: 0,
				likecount: 0,
				
				getShareField : function(data){
					return data.count;
				},
				getLikeField : function(data){
					return 0;
				},
				getSharePageUrl: function(txt){
					return 'https://www.linkedin.com/cws/share?url=' + targeturl + '&token=&isFramed=true';
				}
			}
			*/
			
		];
		
	var socials = [];
	 var countShareReqest = 0;
	 this.getdata = function(url, query, txt, donefunc){
	 countShareReqest = 0;
		socials = [];
		
		if(query == "*"){
			socials = socialsPlugIns;
		}
		else{
			console.log("query:" + query);
			var fsplt = query.split(",");
			for(var i=0; i<= fsplt.length-1; i++){
			
				for(var j=0; j<= socialsPlugIns.length-1; j++){
					if(fsplt[i] == socialsPlugIns[j].name){
						socials.push(socialsPlugIns[j]);
						break;
					}
				}
				
			}
		}
		 
		
		targeturl = url;
		if(url.substr(url.length - 1) == "#"){
			targeturl = encodeURIComponent(url.substring(0, url.length - 1));
		}
		var requrl = "";
		
		
		

			for(var i=0; i<= socials.length-1; i++){
				socials[i].getData(i, function(index, jdata){
					//console.log("index:" + index);	
					console.log(socials[index].name);
					
					try
					{
						socials[index].sharecount = socials[index].getShareField(jdata);
					}
					catch(e){
						socials[index].sharecount = 0;
					}
					
					try
					{
						socials[index].likecount = socials[index].getLikeField(jdata);
					}
					catch(e){
						socials[index].likecount = 0;
					}
					
					socials[index].updatedtim = (new Date()).toISOString();
					countShareReqest++;
					if(countShareReqest == socials.length){
						var totalShare = 0;
						var totallike = 0;
						var allcount = 0;
						var sLis = [];
						for(var j=0; j<= socials.length-1; j++){
							totalShare = totalShare + socials[j].sharecount;
							totallike = totallike + socials[j].likecount;
							allcount = allcount + socials[j].sharecount + socials[j].likecount;
							sLis.push({
									name : socials[j].name,
									pgurlcounttrackerurl: "http://pgurl.com/api/socialcount/?turl=" + targeturl + "&q=" + socials[j].name + "&tq=share",
									shareurl: socials[j].getSharePageUrl(txt),
									sharecount: socials[j].sharecount,
									likecount: socials[j].likecount,
									sharestring: socials[j].sharestring,
									likestring: socials[j].likestring,
									updatedtim: socials[j].updatedtim,
							});

						}
						var nobj = {
							targeturl : targeturl,
							totalshare : totalShare,
							totallike : totallike,
							totalall : allcount,
							socials: sLis
						}
						donefunc.call(null, nobj);
					}
					
				});
				
			}
		
		
	};
	
	this.sharepage = function(name, txt){
		for(var j=0; j<= socials.length-1; j++){
			if(socials[j].name == name){
				socials[j].sharepage(txt);
				break;
			}
		}
		
	
		return false;
	}
}

module.exports = comunity
