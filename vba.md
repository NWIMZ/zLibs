# 宏 -- 一小时从入门到精通
> Sub 模块名

```vb
Sub module()
```

> Dim 变量声明

As

workbook

String

Long

```vb
Dim Variable1, Variable2

Dim wb As workbook

Dim str As String

Dim Num As Long

```

> 循环

```vb
Num = 0
Do While 
Num ++ 
Loop
```

```vb
Dim num = 1;
For i = 0 to 100 
num = num + num;
Next
```



> 停止屏幕刷新

Application.ScreenUpdating = False

> 获取当前工作文件路径

nowPath = ActiveWorkbook.path

> 获取当前BookName

nowBookName = ActiveWorkbook.Name

