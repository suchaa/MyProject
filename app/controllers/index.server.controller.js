//2. สร้าง controller ของฟีเจอร์ที่ต้องการ
//สร้าง function render
exports.render = function(req, res){
//  res.send('Hello World');
 // 	var isLoggedIn = false;
	//
	// //session คือชื่อที่เราตั้ง
	// //req.session.remember ค่า cookie
	// //!== 'underfined' แปลว่ามันมีอยู่
	// if(typeof req.session.remember !== 'underfined'){
	// 	isLoggedIn = req.session.remember;
	// }

	res.render('index',{
	  title: 'Hello World',
		//message: 'How are things'
		username: req.user ? req.user.username : '' //ฝั่ง server
		//แปลงเป็น json string ก่อน
		//user: JSON.stringify(req.user)
	});
};
