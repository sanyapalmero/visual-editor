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
