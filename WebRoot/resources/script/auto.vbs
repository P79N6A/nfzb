'����Excel����������Range��ֵ
'@param workSheet Excel��WorkSheet����
'@param tagName Range������
'@param tagValue Range�е�ֵ
Sub replaceTagExcel( workSheet , tagName , tagValue )
   set tagRange = workSheet.Range( tagName ) 
   tagRange.Value = tagValue 
End Sub

'��ҳ���еı���滻Excel����������Range
'@param workSheet Excel��WorkSheet����
'@param tagName Range������
'@param table ҳ���е�Table����
'@param startRow Table��ʼ�����滻���кţ��кŴ�0�㿪ʼ��
'@param endRow Table��ʼ�����滻���кţ����ΪTable������-1��
'@param startCol Table��ʼ�����滻���кţ��кŴ�0�㿪ʼ��
'@param endCol Table��ʼ�����滻���кţ����ΪTable������-1��
Sub replaceLoopTagExcel( workSheet , tagName , table , startRow , endRow , startCol , endCol )
  set tagRange = workSheet.Range( tagName ) 
  dim loopRange 
	set loopRange = tagRange
	for i= startRow to  endRow
	   for j=startCol to  endCol
		loopRange(1 , j ).value = table.rows(i).cells(j).innerText    	
	   next
        if ( i <> endRow ) then 
        	tagRange.copy
		loopRange.insert 2
	end if
        next
End Sub

'�滻Word�ļ��е�Ӧ���滻��
'@param document Word�е�document����
'@param tagName �滻��������
'@param tagValue �滻����ֵ
Sub replaceTag(document , tagName , tagValue )
    Dim replaceRange 
    
    Set replaceRange = document.Content
    replaceRange.Find.Execute tagName, , , , , , True

    If (replaceRange.Find.Found = True) Then
        replaceRange.Text = tagValue
    End If
End Sub


'ѭ���滻Word�е�Ӧ���滻��
'ѭ���滻��ָ�滻�ڡ�Start���͡�End������ѭ�����Ʒ�֮��Ӧ���滻����ֵ
'@param document Word�е�document����
'@param startTagName ѭ����ʼ��ʶ
'@param endTagName ѭ��������ʶ
'@param tagNames �滻�������ֵ�����
'@param tagValue �滻����ֵ�����飨������Ҫ���ֺ���������һ�£�
'@param isLastOne �Ƿ������һ���ѭ���滻��Ϊ��������(True|False)
Sub replaceLoopTag(document , startTagName , endTagName , tagNames, tagValues, isLastOne )
    Dim copyRange 
    Dim startRange
    Dim endRange 
    Dim replaceRange 
    Dim pastePos 
    pastePos = 0

    Set startRange = document.Content
    startRange.Find.Execute startTagName, , , , , , True
    Set endRange = document.Content
    endRange.Find.Execute endTagName, , , , , , True
    
    If ((startRange.Find.Found = True) And (endRange.Find.Found = True)) Then
        Set copyRange = document.Range(startRange.Start, endRange.End)
        copyRange.Copy
        startRange.Text = ""
    End If
    
    For i = 0 To UBound(tagNames) - 1
        Set replaceRange = document.Content
        replaceRange.Find.Execute tagNames(i)
        If (replaceRange.Find.Found = True) Then
            replaceRange.Text = tagValues(i)
        End If
    Next
           Dim pasteRange 
        Set pasteRange = document.Content
        pasteRange.Find.Execute endTagName, , , , , , True
    
    If (pasteRange.Find.Found = True) Then
        If (isLastOne <> True) Then
                pasteRange.Paste
        Else
                pasteRange.Text = ""
        End If
    End If
End Sub

'������Tag֮���������գ�����StartTag��EndTag����
'@param document Word�е�document����
'@param startTagName ��ʼ��ʶ
'@param endTagName ������ʶ
'@param mode ���ģʽ 
'            1 ������Tag֮���������գ�����StartTag��EndTag����
'            2 ������Tag��գ�������StartTag��EndTag����
'            3 ������Tag���
Sub clearTags(document , startTagName , endTagName , mode)
    Dim startRange
    Dim endRange 
    Dim clearRange
    
    Set startRange = document.Content
    startRange.Find.Execute startTagName, , , , , , True
    Set endRange = document.Content
    endRange.Find.Execute endTagName, , , , , , True
    If ( mode = 1 ) Then 
    	Set clearRange = document.Range( startRange.Start , endRange.End)
    	clearRange.Text = "" 
    ElseIf ( mode = 2 ) Then 
    	Set clearRange = document.Range( startRange.End , endRange.Start)
    	clearRange.Text = "" 
    Else
    	startRange.Text = "" 
	endRange.Text = "" 
    End If	
End Sub 
