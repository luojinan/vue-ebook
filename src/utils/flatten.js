/**
 * [{id:1, subitems:[id:2,subitems:[...] ]}  ,{id:4}]
 */
// 一维数组转为多维数组
export function flatten(arr){
  const newArr = arr.map(item=>{
    return [].concat(item,...flatten(item.subitems))
  })
  return [].concat(...newArr)
}
export default {
  flatten
}