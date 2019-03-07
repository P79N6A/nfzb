<!--
//modify list
//20061229 ����displaytag�Զ���ҳ��С����Ӧ�ű�
//20060104 �޸�checkbox�п�����

var monthDaysConsts = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

/**
 *@author yejianfeng
 *@date 2005/07/15
 *@format must use elments'(YYYY,MM,DD) combination,
 * for example: YYYY-MM-DD,YYYY/MM/DD,MM/DD/YYYY
 * ......
 * base function 
 */
function getDate(dDate,format){
   var s = format, re, tmp; // ����������      
   re = /MM/gi;
   tmp = "" + (dDate.getMonth() + 1);
   if(tmp.length == 1)
   	tmp = "0" + tmp;
   s = s.replace(re, tmp); // ��ȡ�·ݡ�
   
   re = /DD/gi;
   tmp = "" + dDate.getDate();
   if(tmp.length == 1)
   	tmp = "0" + tmp;   
   s = s.replace(re, tmp); // ��ȡ�ա�
   
   re = /YYYY/gi;
   s = s.replace(re, dDate.getYear()); // ��ȡ��ݡ�
   
   re = /HH/gi
   s = s.replace(re, dDate.getHours()); // ��ȡСʱ��
   
   re = /MI/gi
   s = s.replace(re, dDate.getMinutes()); // ��ȡ���ӡ�
   
   re = /SS/gi
   s = s.replace(re, dDate.getSeconds()); // ��ȡ�롣   
   
   re = /MS/gi
   s = s.replace(re, dDate.getMilliseconds()); // ��ȡ�롣   
     
   return(s); // �������ڡ�
}

function getToday(format){
  var today = new Date(); // ������ǰDate 
  return getDate(today, format);  
}

function getCurrentMonthBegin(format) {
	var dateTmp = new Date(); // ������ǰDate
	dateTmp.setDate(1);
	return getDate(dateTmp, format);
}

function getCurrentMonthEnd(format) {
	var dateTmp = new Date(); // ������ǰDate
	var year = dateTmp.getYear();
	var mon = dateTmp.getMonth() + 1;
	if(mon != 2)
		dateTmp.setDate(monthDaysConsts[mon]);
	else {
		if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
			dateTmp.setDate(29);
		}else{
			dateTmp.setDate(28);
		}
	}
	
	return getDate(dateTmp, format);
}

function getCurrentWeekBegin(format) {
	var dateTmp = new Date(); // ������ǰDate
	var dayOfWeek = dateTmp.getDay();
	var offset = 0;	
	switch(dayOfWeek) {
		case 0: offset = 6; break; // Sunday
		case 1: offset = 0; break; // Monday
		case 2: offset = 1; break; // Tuesday
		case 3: offset = 2; break; // Wednesday
		case 4: offset = 3; break; // Thursday
		case 5: offset = 4; break; // Friday
		case 6: offset = 5; break; // Saturday
	}
	dateTmp.setDate(dateTmp.getDate() - offset);
	return getDate(dateTmp, format);
}

function getCurrentWeekEnd(format) {
	var dateTmp = new Date(); // ������ǰDate	
	var dayOfWeek = dateTmp.getDay();	
	var offset = 0;
		
	switch(dayOfWeek) {
		case 0: offset = 0; break; // Sunday
		case 1: offset = 6; break; // Monday
		case 2: offset = 5; break; // Tuesday
		case 3: offset = 4; break; // Wednesday
		case 4: offset = 3; break; // Thursday
		case 5: offset = 2; break; // Friday
		case 6: offset = 1; break; // Saturday
	}
	dateTmp.setDate(dateTmp.getDate() + offset);
	return getDate(dateTmp, format);
}

function getTimeStamp(){
	return getToday("YYYYMMDDHHMISSMS");
}
// ended by yejianfeng's date operation functions

// add by ye@20050923
function focusObj(obj) {
	try {
		obj.select();
		obj.focus();		
	}catch(ex) {
		// չ�����ص�����element
		var ancestor = obj;
		try {
			while(ancestor != null) {
				if(ancestor.style.display == 'none')
					ancestor.style.display = '';
					
				ancestor = ancestor.parentElement;
			}

			obj.focus();			
		}catch(ignoredException) {
		}
		
	}
}

function message(obj,msg){
	if(obj.displayName!=null && obj.displayName!=undefined){
		alert("\""+obj.displayName + "\""+msg+"��");
	}else{
		alert("ֵ"+msg+"��");
	}
}

function errorMessage(obj,msg,force){
	message(obj,msg);
	if(force)focusObj(obj);
}

//У��Form�µ�����Ԫ��
function validForm(formElement,force){
	var input = formElement.getElementsByTagName("input");
	for (var i=0;i<input.length;i++){
		if (!validValue(input[i],true)) return false;
	}
	var textarea = formElement.getElementsByTagName("textarea");
	for (var i=0;i<textarea.length;i++){
		if (!validValue(textarea[i],true)) return false;
	}
	var select = formElement.getElementsByTagName("select");
	for (var i=0;i<select.length;i++){
		if (!validValue(select[i],true)) return false;
	}
	return true;
}

//У�鵥������
function validValue(obj,force){
	if(obj.tagName == "INPUT"){
		if (obj.style.display!="none" && obj.readonly!="true"){
				if (obj.type == "text"){
	
					if (!validEnableBlank(obj,force)) return false;
					if (!validMaxLength(obj,force)) return false;
					if (!validMinLength(obj,force)) return false;
					if (!validMaxValue(obj,force)) return false;
					if (!validMinValue(obj,force)) return false;
	
					if (obj.validate_type=="int") if(!validInteger(obj,force))return false;
					if (obj.validate_type=="float") if(!validFloat(obj,force))return false;
					if (obj.validate_type=="emailAddress") if(!validEmail(obj,force))return false;
					if (obj.validate_type=="date") if(!validDate(obj,force))return false;
					if (obj.validate_type=="dateEx") if(!validDateEx(obj,force))return false;
				}
				if (obj.type == "checkbox"){
					if (!validCheckBoxEnableBlank(obj,force)) return false;
				}
			}
	}
	if(obj.tagName == "TEXTAREA"){
		if (obj.style.display!="none" && obj.readonly!="true"){
			if (!validEnableBlank(obj,force)) return false;
			if (!validMaxLength(obj,force)) return false;
			if (!validMinLength(obj,force)) return false;
		}
	}
	if(obj.tagName == "SELECT"){
		if (obj.style.display!="none" && obj.readonly!="true"){
			if (!validEnableBlank(obj,force)) return false;
		}
	}
	return true;
}

//У��checkbox�Ƿ�Ϊ��
function validCheckBoxEnableBlank(obj,force){
	if (obj.enable_blank=="true" || obj.enable_blank==undefined){
		return true;
	}
	for (var i=0;obj.name!="" && i<document.getElementsByName(obj.name).length;i++){
		if (document.getElementsByName(obj.name).item(i).checked){
			return true;
		}
	}
	errorMessage(obj,"����Ϊ��",force);
	return false;
}

//У��text�Ƿ�Ϊ��	
function validEnableBlank(obj,force){
	var val = trimString(obj.value);
	if (obj.enable_blank=="false" && val ==""){
		obj.value = val;
		errorMessage(obj,"����Ϊ��",force);
		return false;
	}
	return true;
}

//У����󳤶�
function validMaxLength(obj,force){
	if (obj.max_length>0 && obj.value!="" && obj.value.replace(/[^\x00-\xff]/g,"aa").length>obj.max_length){
		errorMessage(obj,"���Ȳ��ܴ���"+obj.max_length,force);
		return false;
	}
	return true;
}

//У����С����
function validMinLength(obj,force){
	if (obj.min_length>0 && obj.value!="" && obj.value.replace(/[^\x00-\xff]/g,"aa").length<obj.min_length){
		errorMessage(obj,"���Ȳ���С��"+obj.min_length,force);
		return false;
	}
	return true;
}

//У�����ֵ
function validMaxValue(obj,force){
	if (!isNaN(obj.value) && !isNaN(obj.max_value)){
		if (obj.max_value && obj.value!="" && parseInt(obj.value)>parseInt(obj.max_value)){
			errorMessage(obj,"���ܴ���"+obj.max_value,force);
			return false;
		}
	}else{
		try{
			if (obj.max_value && obj.max_value!="" && obj.value!="" && eval("document.all."+obj.max_value) && eval("document.all."+obj.max_value+".value")!=""){
				var maxObj = eval("document.all."+obj.max_value);
				if (obj.value>maxObj.value){
					errorMessage(obj,"���ܴ���"+maxObj.displayName,force);
					return false;
				}
			}
		}catch(e){}
	}
	return true;
}

//У����Сֵ
function validMinValue(obj,force){
	if (!isNaN(obj.value) && !isNaN(obj.min_value)){
		if (obj.min_value && obj.value!="" && parseInt(obj.value)<parseInt(obj.min_value)){
			errorMessage(obj,"����С��"+obj.min_value,force);
			return false;
		}
	}else{
		try{
			if (obj.min_value && obj.min_value!="" && obj.value!="" && eval("document.all."+obj.min_value) && eval("document.all."+obj.min_value+".value")!=""){
				var minObj = eval("document.all."+obj.min_value);
				if (obj.value<minObj.value){
					errorMessage(obj,"����С��"+minObj.displayName,force);
					return false;
				}
			}
		}catch(e){}
	}
	return true;
}

//У�����ֵ�Ƿ�������
function validInteger(item,force)
{
	item.value = trimString(item.value);
	if(item.value=="")return true;
	var myReg = /^-?\d+$/; 
	if(myReg.test(item.value))return true;
	errorMessage(item,"��������",force);
	return false;
}

//У�����ֵ�Ƿ������֣�����������
function validFloat(item,force)
{
	if(item.value=="")return true;
	var myReg = /^(-?\d+)(\.\d+)?$/; 
	if(myReg.test(item.value))return true;
	errorMessage(item,"��������(��С��)",force);
	return false;
}

//У������ʼ���ַ��ʽ
function validEmail(item,force){
	item.value = trimString(item.value);
	if(item.value=="")return true;
	var myReg = /^[_\.a-zA-Z0-9]+@([_a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,4}$/; 
	if(myReg.test(item.value))return true;
	errorMessage(item,"���ǵ����ʼ���ַ",force);
	return false;
}

//У�����ڸ�ʽ
function validDate(item,force){
	item.value = trimString(item.value);
	if(item.value=="")return true;
	var re=/^(\d{1,4})(-|\/|\.)(\d{1,2})\2(\d{1,2})$/;
	var r=item.value.substring(0,10).match(re);
	if(r!=null){
		var d=new Date(r[1],r[3]-1,r[4]);
		//alert ( d.getFullYear() + "/" + d.getMonth() +"/"+ d.getDate() +":" +r[1]+"/"+(r[3]-1)+"/"+r[4]);
		if(d.getFullYear()==r[1] && d.getMonth()==r[3]-1 && d.getDate()==r[4]) return true;
	}
	errorMessage(item,"���ǺϷ������ڸ�ʽ",force);
	return false;
}

//У�����ڸ�ʽ--�����������á�00������ʾ
function validDateEx(item,force){
	item.value = trimString(item.value);
	if(item.value=="")return true;
	if(item.value.length == 10){
		var re=/^(\d{1,4})(-|\/|\.)(\d{1,2})\2(\d{1,2})$/;
		var r=item.value.substring(0,10).match(re);
		if(r[3] == 0)return true;
		if(r[4] == 0)return true;
		if(r!=null){
			var d=new Date(r[1],r[3]-1,r[4]);
			//alert ( d.getFullYear() + "/" + d.getMonth() +"/"+ d.getDate() +":" +r[1]+"/"+(r[3]-1)+"/"+r[4]);
			if(d.getFullYear()==r[1] && d.getMonth()==r[3]-1 && d.getDate()==r[4]) return true;
		}
	}
	errorMessage(item,"���ǺϷ������ڸ�ʽ",force);
	return false;
}

function trimString( str ){
//�ص��ַ����еĿո�
    if( str == "" )
        return "";
    for( i = 0; i < str.length; i ++ )
        if( str.charAt(i) != ' ' && str.charAt(i) != '\t' )
            break;
    strResult = str.substr( i );
    for( i = strResult.length - 1; i >= 0 ; i -- )
        if( strResult.charAt(i) != ' ' && strResult.charAt(i) != '\t' )
            break;
    strResult = strResult.substring( 0, i + 1 );
    return strResult;
}

function valueIsNum(item){
//У������Ƿ�������
	var checkOK = "0123456789";
	var checkStr = item.value;
	var allValid = true;
	var decPoints = 0;
	var allNum = "";
	for (i = 0;  i < checkStr.length;  i++)
	{
		ch = checkStr.charAt(i);
		for (j = 0;  j < checkOK.length;  j++)
			if (ch == checkOK.charAt(j))break;
		if (j == checkOK.length)
		{
			allValid = false;
			break;
		}
		if (ch != ",")
		allNum += ch;
	}
	if (!allValid)
	{
		return (false);
	}
	return true;
}

/**
 * ye modify it in order to pass the window width and height parameter,
 * at 2004-06-25 16:52
 */
function getSingleQuoteValue(pageName){
	// set single quote value
	var winWidth = 184;
	var winHeight = 220;

	if(3 <= getSingleQuoteValue.arguments.length) {
		winWidth = getSingleQuoteValue.arguments[1];
		winHeight = getSingleQuoteValue.arguments[2];
	}

	// alert("width:" + winWidth + " height:" + winHeight);
	value=singleQuote(pageName,winWidth, winHeight);
	
	try{
		if (value){
			//split value to code/name
			var sValue,arrValue;
			sValue = value;
			arrValue = sValue.split("<<!--");
			sName = arrValue[0];
			sCode = arrValue[0];
			if( arrValue.length > 1 )sName = arrValue[1];

			event.srcElement.parentElement.parentElement.children(0).children(0).value = sCode;
			event.srcElement.parentElement.parentElement.children(0).children(1).value = sName;
		}
	}catch(e){}
}

function setSingleQuoteValue(value){
	// set single quote value
	try{
		if (value){
			//split value to code/name
			var sValue,arrValue;
			sValue = value;
			arrValue = sValue.split("<<!--");
			sName = arrValue[0];
			sCode = arrValue[0];
			if( arrValue.length > 1 )sName = arrValue[1];

			event.srcElement.parentElement.parentElement.children(0).children(0).value = sCode;
			event.srcElement.parentElement.parentElement.children(0).children(1).value = sName;
		}
	}catch(e){}
}

function singleQuote(pageName, w, h){
	// get single quote page
	tmpLeft = getIEPosX(event.srcElement)+event.srcElement.offsetWidth+window.screenLeft;;
	tmpTop = getIEPosY(event.srcElement)+window.screenTop-document.body.scrollTop;
	tmpValue = window.showModalDialog(pageName,"","dialogLeft:"+tmpLeft+";dialogTop:"+tmpTop+";dialogWidth:" + w + "px;dialogHeight:" + h + "px;scroll:0;status:0;help:0;");
	if (tmpValue)
		return tmpValue;
	else
		return "";
}

//�����Ԫ�ص�ʵ��λ��
function getIEPosX(elt) { return getIEPos(elt,"Left"); }
function getIEPosY(elt) { return getIEPos(elt,"Top"); }
function getIEPos(elt,which) {
	iPos = 0
	while (elt!=null) {
		iPos += elt["offset" + which]
		elt = elt.offsetParent
	}
	return iPos
}

function setInputboxValue(o){
//set Inputbox Value
	var target = document.getElementsByName(o).item(0);
	target.value = "";
	for (var i=0;i<document.getElementsByName(event.srcElement.name).length;i++){
		if (document.getElementsByName(event.srcElement.name).item(i).checked){
			target.value += "1";
		}else{
			target.value += target.fill_char;
		}
	}
	if (target.enable_blank=="true" && target.value.indexOf("1")==-1){
		target.value = "";
	}
}

function returnCheckbox(){
//cancel the Checkbox's value change
	event.srcElement.checked = !event.srcElement.checked;
}

function keyDownOfSingleQuote(){

//clear single quote value if "del" is pressed
//except "backspace" || event.keyCode==8

	if (event.keyCode==46){
		event.srcElement.value = "";
		
		//�滻����ֵname=hylbdm <-- name="wadTmpDisplayObjecthylbdm"
		try{
			event.srcElement.parentElement.children(0).value = "";
			//var r, re, ss;                    //Declare variables.
			//ss = event.srcElement.name;
			//re = /wadTmpDisplayObject/g;             //Create regular expression pattern.
			//r = ss.replace(re, "");    
			
			//var obj;
			//obj = eval("document.all." + r + ";" );
			//obj.value = "";
		}catch(e){}
	}else{
	    //���˻س���tab
	    if(event.keyCode==13 || event.keyCode==9)return;
	  //��ֹ����
		//event.srcElement.blur();
	}
}

function openwindowwithoutbar(sUrl,windowName){
//open a window with out toolbar
	var bitmove = top.screenTop;
	var sFeatures;
	
	if(openwindowwithoutbar.arguments.length >=4 ) {
		sWidth = openwindowwithoutbar.arguments[2];
		sHeight = openwindowwithoutbar.arguments[3];
	}else{
		sWidth=screen.availWidth-10-bitmove;
		if( sWidth > 750 )sWidth=750;
		sHeight=screen.availHeight-30-bitmove;
	}

	var sFeatures;
	sFeature = "left="+bitmove+",top="+bitmove+",Width="+sWidth+",Height="+sHeight+",toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,resizable=yes";
	window.open(sUrl,windowName,sFeature,true);
}

function openwindowwithoutbar_notuse(sUrl,windowName,sWidth,sHeight){
//open a window with out toolbar
	var bitmove = top.screenTop;
	var sFeatures;
	sFeature = "left="+bitmove+",top="+bitmove+",Width="+sWidth+",Height="+sHeight+",toolbar=no,status=no,scrollbars=yes,location=no,menubar=no,resizable=yes";
	window.open(sUrl,windowName,sFeature,true);
}

function openwindowatdetail(sUrl,windowName){
//open a window at detail frame
	document.all.detailFrame.src=sUrl;
	if(window.location.href.indexOf("#resultFrameJumpTag") == -1){
		window.navigate(window.location.href+ "#resultFrameJumpTag") ;
	}else{
		window.navigate(window.location.href) ;
	}
}

function closeWindow(sUrl,windowName){
//close the window
	top.close();
}

function closeWindow(){
//close the window
	top.close();
}

function unionValidFunc(unionValidUnitName){
//unionValid not blank
	var unionValidUnit = document.getElementsByName(unionValidUnitName);
	for (var i=0;i<unionValidUnit.length;i++){
		var strunionValidUnitValue = "";
		var strunionValidUnitName = "";
		for (var j=0;j<unionValidUnit[i].length;j++){
			var targetUnit = document.getElementsByName(unionValidUnit[i].options(j).value);
			for (var z=0;z<targetUnit.length;z++){
				if ((targetUnit[z].tagName=="INPUT" && targetUnit[z].type!="radio" && targetUnit[z].type!="checkbox") || targetUnit[z].tagName=="SELECT"){
					strunionValidUnitValue += targetUnit[z].value;
				}
				if (targetUnit[z].tagName=="INPUT" && targetUnit[z].type=="checkbox"){
					for (var k=0;k<document.getElementsByName(unionValidUnit[i].options(j).value).length;k++){
						if (document.getElementsByName(unionValidUnit[i].options(j).value).item(k).checked){
							strunionValidUnitValue += document.getElementsByName(unionValidUnit[i].options(j).value).item(k).value;
						}
					}
				}
			}
			if (unionValidUnit[i].options(j).text!=""){
				strunionValidUnitName += "\""+unionValidUnit[i].options(j).text+"\"��";
			}
		}
		strunionValidUnitName = strunionValidUnitName.substring(0,strunionValidUnitName.length-1)
		if (strunionValidUnitValue==""){
			alert(strunionValidUnitName+",������һ������Ϊ�գ�");
			return false;
		}
	}
	return true;
}


function splitStr(objName){
//��ȡ�ַ�����1��" "ǰ���ַ�
	obj = eval("document.all."+objName);
	if (obj!=null && obj.value.indexOf(" ")>-1){
		obj.value = obj.value.substring(0,obj.value.indexOf(" "));
	}
}

function replaceSexCode(objName){
//�滻�Ա����
//"��"="1"
//"Ů"="2"
//����=""
	obj = eval("document.all."+objName);
	if (obj!=null){
		if (obj.value=="��"){
			obj.value = "1";
		}else{
			if (obj.value=="Ů"){
				obj.value = "2";
			}else{
				obj.value = "";
			}
		}
	}
}



//***************************
//checkbox��ѡ����

function onlyCheckOne(){
//��ѡcheckbox
var elementGroup = event.srcElement.parentElement.getElementsByTagName("INPUT");
	for (var i=0;i<elementGroup.length;i++){
		if (elementGroup.item(i)!=event.srcElement 
				&& elementGroup.item(i).type=="checkbox" 
				&& elementGroup.item(i).name== event.srcElement.name ){
			elementGroup.item(i).checked = false;
		}
	}
}

//***************************
//�������ֶ��б༭��

//׷���б�����
function appendDynamicOptions(){
	//�ж��Ƿ�ָ���ָ���
	var seperateChar = ",";
	if(appendDynamicOptions.arguments.length>0) {
		seperateChar = appendDynamicOptions.arguments[0];
	}
	
	objDynamicOptions=event.srcElement;	
	objTextarea=event.srcElement.parentElement.parentElement.parentElement.firstChild.firstChild.firstChild;
	if(objDynamicOptions.selectedIndex>=0){
		if( objTextarea.value.substring(objTextarea.value.length-1)== seperateChar ){
			objTextarea.value+=objDynamicOptions.options[objDynamicOptions.selectedIndex].text;
		}else{
			if( objTextarea.value!="" )
				objTextarea.value+=seperateChar+objDynamicOptions.options[objDynamicOptions.selectedIndex].text;
			else
				objTextarea.value+=objDynamicOptions.options[objDynamicOptions.selectedIndex].text;
		}		
				
		// �����¼���֪ͨtextareaֵ���޸�
		try {
			var evt = document.createEventObject();        
	    evt.reason = 99;
			objTextarea.fireEvent('onchange', evt);
		}catch(ex) {
		}
	}
	window.event.cancelBubble = true;
}


//***************************
//ģ��������

//����objInput������objOptions
function getFullOptionsObject(objInput){
	objOptions=objInput.parentElement.lastChild.getElementsByTagName("SELECT")[0];
	return objOptions;
}

//�������ʾ��̬ѡ���б�
function showDynamicOptions(){
	bDisplayAll = false;
	
	//�ж���Դ
	if(event.srcElement.tagName=="IMG"){
		objInput=event.srcElement.parentElement.previousSibling.firstChild.firstChild.nextSibling;
		bDisplayAll = true;
	}else{
		objInput=event.srcElement;	
		if(showDynamicOptions.arguments.length>0) {
			if(showDynamicOptions.arguments[0]=="all")bDisplayAll=true;
		}
	}
	

	objValue=objInput.previousSibling;
	objOptions=objInput.parentElement.lastChild.getElementsByTagName("SELECT")[0];
	objDynamicOptions=objInput.parentElement.lastChild.previousSibling.firstChild;
	
	if(event.srcElement.tagName!="IMG"){
		if(event.keyCode==27){
			hiddenDynamicOptions(objDynamicOptions);
			return;
		}	
	}
	
	if(event.srcElement.tagName!="IMG"){
		if(event.keyCode==13 && objDynamicOptions.style.display==''){
			hiddenDynamicOptions(objDynamicOptions);
			return;
		}
	}else{
		//two click to hide
		if(objDynamicOptions.style.display==''){
			objDynamicOptions.style.display='none';
			objDynamicOptions.parentElement.style.display='none';
			return;
		}
	}
	
	objDynamicOptions.length=0;
	
	var optionsLen=objOptions.length;
	//var re=new RegExp("^"+objInput.value,"i")
	//var re=new RegExp(""+objInput.value,"i")
	var dynamicSize=0
	if(!bDisplayAll){
		for(i=0;i<optionsLen;i++){
			var strValue = objOptions.options[i].value;
			var strText = objOptions.options[i].text;
			if( strValue.indexOf(objInput.value)>=0 || strText.indexOf(objInput.value)>=0 ){
			//if(re.test(objOptions.options[i].value)==true || re.test(objOptions.options[i].text)==true){
				var objNewOption = objDynamicOptions.add(new Option(objOptions.options[i].text,objOptions.options[i].value));
				if(objInput.value!="" 
					&& (objOptions.options[i].value==objInput.value || objOptions.options[i].text==objInput.value) ){
				    objDynamicOptions.options[objDynamicOptions.length-1].selected=true;
					objInput.value=objOptions.options[i].text;
					objValue.value=objOptions.options[i].value;
				}else{
					objDynamicOptions.options[objDynamicOptions.length-1].selected=false;
				}
				dynamicSize++;
			}
		}
	}
	
	if(dynamicSize<=0){
		for(i=0;i<optionsLen;i++){
			objDynamicOptions.add(new Option(objOptions.options[i].text,objOptions.options[i].value));
			dynamicSize++;
		}
		objDynamicOptions.selectedIndex = -1;
	}
	
	objDynamicOptions.size = (dynamicSize>1)?Math.min(dynamicSize,10):2;
	if(dynamicSize>0){
		objDynamicOptions.style.display='';
		objDynamicOptions.parentElement.style.display='';		
		//objValue.value = objDynamicOptions.value;
	}else{	
		objDynamicOptions.style.display='none';
		objDynamicOptions.parentElement.style.display='none';
	}
	
	window.event.cancelBubble = true;
}

//�����ѡ�����ݻ���Ӧ��������
function enterDynamicOptions(){
	objInput=event.srcElement;
	objValue=event.srcElement.previousSibling;
	objDynamicOptions=event.srcElement.parentElement.lastChild.previousSibling.firstChild;
	e=event.keyCode;
	if(objDynamicOptions.style.display!='none'){
		if(e==13){
			if(objDynamicOptions.selectedIndex>=0){
				objInput.value=objDynamicOptions.options[objDynamicOptions.selectedIndex].text;
				objValue.value=objDynamicOptions.options[objDynamicOptions.selectedIndex].value;
			}
		}
		if(e==40) objDynamicOptions.focus();
	}
}

//�ж������Ƿ���ѡ����
function checkDynamicOptions(objInput,valueInOptions){
	objValue=objInput.previousSibling;
	objDynamicOptions=objInput.parentElement.lastChild.previousSibling.firstChild;
	objOptions=objInput.parentElement.lastChild.getElementsByTagName("SELECT")[0];
	
	if( objDynamicOptions==document.activeElement ) return false;
	
	if( valueInOptions!=true )return true;
	
	var optionsLen=objOptions.length;
	for(i=0;i<optionsLen;i++){
		if(objInput.value!="" 
			&& (objOptions.options[i].value==objInput.value || objOptions.options[i].text==objInput.value) ){
		//if(objOptions.options[i].text==objInput.value){
			objInput.value=objOptions.options[i].text;
			objValue.value=objOptions.options[i].value;
			return true;
		}
	}
	
	objInput.value="";
	objValue.value="";
	
	return true;
}

//ѡ���б�����
function selectDynamicOptions(){
	objDynamicOptions=event.srcElement;
	objInput=event.srcElement.parentElement.parentElement.firstChild.nextSibling;
	objValue=event.srcElement.parentElement.parentElement.firstChild;
	if(objDynamicOptions.selectedIndex>=0){
		objInput.value=objDynamicOptions.options[objDynamicOptions.selectedIndex].text;
		objValue.value=objDynamicOptions.options[objDynamicOptions.selectedIndex].value;
		hiddenDynamicOptions(objDynamicOptions)
	}
	// �����¼���֪ͨcomboboxֵ���޸�
	try {
		var evt = document.createEventObject();        
    //evt.reason = 99;
		objInput.fireEvent('onchange', evt);
	}catch(ex) {
	}
	window.event.cancelBubble = true;
}

//���ض�̬�б�
function hiddenDynamicOptions(objDynamicOptions){
	objDynamicOptions.style.display='none';
	objDynamicOptions.parentElement.style.display='none';
}

//�������ж�̬�б�
function hiddenAllDynamicOptions(){

	var objSelects = document.getElementsByTagName("SELECT");
	for(i=0;i<objSelects.length;i++){
		if(objSelects[i].dynamicOptions=="yes"){
			objSelects[i].style.display='none';
			objSelects[i].parentElement.style.display='none';
		}
	}
}

document.onclick=function(){
	hiddenAllDynamicOptions()
}

//***************************
//displaytag��ҳ����

//displaytag pagingbar��֧��pagesize���ã�js�ֹ�����pagesize
function adjustPageSizeDisplay(){
	try{
		var tmpWadDisplayTagCurrHref = location.href;
		var re;
		//affair/test/vdm_example_list_include.action?wadCurrentPage=2&wadPageSize=7
		re = /wadPageSize=\d*/i;
		var tmpWadDisplayTagCurrPageSize = tmpWadDisplayTagCurrHref.match(re);
	
	  if(tmpWadDisplayTagCurrPageSize!=null){
	  	tmpWadDisplayTagCurrPageSize = tmpWadDisplayTagCurrHref.substring(tmpWadDisplayTagCurrPageSize.index+12,tmpWadDisplayTagCurrPageSize.lastIndex);
	  	tmpWadDisplayTagCurrPageSize = tmpWadDisplayTagCurrPageSize.replace(/\D/g,"");
//alert(document.all.wadDisplayTagPageSize);
	  	if(document.all.wadDisplayTagPageSize.length == undefined){
		  	document.all.wadDisplayTagPageSize.value = tmpWadDisplayTagCurrPageSize;
	  	}else{
	  	  for(i=0;i< document.all.wadDisplayTagPageSize.length;i++){
	  	  	document.all.wadDisplayTagPageSize[i].value = tmpWadDisplayTagCurrPageSize;
	  	  }
	  	}
	  }
	}catch(e){//alert(e);
	}
}

//��ת��ָ��ҳ
function gotoDisplayTagSpecOfPage(urlTemplate,currpage,totalpage){
	
	//�ҵ�ҳ�������
	var objEvent = event.srcElement;
	var objPageNum = "";
	var objPageSize = "";
	var iMaxLoopNum = 10;
	while( iMaxLoopNum>0 ){
		if( objEvent.type == "text" ){
			if(objEvent.id == "wadDisplayTagPageSize"){
				objPageSize = objEvent;
			}else{
				objPageNum = objEvent;
			}
		}
		if( objPageNum.type == "text" )break;
		objEvent = objEvent.previousSibling;
		iMaxLoopNum--;
	}	
	
	var nextHref = "";
	
	//����pageSize
	if( objPageSize.type == "text"){
		objPageSize.value = objPageSize.value.replace(/\D/g,"");
		pagesize = objPageSize.value;
	  //alert("pagesize is " + pagesize);
	  
	  if (pagesize!=""){
			if (valueIsNum(objPageSize)){
				pagesize=parseInt(pagesize,10);
				oldpagesize = "";
				var re;
				//affair/test/vdm_example_list_include.action?wadCurrentPage=2&wadPageSize=7
				re = /wadPageSize=\d*/i;
				var r_match = urlTemplate.match(re);
			  if(r_match!=null)oldpagesize = urlTemplate.substring(r_match.index+12,r_match.lastIndex);
			  oldpagesize = oldpagesize.replace(/\D/g,"");
			  oldpagesize=parseInt(oldpagesize,10);
			  
				if (pagesize>0 && oldpagesize!=pagesize ){
					re = /wadPageSize=\d*/g;
					nextHref = urlTemplate.replace(re,"wadPageSize=" + pagesize);
					if(nextHref==urlTemplate){
						if(urlTemplate.indexOf("?")){
							nextHref = urlTemplate + "&wadPageSize=" + pagesize;
						}else{
							nextHref = urlTemplate + "?wadPageSize=" + pagesize;
						}
					}
					re = /wadCurrentPage=\d*/g;
					nextHref = nextHref.replace(re,"wadCurrentPage=1");
					//alert(nextHref);
					location.href = nextHref;
					return;
				}
			}
	  }	
	}
	
	//������ת��ָ��ҳ
	if( objPageNum.type == "text"){
		objPageNum.value = objPageNum.value.replace(/\D/g,"");
		gotopage = objPageNum.value;
	  //alert("goto page " + gotopage);
	  
	  if (gotopage!=""){
			if (valueIsNum(objPageNum)){
				gotopage=parseInt(gotopage,10);
				if (gotopage==0){
					gotopage=1;
				}
				
				totalpage = totalpage.replace(/\D/g,"");
				
				totalpage=parseInt(totalpage)
				var page=gotopage<totalpage?gotopage:totalpage;
				//affair/test/vdm_example_list_include.action?wadCurrentPage=2&wadPageSize=7
				var re;
				re = /wadCurrentPage=\d*/g;
				nextHref = urlTemplate.replace(re,"wadCurrentPage=" + page);
				//alert(nextHref);
				location.href = nextHref;
			}
	  }	
	}
}

//����б�ȫѡcheckbox
function checkAll(objName){
	var obj = document.getElementsByName(objName);
	for (var i=0;i<obj.length;i++){
		obj.item(i).checked = event.srcElement.checked;
	}
}
//-->





