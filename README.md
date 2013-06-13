npm-socialmeter
===============
A json request API to track and collect your website shares, likes, tweets, and more by nodejs. 

We have server now
======================
We live this product at www.pgurl.com. Now, You can just http request from pgurl.com without npm install to your server. Please donate us for maintenance support! Refer more detail on how to do http request from http://easydeveloperlife.blogspot.com/2013/06/new-social-count-data-api-services.html


Socials
========
Now we support

	googleplus
	facebook  
	twitter  
	linkedin  
	delicious  
	stumbleupon  

More socials to support

	digg
	weibo

How to install
===============
	npm install socialmeter

How to use
===============
	
	var socialmeter = new require('socialmeter');
	var social = new socialmeter();
	
	var targeturl = "www.pgurl.com";
	var query = "googleplus,facebook,twitter,linkedin,delicious,stumbleupon";
	var sharetex = "test for sharing";
	social.getdata(targeturl ,filter, sharetext, function(socials){
		console.log(socials);
	});
