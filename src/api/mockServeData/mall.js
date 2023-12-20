import mockjs from "mockjs";
import Mock from 'mockjs';

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    )
  }

let List = [{
    mallId:'1',
    name:'风衣',
    classify:'上衣',
    number:'1',
    brand:'HM',
    size:'xs',
    cover:'123',
    price:'260RM',
    pullFlag:'1',
  }];

export default{
     /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name,classify,brand, page,limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getMallList: config => {
      console.log("进入mock")
    console.log(config,'config')
  const { name,classify,brand,page = 1, limit = 20 } = param2Obj(config.url)
  console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
  const mockList = List.filter(mall => {
    if ((name && mall.name.indexOf(name) === -1) || (classify && mall.classify.indexOf(classify)==-1) || (brand && mall.brand.indexOf(brand)==-1)) return false
    return true
  })
  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
  return {
    code: 200,
    count: mockList.length,
    list: pageList
  }
},
/**
 * 增加用户
 * @param mallId,name,classify,number,brand,size,cover,price,pullFlag
 * @return {{code: number, data: {message: string}}}
 */
createMall: config => {
  const { mallId,name,classify,number,brand,size,cover,price,pullFlag } = JSON.parse(config.body)
  console.log(JSON.parse(config.body))
  List.unshift({
    mallId,
    name,
    classify,
    number,
    brand,
    size,
    cover,
    price,
    pullFlag,
  })
  return {
    code: 200,
    data: {
      message: '添加成功'
    }
  }
},
/**
 * 删除用户
 * @param mallId
 * @return {*}
 */
deleteMall: config => {
  const { mallId } = JSON.parse(config.body)
  if (!mallId) {
    return {
      code: -999,
      message: '参数不正确'
    }
  } else {
    List = List.filter(u => u.mallId !== mallId)
    return {
      code: 200,
      message: '删除成功'
    }
  }
},
/**
 * 批量删除
 * @param config
 * @return {{code: number, data: {message: string}}}
 */
batchremove: config => {
    console.log("config",config)
//   let { ids } = param2Obj(config.url)
//   ids = ids.split(',')
     let {ids} = JSON.parse(config.body)
  List = List.filter(u => !ids.includes(u.mallId))
  return {
    code: 20000,
    data: {
      message: '批量删除成功'
    }
  }
},
/**
 * 修改用户
 * @param mallId,name,classify,number,brand,size,cover,price,pullFlag
 * @return {{code: number, data: {message: string}}}
 */
updateMall: config => {
  const { mallId,name,classify,number,brand,size,cover,price,pullFlag } = JSON.parse(config.body)
//   const sex_num = parseInt(sex)
  List.some((u,index) => {
    if (u.mallId === mallId) {
        List[index]=JSON.parse(config.body)
        // u.mallId = mallId;
        // u.name = name;
        // u.classify = classify;
        // u.number = number;
        // u.brand = brand;
        // u.size = size;
        // u.cover = cover;
        // u.price = price;
        // u.pullFlag = pullFlag;
        console.log('u',u)
      return true
    }
  })
  console.log("list",List)
  return {
    code: 200,
    data: {
      message: '编辑成功'
    }
  }
}
}