//settings
var maxelems = 3//max text and img elements on editor
var maxtextelems = maxelems;//var for control count text elems | can be any number or var maxelems
var maximageelems = maxelems;//var for control count img elems | can be any number or var maxelems
var count = 0;//variable for AddTextElement function for creating elements with different id | must be 0
var imagecount = 0;////variable for LoadImage function for creating elements with different id | must be 0
var fsize = 20;//basic font-size
var ffamily = "Arial";//basic font-family

//create new text element
function AddTextElememt(color)
{
	count++;
	if(count <= maxtextelems)
	{
		//create textarea
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "draggable"+count+"");
		elem.setAttribute("class", "ui-widget");
		elem.setAttribute("style", "position: relative;");
		var wrapped = doc.getElementById('editorfield');
		elem.innerHTML = "<textarea id=\"textarea"+count+"\" \
		onclick=\"EditTextArea("+count+");\" \
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
		//create tools for change font-family and font-size
		var label = "Блок "+count+"";
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
		var br = "</br>";
		$("#texttools").append(br);
	}
	else
	{
		alert("Количество блоков текста превышено");
	}
}

//change background color in field and textarea
function СhangeBackground(id,color)
{
	id.style.backgroundColor=color;
	for(i=0;i<=maxtextelems;i++)
    {
    	$("#textarea"+i+"").css('backgroundColor', color);
	}
}

//for uploading image to field
function LoadImage(f) {
	imagecount++;
	if(imagecount <= maximageelems)
	{
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "image"+imagecount+"");
		elem.setAttribute("class", "ui-widget");
		elem.setAttribute("style", "border:2px solid #000; width: 223px; height: 223px;");
	    var fls = f.files;
	    if(!fls || !fls.length || !FileReader){return;}
	    var fr = new FileReader();
	    fr.onload = function() {
	        var im = new Image();
	        im.src = this.result;
	        elem.innerHTML = "<img id=\"dragimage"+imagecount+"\" class=\"ui-widget\" style=\"text-align: center; border:none; width: 200px; height: 200px; position: relative;\" src="+im.src+">";
	        var wrapped = doc.getElementById('editorfield');
	        wrapped.appendChild(elem);
	        for(i=0;i<=maximageelems;i++)
		    {
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
	}
	else
	{
		alert("Количество картинок превышено");
	}
}

//preview function - deactivate all borders
function CheckBox1()
{
	if($("#preview").attr('checked')){
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','none');
			$("#image"+i+"").css('border','none');
			$("#textarea"+i+"").css('resize','none');
		}
	}
	else{
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','');
			$("#image"+i+"").css('border','2px solid #000');
			$("#textarea"+i+"").css('resize','');
		}
	}
}

//this function update select tags if values are different
function EditTextArea(i){
	var doc = document;
	//get values from textarea
	var fontsize1 = doc.getElementById("textarea"+i+"").style.fontFamily;
	var size1 = doc.getElementById("textarea"+i+"").style.fontSize;
	//change values in select
	$("#"+i+"fs :contains('"+fontsize1+"')").attr("selected", "selected");
	$("#"+i+"size :contains('"+size1+"')").attr("selected", "selected");
}

//get id from select and set new font-size and font-family
function GetSelectId(){
	$('.texttools').live('click', function(e) {
	var id = e.target.id;//here id it's string with letters and num, for example "1fs" or "1size"
	id2 = parseInt(id);//get number from id
	//using this num change css styles
	$("#"+id2+"fs").change(function() {
		$("#textarea"+id2+"").css("font-family", $(this).val());
	});
	$("#"+id2+"size").change(function() {
		$("#textarea"+id2+"").css("font-size", $(this).val());
	});
});
}
