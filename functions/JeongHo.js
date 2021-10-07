exports.handler = async function(){
	return {
		statusCode: 200,
		body: JSON.stringify({
			name:'JeongHo',
			age: 11,
			emial: 'sdf@abc.com'
		})
	}
}
//netlify를 이용한 api /.netlift/functions/JeongHo 로 접근