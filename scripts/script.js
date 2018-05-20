maxelems = 3
count = 0;
maxtextelems = maxelems;
function AddTextElememt(color)
{  
	count++;
	if(count <= maxtextelems)
	{
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "draggable"+count+"");
		elem.setAttribute("class", "ui-widget");
		elem.setAttribute("style", "position: relative;");
		var wrapped = doc.getElementById('editorfield');
	    elem.innerHTML = "<textarea id=\"textarea"+count+"\" style=\"resize:none; border: none; background-color:"+color+"\" class=\"ui-widget\">Редактируемый текст</textarea>";
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
	}
	else
	{
		alert("Количество блоков текста превышено");
	}
}  

function СhangeBackground(id,color)
{
	id.style.backgroundColor=color;
	for(i=0;i<=maxtextelems;i++)
    {
    	$("#textarea"+i+"").css('backgroundColor', color);
	}
}

imagecount = 0;
maximageelems = maxelems;
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

function CheckBox1()
{
	if($("#preview").attr('checked')){
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','none');
			$("#image"+i+"").css('border','none');
		}
	}
	else{
		for(i=0;i<=maxtextelems;i++){
			$("#draggable"+i+"").css('border','');
			$("#image"+i+"").css('border','2px solid #000');
		}
	}
}