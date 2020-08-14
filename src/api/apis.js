import axios from 'axios'
// 请求基本路径
axios.defaults.baseURL = "http://127.0.0.1:5000"

//1.登录API
// account 账号
// password 密码
export var login = (account, password) => axios.post("/users/checkLogin", { account, password })

// 2.添加账号
// account 账号
// password 密码
// userGroup 用户组
export var userAdd = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })

// 3.获取账号列表
//currentPage  当前页码
//pageSize  每页条数
export var userList = (currentPage, pageSize) => axios.get("/users/list", { params: { currentPage, pageSize } })

// 4.删除账号
// id 账号的id
export var reUser = (id) => axios.get("/users/del", { params: { id } })

// 5.批量删除账号
//ids  要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export var batchdel = (ids) => axios.get("/users/batchdel", { params: { ids } })

// 6.修改账号
// id 账号的id
// account 账号
// userGroup 用户组
export var changeUser = (id, account, userGroup) => axios.post("/users/edit", { id, account, userGroup })

// 7.检查旧密码是否正确
// oldPwd	旧密码
// id  账号的id
export var checkOldpass = (oldPwd, id) => axios.get("/users/checkoldpwd", { params: { oldPwd, id } })

//8.修改密码
//newPwd 新密码
// id  帐号id
export var changePwd = (newPwd, id) => axios.post("/users/editpwd", { newPwd, id })

// 9.获取账号（个人中心）信息
// id  帐号id
export var accountinfo = (id) => axios.get("/users/accountinfo", { params: { id } })

// 10.头像上传接口
// id  帐号id
export var avatar_upload = (id) => axios.post("/users/avatar_upload", { id })

//11.验证token   token：用户令牌
export var token = (token) => axios.get("/users/checktoken", { params: { token } })

// 12.添加分类
// cateName   分类名称
// state true\false  是否启用
export var addcate = (cateName, state) => axios.post("/goods/addcate", { cateName, state })

// 13.获取分类
//currentPage  当前页码
//pageSize  每页条数
export var catelist = (currentPage, pageSize) => axios.get("/goods/catelist", { params: { currentPage, pageSize } })

// 14.删除分类
// id 分类id
export var delcate = (id) => axios.get("/goods/delcate", { params: { id } })

// 15.修改分类
//id  分类id
// cateName 分类名称
export var editcate = (id, cateName, state) => axios.post("/goods/editcate", { id, cateName, state })

// 16.查询所有分类名称 
export var categories = () => axios.get("/goods/categories", { params: {} })

// 17.商品图片上传接口 
export var img_upload = () => axios.post("/goods/goods_img_upload", {})

// 18.添加商品
// name			商品名称
// category		商品分类
// price		商品价格
// imgUrl		商品图片地址
// goodsDesc	商品描述
export var add = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })

// 19.获取商品列表
// currentPage  当前页码
// pageSize  当前条数
export var getgoodsList = (currentPage, pageSize) => axios.get("/goods/list", { params: { currentPage, pageSize } })

// 20.删除商品
// 请求地址：
export var delgoods = (id) => axios.get("/goods/del", { params: { id } })

// 21.修改商品
// name  商品名称
// category   商品分类
// price  商品价格
// imgUrl  商品图片地址
// goodsDesc  商品描述
// id  商品ID
export var changegoods = (name, category, price, imgUrl, goodsDesc, id) => axios.post("/goods/edit", { name, category, price, imgUrl, goodsDesc, id })

// 22.获取订单列表(带查询功能)
export var getOrderlist = (params) => axios.get('/order/list', { params })

// 23.查询
// currentPage   当前页码
// pageSize  每页条数
// orderNo  订单号
// consignee  收货人
// phone 手机号
// orderState 订单状态
// date 时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export var query = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get("/order/search", { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 24.获取订单详情
// id   订单id
export var getOrderdetail = (id) => axios.get("/ order / detail", { params: { id } })

// 25.修改订单
// id     要修改账号的id
// orderNo     订单号
// orderTime     下单时间
// phone     电话
// consignee     收货人
// deliverAddress     送货地址
// deliveryTime     送达时间
// remarks     备注
// orderAmount     订单金额
// orderState     订单状态
export var changeOrder = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post("/order/edit", { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

// 26.获取店铺详情
export var getshopifo = () => axios.get("/shop/info",)

// 28.店铺内容修改
// id	店铺id
// name		店铺名称
// bulletin		店铺公告
// avatar		店铺头像
// deliveryPrice	起送价格
// deliveryTime	送达时间
// description		店铺描述
// score		店铺好评率
// sellCount	店铺销量
// supports		是	活动支持
// date		营业时间
// pics		图片
export var changeshop = (id,
    name,
    bulletin,
    avatar,
    deliveryPrice,
    deliveryTime,
    description,
    score,
    sellCount,
    supports,
    date,
    pics) => axios.post("/shop/edit", {})
// 29.首页报表接口

export var totaldata = () => axios.get("/order/totaldata",)

// 30.订单报表接口
export var ordertotal = (date) => axios.get("/order/ordertotal", { params: { date } })
