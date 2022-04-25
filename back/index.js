const express = require("express")
const app = express()

//上传进度
let loading = 0


app.use(express.static('../code'))

app.post('/api/upload', (req,res)=>{
	console.log("收到了upload请求")

	let interval = setInterval(()=>{
		if(loading == 100) {
			clearInterval(interval)
			//upload完成后开始检测
			startTesting()
		}
		else loading += 2
		console.log(loading)
	}, 50)

	res.send("success")
})
app.post('/api/uploadstatus', (req, res)=>{
	console.log("收到查询upload进度请求")
	res.send(loading + '')
	//清空进度
	if(loading >= 100){
		setTimeout(()=>{
			loading = 0
		}, 1000)
	}
})
app.post('/api/teststatus', (req, res)=>{
	// console.log("收到查询test进度请求")
	res.send(testing)
})
app.post('/api/reset', (req, res)=>{
	testing.fill(0)
	console.log("测试状态清零")
})

app.listen(80, ()=>{
    console.log('running at http://localhost')
})

//检查进度
let testing = [
	0, //正式开始
	0, //测试文件转PDF完成
	0, //读取测试文件完成
	0, //读取模板文件完成
	0, //文件标题识别完成
	0, //新建错误报告
	0, //页面布局检测完成
	0, //封面检测完成
	0, //记录封面个数
	0, //正文检测完成
	0, //页眉检测完成
	0, //页脚检测完成
	0, //页码检测完成
	0, //批注插入完成 批注数量...
	0, //错误量...
	0, //拼写检查1
	0, //拼写检查2
	0, //拼写检查3
	0, //拼写检查4
	0, //拼写检查5
]
//完成时间
let finishTime = [
	200,     //正式开始
	2000,    //测试文件转PD
	3000,    //读取测试文件
	4000,    //读取模板文件
	4100,    //文件标题识别
	4200,    //新建错误报告
	8000,    //页面布局检测
	9000,    //封面检测完成
	9500,    //记录封面个数
	12000,   //正文检测完成
	13000,   //页眉检测完成
	15000,   //页脚检测完成
	16000,    //页码检测完成
	20000,    //批注插入完成
	21000,    //错误量...
	25000,    //拼写检查1
	22000,    //拼写检查2
	26000,    //拼写检查3
	24000,    //拼写检查4
	23000    //拼写检查5
]
let finishTime_short = [
	300,     //正式开始
	600,    //测试文件转PD
	900,    //读取测试文件
	1200,    //读取模板文件
	1500,    //文件标题识别
	1800,    //新建错误报告
	2100,    //页面布局检测
	2400,    //封面检测完成
	2700,    //记录封面个数
	3000,   //正文检测完成
	3300,   //页眉检测完成
	3600,   //页脚检测完成
	3900,    //页码检测完成
	4200,    //批注插入完成
	4500,    //错误量...
	4800,    //拼写检查1
	5100,    //拼写检查2
	5400,    //拼写检查3
	5700,    //拼写检查4
	6000    //拼写检查5
]
let startTesting = ()=>{
	for(let i in finishTime_short){
		setTimeout(()=>{
			testing[i] = 1
		}, finishTime[i])
	}
}