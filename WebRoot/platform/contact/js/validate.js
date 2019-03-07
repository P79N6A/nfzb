/** FUNCTION---------------------------------------------trim
���ܣ�
	ȥ���ַ������˵Ŀո�
������
	String	str �ַ���
���أ�
	String	ȥ�����˿ո���ַ���
*/
function trim(str)
{
	var left = 0;
	var right = -1;
	for(i=0;i<str.length;i++)
		if(str.charAt(i)!=" ")
		{
			left = i;
			break;
		}
	for(i=str.length-1;i>=0;i--)
		if(str.charAt(i)!=" ")
		{
			right = i+1;
			break;
		}
	return str.substring(left,right);
}

/** FUNCTION---------------------------------------------isNotBlank
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ��
������
	Object	obj ��ǩ����
	boolean	�Ƿ���ȥ���ַ������˵Ŀո�
���أ�
	boolean	����ֵ�Ƿ�Ϊ��
*/
function isNotBlank(obj,isSpaceFilter)
{
	if(isSpaceFilter)
		obj.value = trim(obj.value);
	return obj.value!=""
}

/** FUNCTION---------------------------------------------isNotBlankEx
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ�գ�ȥ���ַ������˵Ŀո�
������
	Object	obj ��ǩ����
���أ�
	boolean	����ֵ�Ƿ�Ϊ��
*/
function isNotBlankEx(obj)
{
	return isNotBlank(obj,true);
}

/** FUNCTION---------------------------------------------isNumber
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ��ֵ
������
	Object	obj ��ǩ����
���أ�
	boolean	����ֵ�Ƿ�Ϊ��ֵ
*/
function isNumber(obj)
{
	obj.value = trim(obj.value);
	return !isNaN(obj.value)
}

/** FUNCTION---------------------------------------------isInteger
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ����
������
	Object	obj ��ǩ����
���أ�
	boolean	����ֵ�Ƿ�Ϊ����
*/
function isInteger(obj)
{
	if(!isNumber(obj))
		return false;
	if(parseInt(obj.value,10)==parseFloat(obj.value))
		return true;
	else
		return false;
}

/** FUNCTION---------------------------------------------isBetween
���ܣ�
	�ж�����ֵ�Ƿ���һ������
������
	Object	obj ��ǩ����
	float	nMin ��߽�ȡֵ
	boolean	isContainMin �Ƿ���߽�Ϊ������
	float	nMax �ұ߽�ȡֵ
	boolean isContainMax �Ƿ��ұ߽�Ϊ������
���أ�
	boolean	����ֵ�Ƿ���һ������
*/
function isBetween(obj,nMin,isContainMin,nMax,isContainMax)
{
	if(!isNumber(obj))
		return false;
	var result = parseFloat(obj.value);
	var condition1 = (result>nMin && !isContainMin) || (result>=nMin && isContainMin);
	var condition2 = (result<nMax && !isContainMax) || (result<=nMax && isContainMax);
	if(condition1 && condition2)
		return true;
	else
		return false;
}

/** FUNCTION---------------------------------------------isBetweenEx
���ܣ�
	�ж�����ֵ�Ƿ���һ�����ڣ���߽�Ϊ�����䣬�ұ߽�Ϊ�����䣩
������
	Object	obj ��ǩ����
	float	nMin ��߽�ȡֵ
	float	nMax �ұ߽�ȡֵ
���أ�
	boolean	����ֵ�Ƿ���һ������
*/
function isBetweenEx(obj,nMin,nMax)
{
	return isBetween(obj,nMin,true,nMax,true);
}

/** FUNCTION---------------------------------------------isAbove
���ܣ�
	�ж�����ֵ�Ƿ����ĳһ��ֵ
������
	Object	obj ��ǩ����
	float	nMin ��߽�ȡֵ
	boolean isContainMin �Ƿ���߽�Ϊ������
���أ�
	boolean	����ֵ�Ƿ�С��ĳһ��ֵ
*/
function isAbove(obj,nMin,isContainMin)
{
	if(!isNumber(obj))
		return false;
	var result = parseFloat(obj.value);
	if(result>nMin && !isContainMin || result>=nMin && isContainMin)
		return true;
	else
		return false;
}

/** FUNCTION---------------------------------------------isAboveEx
���ܣ�
	�ж�����ֵ�Ƿ����ĳһ��ֵ����߽�Ϊ�����䣩
������
	Object	obj ��ǩ����
	float	nMin ��߽�ȡֵ
	boolean isContainMin �Ƿ���߽�Ϊ������
���أ�
	boolean	����ֵ�Ƿ�С��ĳһ��ֵ
*/
function isAboveEx(obj,nMin)
{
	return isAbove(obj,nMin,true);
}

/** FUNCTION---------------------------------------------isLengthBetween
���ܣ�
	�ж�����ֵ�����Ƿ���һ��������
������
	Object	obj ��ǩ����
	int		nMin ������߽�
	int		nMax �����ұ߽�
���أ�
	boolean	����ֵ�����Ƿ���һ��������
*/
function isLengthBetween(obj,nMin,nMax)
{
	obj.value = trim(obj.value);
	if(obj.value.length>=nMin && obj.value.length<=nMax)
		return true;
	else
		return false;
}

/** FUNCTION---------------------------------------------isLengthBelow
���ܣ�
	�ж�����ֵ�����Ƿ�С��ĳһֵ
������
	Object	obj ��ǩ����
	int		nMax �����ұ߽�
���أ�
	boolean	����ֵ�����Ƿ�С��ĳһֵ
*/
function isLengthBelow(obj,nMax)
{
	return isLengthBetween(obj,0,nMax);
}

/* FUNCTION---------------------------------------------isBelow
���ܣ�
	�ж�����ֵ�Ƿ�С��ĳһ��ֵ
������
	Object	obj ��ǩ����
	float	nMax �ұ߽�ȡֵ
	boolean isContainMax �Ƿ��ұ߽�Ϊ������
���أ�
	boolean	����ֵ�Ƿ�С��ĳһ��ֵ
*/
function isBelow(obj,nMax,isContainMax)
{
	if(!isNumber(obj))
		return false;
	var result = parseFloat(obj.value);
	if(result<nMax && !isContainMax || result<=nMax && isContainMax)
		return true;
	else
		return false;
}

/* FUNCTION---------------------------------------------isBelowEx
���ܣ�
	�ж�����ֵ�Ƿ�С��ĳһ��ֵ���ұ߽�Ϊ�����䣩
������
	Object	obj ��ǩ����
	float	nMax �ұ߽�ȡֵ
	boolean isContainMax �Ƿ��ұ߽�Ϊ������
���أ�
	boolean	����ֵ�Ƿ�С��ĳһ��ֵ
*/
function isBelowEx(obj,nMax)
{
	return isBelow(obj,nMax,true);
}

/* FUNCTION---------------------------------------------isPositiveNumber
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ����
������
	Object	obj ��ǩ����
	boolean isContainZero �Ƿ�������Ϊ�Ϸ�
���أ�
	boolean	����ֵ�Ƿ�Ϊ����
*/
function isPositiveNumber(obj,isContainZero)
{
	return isAbove(obj,0,isContainZero);
}

/* FUNCTION---------------------------------------------isPositiveNumberEx
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ������������Ϊ�Ϸ���
������
	Object	obj ��ǩ����
���أ�
	boolean	����ֵ�Ƿ�Ϊ����
*/
function isPositiveNumberEx(obj)
{
	return isPositiveNumber(obj,true);
}

/* FUNCTION---------------------------------------------isStandardDate
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ�Ϸ����������ͣ���ʽΪyyyy?mm?dd������ݱ���Ϊ[1000,9999]��
������
	Object	obj ��ǩ����
	String	conjunction Ϊ�����յ����ӷ�������Ϊ1��
���أ�
	boolean	����ֵ�Ƿ�Ϊ�Ϸ�����������
*/
function isStandardDate(obj,conjunction)
{
	obj.value = trim(obj.value);
	if(obj.value=="")
	    return true;
	if(obj.value.charAt(4)!=conjunction || obj.value.charAt(7)!=conjunction)
		return false;
	var year = obj.value.substring(0,4);
	var month = obj.value.substring(5,7);
	var day = obj.value.substring(8,10);
	var condition1 = isNaN(year) || isNaN(month) || isNaN(day);
	var condition2 = parseInt(year,10)!=parseFloat(year) || parseInt(month,10)!=parseFloat(month) || parseInt(day,10)!=parseFloat(day)
	if(condition1 || condition2)
		return false;
	var d = new Date();
	d.setFullYear(parseInt(year,10));
	d.setMonth(parseInt(month,10)-1);
	d.setDate(parseInt(day,10));
	year = d.getFullYear();
	month = d.getMonth()+1;
	day = d.getDate();
	var temp = year+conjunction;
	if(month<10)
		temp+="0";
	temp+=month+conjunction;
	if(day<10)
		temp+="0";
	temp+=day;
	if(obj.value==temp)
		return true;
	else
		return false;
}

/* FUNCTION---------------------------------------------isStandardDate
���ܣ�
	�ж�����ֵ�Ƿ�Ϊ�Ϸ����������ͣ���ʽΪyyyy?mm������ݱ���Ϊ[1000,9999]��
������
	Object	obj ��ǩ����
	String	conjunction Ϊ���µ����ӷ�������Ϊ1��
���أ�
	boolean	����ֵ�Ƿ�Ϊ�Ϸ�����������
*/
function isStandardYM(obj,conjunction)
{
	obj.value = trim(obj.value);
	if(obj.value=="")
	    return false;
	if(obj.value.charAt(4)!=conjunction)
		return false;
	var year = obj.value.substring(0,4);
	var month = obj.value.substring(5,7);
	var condition1 = isNaN(year) || isNaN(month);
	var condition2 = parseInt(year,10)!=parseFloat(year) || parseInt(month,10)!=parseFloat(month)
	if(condition1 || condition2)
		return false;

}

/* FUNCTION---------------------------------------------preview
���ܣ��򵥲�ѯ�����ѡ��
������fname form����
	  flag   1:���value 0:�����value
���أ���
��ע��select contField��˳���contValue˳��һֱ
*/
function changesel(fname,flag){
	var i=0;
	theform = eval(fname);
	for(i;i < theform.condValue.length;i++){
	 	theform.condValue[i].style.display = "none";
	 	theform.condValue[i].disabled = true;
	}
		//alert("aa");
		//alert("theform.condField="+theform.condField);
		//alert("theform.condField.selectedIndex="+theform.condField.selectedIndex);
		theform.condValue[theform.condField.selectedIndex].style.display = "";
		//alert("bb");
		theform.condValue[theform.condField.selectedIndex].disabled = false;
	if(flag==1)
		theform.condValue[theform.condField.selectedIndex].value = "";
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

/* FUNCTION---------------------------------------------submitConfirm
���ܣ�
	��ȷ�ϲ���ǰ������ʾ��Ϣ����ȷ���Ƿ�ȷ��Ҫִ�в�����
������
	String msg ��ʾ��Ϣ
	String url ��Ҫ����ĵط���Ҫ�ݽ���form����
	int urlType 0:url   1:form name	2:window.open url
���أ���
*/
function submitConfirm(msg,url,urlType){
	var agree;
	agree = confirm(msg);
	if(agree == true && urlType==0) //ѡ��ȷ��
		window.location = url;
	if(agree == true && urlType==1) //ѡ��ȷ��		
		eval(url).submit();
	if(agree == true && urlType==2) //ѡ��ȷ��		
		window.open(url);
}


/* FUNCTION---------------------------------------------isLengthEqual
���ܣ�
	�ж�����ֵ�����Ƿ�Ϊĳһֵ
������
	Object	obj ��ǩ����
	int		n �ַ������볤��
���أ�
	boolean	����ֵ�����Ƿ�Ϊĳһֵ
*/
function isLengthEqual(obj,n)
{
	return isLengthBetween(obj,n,n);
}


//ˢ�¸����ڣ����⡰���ԡ�ĳ��ֱ
function OpenerReload(){
   if(window.opener && !window.opener.closed){
	if(window.opener.document.condForm!=null)
		window.opener.document.condForm.submit();
	else if(window.opener.document.form1!=null)
		window.opener.document.form1.submit();
	else if(window.opener.document.conditionForm!=null)
		window.opener.document.conditionForm.submit();
	else if(window.opener.document.title!=null)
		window.opener.document.title.submit();
	else
		window.opener.location.reload();
    }
}