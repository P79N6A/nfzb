	function addOnclick() 
	{
		tbox = this.document.form1.selectedFile;
		fbox = this.document.form1.allFile;
		
		 
		if(fbox.selectedIndex < 0)
	  {
	   	alert("��ѡ��Ҫ����");
	  	return;
	  }
	  var selectValue = fbox.options[fbox.selectedIndex].value;
	  for (var i = 0; i < tbox.length; i++)
	  {
	    if (tbox.options[i].value == selectValue)
	    {
	      alert("�������Ѵ�˲����ڣ�������ѡ�������");
	      //alert("i="+i);
	      fbox.options[fbox.selectedIndex].value = "";
				fbox.options[fbox.selectedIndex].text = "";
				BumpUp(fbox);
	      return;
	    }
	  }
	      
	  for(var i=0; i<fbox.options.length; i++)  
		{
			if(fbox.options[i].selected && fbox.options[i].value != "")  
			{
			  // ������Ŀ�б��Ҳ�
			  var no = new Option();
			  no.value = fbox.options[i].value;
			  no.text = fbox.options[i].text;
			  //alert(no.selected);
				//alert(no.text);
				tbox.options[tbox.options.length] = no;
		
				//  ���������Ŀ�б�
				fbox.options[i].value = "";
				fbox.options[i].text = "";
			}
		}
		BumpUp(fbox);	   	
	}
	
	
	//��ҳ������ȥ��������
	function delOnclick() 
	{
		tbox = this.document.form1.allFile;
		fbox = this.document.form1.selectedFile;
		
		if(fbox.selectedIndex < 0)
	  {
	    alert("��ѡ��Ҫ��ȥ�");
	    return;
	  }
	      	
	  var selectValue = fbox.options[fbox.selectedIndex].value;
		for (var i = 0; i < tbox.length; i++)
	  {
	    if (tbox.options[i].value == selectValue)
	    {
	      //alert("�������Ѵ�˲����ڣ�������ѡ�������");
	      //alert("i="+i);
	      fbox.options[fbox.selectedIndex].value = "";
				fbox.options[fbox.selectedIndex].text = "";
				BumpUp(fbox);
	      return;
	    }
	  }
		
		for(var i=0; i<fbox.options.length; i++)  
		{
			if(fbox.options[i].selected && fbox.options[i].value != "")  
		  {
				// ������Ŀ�б��Ҳ�
				var no = new Option();
				no.value = fbox.options[i].value;
			  no.text = fbox.options[i].text;
			  tbox.options[tbox.options.length] = no;
					
			  //���������Ŀ�б�
			  fbox.options[i].value = "";
				fbox.options[i].text = "";
			}
	  }
	  BumpUp(fbox);
	}
	
	
	//����б�
	function BumpUp(box)  
	{
	  	for(var i=0; i<box.options.length; i++)  
	  	{
	     		if(box.options[i].value == "")  
	     		{
	       			for(var j=i; j<box.options.length-1; j++)  
	       			{
								box.options[j].value = box.options[j+1].value
				       	box.options[j].text = box.options[j+1].text
	       			}
	       			var ln = i
	       			break
	     		}
	   	}
	   	if(ln < box.options.length)
	   	{
	     		box.options.length -= 1;
	     		BumpUp(box);
	   	}
	}
	
	//����
	function upOnclick()
	{
		//alert("bbb");
		box = this.document.form1.selectedFile;
		if(box.selectedIndex < 0)
	  {
	    alert("��ѡ��Ҫ�ƶ����");
	    return;
	  }		
		if(box.selectedIndex==0)
		{
			alert("��ѡ������ȼ��Ѿ���ߣ�");
	   	return;
		}
		else
		{
			var i = box.selectedIndex;
			var selText = box.options[i].text;
			var selValue = box.options[i].value;
			box.options[i].text = box.options[i-1].text;
			box.options[i].value = box.options[i-1].value;
			
			box.options[i-1].text = selText;
			box.options[i-1].value = selValue;
			box.options[i-1].selected = true;
		}
	}
	
	//����
	function downOnclick()
	{
		box = this.document.form1.selectedFile;
		if(box.selectedIndex < 0)
	  {
	    alert("��ѡ��Ҫ�ƶ����");
	    return;
	  }
	  if(box.selectedIndex == box.options.length-1)
		{
			alert("��ѡ������ȼ��Ѿ���ͣ�");
	    return;
		}
		else
		{
			var i = box.selectedIndex;
			var selText = box.options[i].text;
			var selValue = box.options[i].value;
			box.options[i].text = box.options[i+1].text;
			box.options[i].value = box.options[i+1].value;
			
			box.options[i+1].text = selText;
			box.options[i+1].value = selValue;
			box.options[i+1].selected = true;
			box.selectedIndex++;
		}		
	}