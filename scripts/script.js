count = 0;
maxtextelems = 3;
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
	    elem.innerHTML = "<textarea id=\"textarea"+count+"\" style=\"border: none; background-color:"+color+"\" class=\"ui-widget\">Редактируемый текст</textarea>";
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
maximageelems = 3;
function LoadImage(f) {
	imagecount++;
	if(imagecount <= maxtextelems)
	{
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "image"+imagecount+"");
		elem.setAttribute("class", "ui-widget");
		elem.setAttribute("style", "position: relative; width: 200px; height: 20px;");
	    var fls = f.files;
	    if(!fls || !fls.length || !FileReader){return;}
	    var fr = new FileReader();
	    fr.onload = function() {
	        var im = new Image();
	        im.src = this.result;
	        elem.innerHTML = "<img id=\"dragimage"+imagecount+"\" class=\"ui-widget\" style=\"border:2px solid #000; width: 200px; height: 200px; position: relative;\" src="+im.src+">";
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