//�ڼ򵥲�ѯ����������0��""ʱ�����������ѯ�����������
//condName: ѡ����ֶε����֣��磺condForm.condField
//hideName: Ҫ���ص����������֣��磺condForm.condValue
//condField: �ϴβ�ѯʱѡ��Ĳ�ѯ�ֶε�ֵ���磺"docTitle"
//condValue: �ϴβ�ѯʱ����Ĳ�ѯ��ֵ���磺"��ʾ"
function hideInputTag(condName,hideName,condField,condValue){
	if(condName!=null && hideName!=null){
		if(condName.value=="" || condName.value=="0")
			hideName.style.display = "none";
		else{
			hideName.style.display = "block";
			if(condName.value==condField){
				hideName.value = condValue;
			}else{
				hideName.value = "";
			}
		}
	}
}
//�򿪵�����(top.htm)
function openSitlist()
{
	window.open("sitlist.htm","displayWindow","toolbar=no,width=500,height=500,direclories=no,status=no,scrollbars=yes,resize=no,menubar=no");
}

//��ϵͳ����(top.htm)
function openhelp()
{
	window.open("help.htm","displayWindow","toolbar=no,width=600,height=400,direclories=no,status=no,scrollbars=no,resize=no,menubar=no");
}

//����form�Ŀ��(show.htm)
function changel()
{
       if(window.top.f2.cols != "0,*")
        {
                window.top.f2.cols = "0,*";
                this.document.show.src="../image/open.gif";
                this.document.show.alt="��ʾ�˵�";
        }
        else{
                window.top.f2.cols = "120,*";
                 this.document.show.src="../image/close.gif";
                 this.document.show.alt="���ز˵�";
        }


}

//��ҳ���������ϵͳ
function addLeader() 
{
	tbox = this.document.form1.selSystem;
	fbox = this.document.form1.allSystem;
	 
	if(fbox.selectedIndex < 0)
      	{
     		alert("��ѡ��Ҫ��ӵ���ϵͳ��");
      		return;
      	}
      	
      	//var systemName = fbox.options[fbox.selectedIndex].text
    	//alert("systemName="+systemName);
      	
      	if(tbox.length >= 4)
      	{
      		alert("��������ѡ���ĸ���ϵͳ��");
      		return;
      	}
    	
    	for (var i = 0; i < tbox.length; i++)
      	{
      		if (tbox.options[i].text == fbox.options[fbox.selectedIndex].text)
        	{
        		alert("����ϵͳ�ѱ�ѡ��������ѡ��")
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
			//alert(no.value);
			//alert(no.text);
			tbox.options[tbox.options.length] = no;

	
			//  ���������Ŀ�б�
			fbox.options[i].value = "";
			fbox.options[i].text = "";
	     	}
	}
		BumpUp(fbox);
}




//��ҳ������ȥ��ϵͳ
function delLeader() 
{
   	tbox = this.document.form1.allSystem;
	fbox = this.document.form1.selSystem;
   	
   	if(fbox.selectedIndex < 0)
      	{
     		alert("��ѡ��Ҫ��ȥ����ϵͳ��");
      		return;
      	}
      	
  	//var systemValue = fbox.options[fbox.selectedIndex].value;
  	//alert("systemValue="+systemValue);
  	
	var err = 0;
	for (var i = 0; i < tbox.length; i++)
	{
		if (tbox.options[i].value == fbox.options[fbox.selectedIndex].value){err=1;}
	}
	//alert("err="+err);
    	
	for(var i=0; i<fbox.options.length; i++)  
	{
		if(fbox.options[i].selected && fbox.options[i].value != "")  
	     	{
		       if(err==0)
			{
			        // ������Ŀ�б��Ҳ�
				var no = new Option();
				no.value = fbox.options[i].value;
			    	textTemp = fbox.options[i].text;
			   	no.text = textTemp;
			   	//alert(no.value);
				//alert(no.text);
				tbox.options[tbox.options.length] = no;
			}				
			
			//  ���������Ŀ�б�
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

//�細��û�д򿪣���򿪴��ڣ����Ѿ��򿪣���ʹ���ý���
function OpenWindow(url,name){
    openWindow=window.open(url,name,'width=795,height=595,left=0,top=0,scrollbars=yes,resizable=yes');
    openWindow.focus();
}
/* FUNCTION---------------------------------------------refurbish
���ܣ���ҳ�����ˢ�²�����ȥ��New��ʶ��
������flag �� true �Ѷ��� flase δ����
      url��   �鿴object��url��
*/
function refurbish(url,flag){
  OpenWindow(url,'doc');
  var i = 0 ;
  if(flag == "false"){
  	while(i < 10000 ){i++;}
  	window.location.reload();
  	}
  }
 
function show_op(id){
	var obj = eval("this.op_"+id);
	if(obj.style.display=="none")
		obj.style.display = "inline";
	else
		obj.style.display = "none";		
}
