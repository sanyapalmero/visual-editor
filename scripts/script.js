count = 0;
function AddTextElememt()
{  
	count++;
	if(count <= 3)
	{
		var doc = document;
		var elem = doc.createElement('div');
		elem.setAttribute("id", "draggable"+count+"");
		elem.setAttribute("class", "ui-widget ui-corner-all ui-state-error");
		elem.setAttribute("style", "position: relative;");
		var wrapped = doc.getElementById('editor-text');
	    elem.innerHTML = "<textarea id=\"textarea"+count+"\" style=\"border: none;\" class=\"ui-widget ui-corner-all ui-state-error\">Редактируемый текст</textarea>";
	    wrapped.appendChild(elem);
	    for(i=0;i<=3;i++)
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
