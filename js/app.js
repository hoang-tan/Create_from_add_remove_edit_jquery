var Peopele = [];
$(document).ready(function(){
	$('#submit').click(function(){
		let name = $('#fullName').val();
		let email = $('#myEmail').val();
		let reg =  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
		let regphone =/^(0|\+84|\84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    	let phone = $('#telePhone').val();
		let date = $('#myDate').val();
			// lấy ngày nhập từ input
		let date2 = new Date(date);
			// lấy ngày của ngày nhập vào
		let day = date2.getDate();
			// lấy tháng của ngày nhập
		let month = date2.getMonth();
		month++;
			// lấy năm của ngày nhập vào
		let yeard = date2.getFullYear();
		let day3 = new Date(yeard+18,month-1,day);
		let day4 = new Date(yeard+100,month-1,day);
		// let ktra = (today - year);
		let kiemtracradio = $('input[name="gender"]:checked').val();
		// ktra tên
		
			if( name !== ""){
				if(name == '' || name.length <= 5){	
						$("#error").text('Tên phải nhập ít nhất 5 ký tự !');
						$("#fullName").css('border', '1px solid red');		
						return;
				}else{
					$("#error").text('');
					$("#fullName").css('border', '');			
				}
			}else{
				$("#error").text('Bạn chưa nhập tên !');
				$("#fullName").css('border', '1px solid red');
				return;
			}			
	
			// ktra email
			if(email !== ''){		
				if(reg.test(email) == false){	
					$("#erroremail").text('Email không đúng định dạng !');
					$("#myEmail").css('border', '1px solid red');		
					return;
				}else{
					$("#erroremail").text('');
					$("#myEmail").css('border', '');			
				}
			}else{
				$("#erroremail").text('Bạn chưa nhập email !');
				$("#myEmail").css('border', '1px solid red');
				return;
			}
			
			// ktra sdt
			if(phone !==''){
				if (regphone.test(phone) == false) {	
					$("#errorphone").text('Số điện thoại của bạn không đúng định dạng!');
					$("#telePhone").css('border', '1px solid red');	
					return;	
				}else{
					$("#errorphone").text('');
					$("#telePhone").css('border', '');	
				}
			}else{
				$("#errorphone").text('Bạn chưa điền số điện thoại!');
				$("#telePhone").css('border', '1px solid red');
				return;
			}
	
			// ngày
			if(date !== ""){
				if(new Date() < day3){
					$("#errordate").text('Bạn chưa đủ 18 tuổi');
					$("#myDate").css('border', '1px solid red');
					return;
				}else if(new Date() > day4){
					$("#errordate").text('Tuổi bạn quá cao !');
					$("#myDate").css('border', '1px solid red');
					return;
				}else{
					$("#errordate").text('');
					$("#myDate").css('border', '');
				}	
			}else{
				$("#errordate").text('Bạn chưa nhập ngày sinh');
				$("#myDate").css('border', '1px solid red');
				return;
			}

			if(check(name)==true){
				$("#error").text('Tên không đúng định dạng !');
				$("#fullName").css('border', '1px solid red');
				return;
			}

			if(sosanh(uperCase(name))===true){
				$("#error").text('Tên này đã tồn tại !');
				$("#fullName").css('border', '1px solid red');
						
				return;
			}
			// khai báo 1 mảng
				let	datatable = {
					"name":uperCase(name),
					"email":email,
					"phone":phone,
					"date2":date, 
					"date": day + "/"+ month +"/" + yeard,
					"gioitinh":kiemtracradio
				};
				
				// nếu curIndex == -1 thì thêm ms dữ liệu
				if(curIndex == -1) {
					// thêm mới dữ liệu
					addTag(datatable);
				}else{
					// sửa lại dữ liệu
					Peopele[curIndex] = datatable;
					// resrt lại 
					curIndex = -1;
					display();
				}


				function check(string){
					let specialChars = "0123456789<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
					for(i = 0; i < specialChars.length;i++){
						if(string.indexOf(specialChars[i]) > -1){
							return true;
						}
					}
					return false;
				}
				
				
				// hiển thi khi sửa
				function display ()	{
					if(Peopele.length == 0 ){
						$("#classname").html('');
					}
					data = "";
					for(i=0 ; i<Peopele.length;i++){
						let student = Peopele[i];
						data += "<tr>"+
						"<td>"+(i+1)+"</td>"+
						"<td>"+student.name+"</td>"+
						"<td>"+student.email+"</td>"+
						"<td>"+student.phone+"</td>"+
						"<td>"+student.date2+"</td>"+
						"<td>"+student.gioitinh+"</td>"+
						"<td> <button class ='btn btn-success' onclick='edit("+i+")'>Sửa</button> <button class ='btn btn-danger' onclick='remove("+i+")'>Xóa</button>"+"</td>"+
						"</tr>";
						$("#classname").html(data);
					
				}	
			}

			// viết hoa chữ đầu 
			function uperCase(fullname) {
				let splitStr = fullname.toLowerCase().split(' ');
				for (let i = 0; i < splitStr.length; i++) {
					splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);    
				}
				return splitStr.join(' '); 
			}

				$("#fullName").val('');
				$("#telePhone").val('');
				$('#myEmail').val('');
				$('#myDate').val('');

			// so sánh tên có chùng hay k
			function sosanh (name){		
				for(i=0;i<Peopele.length;i++){
					let ktraten = Peopele[i];
					if (name === ktraten.name){
						return true;
					}
				}
				return false;
			}
	});
		// thêm người mới
		function addTag (datatable){
			Peopele.push(datatable);
			let data =$("#classname");
			data += "<tr>"+
			"<td>"+Peopele.length+"</td>"+
			"<td>"+datatable.name+"</td>"+
			"<td>"+datatable.email+"</td>"+
			"<td>"+datatable.phone+"</td>"+
			"<td>"+datatable.date+"</td>"+
			"<td>"+datatable.gioitinh+"</td>"+		
			"<td> <button class ='btn btn-success' onclick='edit("+(Peopele.length -1)+")'>Sửa</button> <button class ='btn btn-danger' onclick='remove("+(Peopele.length -1)+")'>Xóa</button>"+"</td>"+
			"</tr>";			
			$("#classname").append(data);
		}	
})
	function remove(index){
		Peopele.splice(index,1);
		if(Peopele.length == 0 ){
			$("#classname").html('');
			
		}
		if(curIndex == index){
			$("#fullName").val('');
			$("#telePhone").val('');
			$('#myEmail').val('');
			$('#myDate').val('');
		}
		data = "";
		for(i=0 ; i<Peopele.length;i++){
			let student = Peopele[i];
			data += "<tr>"+
			"<td>"+(i+1)+"</td>"+
			"<td>"+student.name+"</td>"+
			"<td>"+student.email+"</td>"+
			"<td>"+student.phone+"</td>"+
			"<td>"+student.date+"</td>"+
			"<td>"+student.gioitinh+"</td>"+
			"<td> <button class ='btn btn-success' onclick='edit("+i+")'>Sửa</button> <button class ='btn btn-danger'  onclick='remove("+i+")'>Xóa</button>"+"</td>"+
			"</tr>";
			$("#classname").html(data);
		
		}	
}

// sửa hiern thị trên inout

	// luu lại vị trí sửa khi chưa chọn gì cả
		var curIndex = -1;
		function edit (index){
			// lấy vị trí bằng chính gtri chuyền vào
			curIndex = index;
			let student = Peopele[index];
			$('#fullName').val(student.name);
			$('#myEmail').val(student.email);
			$('#telePhone').val(student.phone);
			$('#myDate').val(student.date2);
			$('#kiemtracradio').val(student.gioitinh);
			$("#errorphone").text('');
			$("#telePhone").css('border', '');	
		}

