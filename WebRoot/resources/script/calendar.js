// һ���򵥵Ĳ����Ƿ�IE������ı��ʽ
isIE = (document.all ? true : false);

// �õ�IE�и�Ԫ��������λ��������ʹ���Ԫ����һ�������
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

function getXBrowserRef(eltname) {
 return (isIE ? document.all[eltname].style : document.layers[eltname]);
}

function hideElement(eltname) { getXBrowserRef(eltname).visibility = 'hidden'; }

// ����ͬ����������д���Ԫ����λ��
function moveBy(elt,deltaX,deltaY) {
 if (isIE) {
  elt.left = elt.pixelLeft + deltaX;
  elt.top = elt.pixelTop + deltaY;
 } else {
  elt.left += deltaX;
  elt.top += deltaY;
 }
}

function toggleVisible(eltname) {
 elt = getXBrowserRef(eltname);
 if (elt.visibility == 'visible' || elt.visibility == 'show') {
   elt.visibility = 'hidden';
 } else {
   fixPosition(eltname);
   elt.visibility = 'visible';
 }
}

function setPosition(elt,positionername,isPlacedUnder) {
 positioner = null;
 if (isIE) {
  positioner = document.all[positionername];
  elt.left = getIEPosX(positioner)+2;
  elt.top = getIEPosY(positioner)+22;
 } else {
  positioner = document.images[positionername];
  elt.left = positioner.x+2;
  elt.top = positioner.y+22;
 }
 if (isPlacedUnder) { moveBy(elt,0,positioner.height); }
}



//����������������������������������������������������������������������������

         // �ж������
         isIE = (document.all ? true : false);

         // ��ʼ�·ݼ����·���������
         var months = new Array(" 1��", " 2��", " 3��", " 4��", " 5��", " 6��", " 7��",
	 " 8��", " 9��", "10��", "11��", "12��");
         var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31,
            30, 31, 30, 31);
	 var displayMonth = new Date().getMonth();
	 var displayYear = new Date().getFullYear();
	 var displayDivName;
	 var displayElement;

         function getDays(month, year) {
            //����ѡ�������Ƿ������ꣿ
            if (1 == month)
               return ((0 == year % 4) && (0 != (year % 100))) ||
                  (0 == year % 400) ? 29 : 28;
            else
               return daysInMonth[month];
         }

         function getToday() {
            // �õ����������
            this.now = new Date();
            this.year = this.now.getFullYear();
            this.month = this.now.getMonth();
            this.day = this.now.getDate();
         }

         // ����ʾ��������·ݵ�����
         today = new getToday();

         function newCalendar(eltName,attachedElement) {
	    if (attachedElement) {
	       if (displayDivName && displayDivName != eltName) hideElement(displayDivName);
	       displayElement = attachedElement;
	    }
	    displayDivName = eltName;
            today = new getToday();
            var parseYear = parseInt(displayYear + '');
            var newCal = new Date(parseYear,displayMonth,1);
            var day = -1;
            var startDayOfWeek = newCal.getDay();
            if ((today.year == newCal.getFullYear()) &&
                  (today.month == newCal.getMonth()))
	    {
               day = today.day;
            }
            var intDaysInMonth =
               getDays(newCal.getMonth(), newCal.getFullYear());
            var daysGrid = makeDaysGrid(startDayOfWeek,day,intDaysInMonth,newCal,eltName)
	    if (isIE) {
	       var elt = document.all[eltName];
	       elt.innerHTML = daysGrid;
	    } else {
	       var elt = document.layers[eltName].document;
	       elt.open();
	       elt.write(daysGrid);
	       elt.close();
	    }
	 }

	 function incMonth(delta,eltName) {
	   displayMonth += delta;
	   if (displayMonth >= 12) {
	     displayMonth = 0;
	     incYear(1,eltName);
	   } else if (displayMonth <= -1) {
	     displayMonth = 11;
	     incYear(-1,eltName);
	   } else {
	     newCalendar(eltName);
	   }
	 }

	 function incYear(delta,eltName) {
	   displayYear = parseInt(displayYear + '') + delta;
	   newCalendar(eltName);
	 }

	 function makeDaysGrid(startDay,day,intDaysInMonth,newCal,eltName) {
	    var daysGrid;
	    var month = newCal.getMonth();
	    var year = newCal.getFullYear();
	    var isThisYear = (year == new Date().getFullYear());
	    var isThisMonth = (day > -1)
	    daysGrid = '<table width=190 border=0 cellspacing=1 cellpadding=0 class=bgcbk><tr><td class=cbgc0 colspan=7 align=center height=18><img src=../images/c.gif width=1 height=2><br><table width="98%" border="0" cellspacing="0" cellpadding="0"><tr><td width="5%">&nbsp;</td><td width="76%"><div align="center">';
	    
	    daysGrid += '<a href="javascript:incYear(-1,\'' + eltName + '\')"><img src=../images/cl03.gif width=6 height=9 alt="��ǰ��ҳ" border=0></a> ';

	    if (isThisYear) { daysGrid += '<font color=red>' + year + '��</font>'; }
	    else { daysGrid += ''+year+ '��'; }

	    daysGrid += ' <a href="javascript:incYear(1,\'' + eltName + '\')"><img src=../images/cl04.gif width=6 height=9 alt="���ҳ" border=0></a> ';
	    
	    daysGrid += ' <a href="javascript:incMonth(-1,\'' + eltName + '\')"><img src=../images/cl03.gif width=6 height=9 alt="��ǰ��ҳ" border=0></a> ';
	    if (isThisMonth) { daysGrid += '<font color=red>' + months[month] + '</font>'; }
	    else { daysGrid += months[month]; }
	    daysGrid += ' <a href="javascript:incMonth(1,\'' + eltName + '\')"><img src=../images/cl04.gif width=6 height=9 alt="���ҳ" border=0></a></td>';

		daysGrid += '<td width="19%"><div align="right"><a href="javascript:hideElement(\'' + eltName + '\')"><img src="../images/x.gif" width="18" height="15" hspace="6" alt="�ر�" border="0"></a></div></td></tr></table></td></tr>';
	    
	    daysGrid += '<tr align=center class=bgcw><td height=18 class=f12c1><b>��</b></td><td height=18 class=><b>һ</b></td><td height=18 class=><b>��</b></td><td height=18 class=><b>��</b></td><td height=18 class=><b>��</b></td><td height=18 class=><b>��</b></td><td height=18 class=f12c1><b>��</b></td></tr>';
	    
	    var dayOfMonthOfFirstSunday = (7 - startDay + 1);
	    for (var intWeek = 0; intWeek < 6; intWeek++) {
	       daysGrid += '<tr align=center class=bgcw>';
	       var dayOfMonth;
	       for (var intDay = 0; intDay < 7; intDay++) {
	         dayOfMonth = (intWeek * 7) + intDay + dayOfMonthOfFirstSunday - 7;
		 if (dayOfMonth <= 0) {
	           daysGrid += "<td height=18>&nbsp;</td>";
		 } else if (dayOfMonth <= intDaysInMonth) {
		   var color = "blue";
		   if (day > 0 && day == dayOfMonth) color="red";
		   daysGrid += '<td height=18><a href="javascript:setDay(';
		   daysGrid += dayOfMonth + ',\'' + eltName + '\')" '
		   daysGrid += 'style="color:' + color + '">';
		   var dayString = dayOfMonth + "</a></td> ";
		   if (dayString.length == 6) dayString = '0' + dayString;
		   daysGrid += dayString;
		 }else{
	       	 daysGrid += "<td height=18>&nbsp;</td>";
	       	 //alert("dayOfMonth="+dayOfMonth);
	       	 //alert("intDaysInMonth="+intDaysInMonth);	       	 
	       }
	     }
	       if (dayOfMonth < intDaysInMonth) daysGrid += "</tr>";
	    }
	    return daysGrid + "</table>";
	 }

	 function setDay(day,eltName) {
	   if(displayMonth<9)
	   {
	   	if(day<10)
	   	{
	   		displayElement.value = displayYear + "-0" +(displayMonth + 1) + "-0" + day  ;
	   	}
	   	else
	   	{
	   		displayElement.value = displayYear + "-0" +(displayMonth + 1) + "-" + day  ;
	   	}
	   }
	   else
	   {
	   	if(day<10)
	   	{
	   		displayElement.value = displayYear + "-" +(displayMonth + 1) + "-0" + day  ;
	   	}
	   	else
	   	{
	   		displayElement.value = displayYear + "-" +(displayMonth + 1) + "-" + day  ;
	   	}
	   }
	   
	   hideElement(eltName);
	 }


//����������������������������������������������������������������������������

<!--
// fixPosition() ���������ǰ���������Ǹ�����һ��
//
function fixPosition(eltname) {
 elt = getXBrowserRef(eltname);
 positionerImgName = eltname + 'Pos';
 // hint: try setting isPlacedUnder to false
 isPlacedUnder = false;
 if (isPlacedUnder) {
  setPosition(elt,positionerImgName,true);
 } else {
  setPosition(elt,positionerImgName)
 }
}

function toggleDatePicker(eltName,formElt) {
  var x = formElt.indexOf('.');
  var formName = formElt.substring(0,x);
  //alert("formName="+formName);
  var formEltName = formElt.substring(x+1);
  newCalendar(eltName,document.forms[formName].elements[formEltName]);
  toggleVisible(eltName);
}

// fixPositions() �������ǰ��Ҳ����
function fixPositions()
{
 fixPosition('daysOfMonth');
 fixPosition('daysOfMonth2');
}

// -->