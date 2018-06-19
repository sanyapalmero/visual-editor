//settings
var maxelems = 6//max text and img elements on editor
var maxtextelems = maxelems;//var for control count text elems | can be any number or var maxelems
var maximageelems = maxelems;//var for control count img elems | can be any number or var maxelems
var count = 0;//variable for AddTextElement function for creating elements with different id | must be 0
var imagecount = 0;////variable for LoadImage function for creating elements with different id | must be 0
var fsize = 20;//basic font-size
var ffamily = "Arial";//basic font-family
var delnum = 0;//for delete elements | must be 0
var delnum2 = 0;//for delete elements | must be 0
var price = 0;

//create new text element and all necessary select tags
function AddElememt(){
	if(count < maxtextelems){
		count++;
		delnum++;
		price += 100;//inc price
		UpdPrice();
		//create textarea
		var doc = document;
		var field = doc.getElementById('editorfield');
		var color = window.getComputedStyle(field).backgroundColor;//get color from field
		var elem = doc.createElement('div');
		elem.setAttribute("id", "draggable"+count+"");
		elem.setAttribute("class", "textblock");
		var wrapped = doc.getElementById('editorfield');
		elem.innerHTML = "<textarea id=\"textarea"+count+"\" \
		onclick=\"UpdateSelectValues("+count+");\" \
		style=\"font-family:"+ffamily+"; \
				font-size:"+fsize+"px; \
				border: none; \
				background-color:"+color+"\" \
				class=\"ui-widget\">Редактируемый текст</textarea>";
	    wrapped.appendChild(elem);
	    for(i=0;i<=maxtextelems;i++)
	    {
	    	$("#draggable"+i+"")
	    	.draggable({
	    		containment: "parent"
	    	})
	    	.resizable({
		        alsoResize: "#textarea"+i+"",
				maxWidth: 850,
		        maxHeight: 450,
		        handles: "all"
		    });
		}
		//create tools for change font-family, font-size, color
		var label = doc.createElement('div');
		label.setAttribute("id",""+count+"label");
		label.setAttribute("style","display:inline-block;");
		label.innerHTML = "Блок "+count+"";
		$("#texttools").append(label);
		var select1 = doc.createElement('select');
		select1.setAttribute("id", ""+count+"fs");
		select1.innerHTML = "<option value=\"Arial\">Arial</option>\
							<option value=\"Verdana\">Verdana </option>\
							<option value=\"Impact\">Impact</option>\
							<option value=\"Comic Sans MS\">Comic Sans MS</option>";
		var wrapped = doc.getElementById('texttools');
		wrapped.appendChild(select1);
		var select2 = doc.createElement('select');
		select2.setAttribute("id", ""+count+"size");
		select2.innerHTML = "<option value=\"7px\">7px</option>\
							<option value=\"10px\">10px</option>\
							<option value=\"20px\">20px</option>\
							<option value=\"30px\">30px</option>";
		wrapped.appendChild(select2);
		var select3 = doc.createElement('select');
		select3.setAttribute("id", ""+count+"col");
		select3.innerHTML = "<option value=\"black\" style=\"background-color: black;\"></option>\
							<option value=\"red\" style=\"background-color: red;\"></option>\
							<option value=\"white\" style=\"background-color: white;\"></option>\
							<option value=\"orange\" style=\"background-color: orange;\"></option>\
							<option value=\"yellow\" style=\"background-color: yellow;\"></option>\
							<option value=\"lime\" style=\"background-color: lime;\"></option>\
							<option value=\"aqua\" style=\"background-color: aqua;\"></option>\
							<option value=\"blue\" style=\"background-color: blue;\"></option>\
							<option value=\"magenta\" style=\"background-color: magenta;\"></option>\
							<option value=\"crimson\" style=\"background-color: crimson;\"></option>";
		wrapped.appendChild(select3);
		var br = "</br>";
		$("#texttools").append(br);
	}
	else
	{
		alert("Количество блоков текста превышено");
	}
}

var flag = 0;
//change background color in field and textarea
function СhangeBackground(id,color){
	if(flag == 0){
		price += 300;//inc price
		UpdPrice();
		flag = 1;
	}
	id.style.backgroundColor=color;
	for(i=0;i<=maxtextelems;i++){
    	$("#textarea"+i+"").css('backgroundColor', color);
	}
	$('#colorselection').get(0).selectedIndex = 0;//set first select
}

//for uploading image to field
function LoadImage(f) {
	imagecount++;
	if(imagecount <= maximageelems){
		delnum2++;
		price += 200;//inc price
		UpdPrice();
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "image"+imagecount+"");
		elem.setAttribute("class", "imageblock");
	    var fls = f.files;
	    if(!fls || !fls.length || !FileReader){return;}
	    var fr = new FileReader();
	    fr.onload = function() {
	        var im = new Image();
	        im.src = this.result;
	        elem.innerHTML = "<img id=\"dragimage"+imagecount+"\" class=\"image\" style=\"text-align: center; border:none; width: 200px; height: 200px; position: relative;\" src="+im.src+">";
	        var wrapped = doc.getElementById('editorfield');
	        wrapped.appendChild(elem);
	        for(i=0;i<=maximageelems;i++){
		    	$("#image"+i+"")
		    	.draggable({
		    		containment: "parent"
		    	})
		    	.resizable({
			        alsoResize: "#dragimage"+i+"",
					maxWidth: 850,
			        maxHeight: 450,
			        handles: "all"
			    });
		    }
	    };
	    fr.readAsDataURL(fls[0]);
	    $("#img-load").val('');//clear file after load
	}else{
		alert("Количество картинок превышено");
	}
}

//preview function - deactivate all borders
function Preview(){
	if($("#preview").attr('checked')){
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','none');
			$("#image"+i+"").css('border','none');
			$("#textarea"+i+"").css('resize','none');
		}
	}else{
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','');
			$("#image"+i+"").css('border','2px solid #000');
			$("#textarea"+i+"").css('resize','');
		}
	}
}

//this function update select tags if values are different
function UpdateSelectValues(i){
	var doc = document;
	//get values from textarea
	var fontsize1 = doc.getElementById("textarea"+i+"").style.fontFamily;
	var size1 = doc.getElementById("textarea"+i+"").style.fontSize;
	//change values in select
	$("#"+i+"fs :contains('"+fontsize1+"')").attr("selected", "selected");
	$("#"+i+"size :contains('"+size1+"')").attr("selected", "selected");
}

var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
//get id from select and set new font-size and font-family
function GetSelectId(){
	$('.texttools').live('click', function(e) {
		var id = e.target.id;//here id it's string with letters and num, for example "1fs" or "1size"
		id2 = parseInt(id);//get number from id
		//using this num change css styles
		$("#"+id2+"fs").change(function() {
			$("#textarea"+id2+"").css("font-family", $(this).val());//update font-family
			if(flag2==0){
				price += 50;//inc price
				UpdPrice();
				flag2 = 1;
			}
		});
		$("#"+id2+"size").change(function() {
			$("#textarea"+id2+"").css("font-size", $(this).val());//update font-size
			if(flag3==0){
				price += 50;//inc price
				UpdPrice();
				flag3 = 1;
			}
		});
		$("#"+id2+"col").change(function() {
			$("#textarea"+id2+"").css("color", $(this).val());//update text color
			if(flag4==0){
				price += 50;//inc price
				UpdPrice();
				flag4 = 1;
			}
		});
	});
}

//create .png image from editor field
function RenderImage(){
	var check = $('#preview').attr('checked');
	if(check == true){
		var doc = document;
		html2canvas(doc.querySelector("#editorfield")).then(canvas => {
			var name = "image.png";
			const a = doc.createElement("a");
			doc.body.appendChild(a);
			a.style = "display: none";
			a.href = canvas.toDataURL();
			a.download = name;
			a.click();
			doc.body.removeChild(a);
		});
	}else{
		alert("Перед загрузкой картинки необходимо включить предварительный просмотр");
	}
}

//function for clearing bloks
function RemoveElements(delnum){
	$("#draggable"+delnum+"").remove();
	$("#"+delnum+"fs").remove();
	$("#"+delnum+"size").remove();
	$("#"+delnum+"col").remove();
	$("#"+delnum+"label").remove();
	if(delnum == 1){
		$('.texttools br').remove();
		count = 0;
	}
}

//function for delete last text block
function DeleteLastText(){
	RemoveElements(delnum);
	delnum--;
	if(count != 0){
		count--;
	}else{
		count = 0;
	}
}

//delete last image
function DeleteLastImage(){
	$("#image"+delnum2+"").remove();
	delnum2--;
	if(imagecount != 0){
		imagecount--;
	}else{
		imagecount = 0;
	}
}

//clear all elements on field
function DeleteAll(){
	$("#editorfield").empty();
	$(".texttools").empty();
	count=0;
}

//get value from radio
function CheckRadio(){
	var adv1 = $('#adv1').attr('checked');
	var adv2 = $('#adv2').attr('checked');
	var adv3 = $('#adv3').attr('checked');
	if(adv1 == true){
		price += 1000;
		UpdPrice();
	}
	else if(adv2 == true){
		price += 2000;
		UpdPrice();
	}
	else if(adv3 == true){
		price += 3000;
		UpdPrice();
	}
}

//script for updating price
function UpdPrice(){
	var doc = document;
	var p = doc.getElementById("price");
	p.innerHTML = "Цена: "+price+"р.";
}
