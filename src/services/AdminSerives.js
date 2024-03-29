/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-05-13 19:18:18
 * @LastEditors: lxw
 * @LastEditTime: 2020-06-05 12:13:46
 */
import AdminDao from '../dao/AdminDao'
import responResult from '../utils/responResult';
import md5code from '../utils/md5code.js';
import consoleLog from '../utils/consoleLog';

const aDao = new AdminDao()

class AdminService {

    /**
     * @name: 
     * @description: 添加管理员,插入一个doucmetn
     * @msg: 
     * @param {type} 
     * @return: 
     */
    add(obj) {

        // md5加密后返回
        obj.password = md5code(obj.password)
        return new Promise((resolve, reject) => {
            aDao.save(obj).then(result => {
                console.log(`请求成功${result}`)
                // 请求成功返回成功的json 状态码200
                responResult['SUCCESS'].data = result
                resolve(responResult['SUCCESS'])
            }).catch(error => {
                // 返回失败的json，状态码500
                responResult['ERROR-500'].message = '数据库操作失败'
                responResult['ERROR-500'].err = error
                reject(responResult['ERROR-500'])
            })


        });



    }

     /**
     * @name: 
     * @description: 根据id查询
     * @msg: 
     * @param {type} | id
     * @return: 
     */
    findById(id) {
        let condtion = {
            _id: id
        }
        return new Promise((resolve, reject) => {
            aDao.findOne(condtion).then((result) => {
                console.log(`请求成功${result}`)
                // 请求成功返回成功的json 状态码200
                responResult['SUCCESS'].data = result
                resolve(responResult['SUCCESS'])
            }).catch((err) => {
                // 返回失败的json，状态码500
                responResult['ERROR-500'].message = '数据库操作失败'
                responResult['ERROR-500'].err = err
                reject(responResult['ERROR-500'])
            });
        });
    }

     /**
     * @name: 
     * @description: 分页查询全部
     * @msg: 
     * @param {type} | pagesiez pagenum
     * @return: 
     */
    findAll(pageNum, pageSize) {
        let pageObj = {
            pageNum: pageNum,
            pageSize: pageSize
        }
        return new Promise((resolve, reject) => {
            aDao.findAllByPage(pageObj).then((result) => {
                console.log(`请求成功${result}`)
                // 请求成功返回成功的json 状态码200
                responResult['SUCCESS'].data = result
                resolve(responResult['SUCCESS'])
            }).catch((err) => {
                // 返回失败的json，状态码500
                responResult['ERROR-500'].message = '数据库操作失败'
                responResult['ERROR-500'].err = err
                reject(responResult['ERROR-500'])
            });
        });
    }

     /**
    * @name: 
    * @description: 分页 + 多添加模糊查询 TODO:以后这里要扩展一个字段：时间范围查询
    * @msg: 
    * @param {type} | 权限字段 |username  introduce enable_flag(根据是否被冻结的状态来进行查询) roleid（注意了这里的角色id查询是and条件不是or）adminerid(商家所属管理员id)
    * @param {type} | 分页字段 | pageNum  pagesiez 
    * @return: 
    */
   fiindValug(username, introduce, enable_flag, roleid,adminerid,pageNum, pageSize) {

    // 具体的添加规则，在这里封装比如根据title、parenttitle模糊查询，满足其中一个就可以了，注意mongoose模糊查询是利用传入正则表达式实现的
    let usernameReg = new RegExp(username, 'i')
    let introduceleReg = new RegExp(introduce, 'i')
    let condition = {
        $or: [
            { username: usernameReg },
            { introduce: introduceleReg },
            
        ],
        enable_flag:enable_flag,
        
    }
    if (roleid!=='') {
        
        condition.roleid = roleid
        consoleLog('不为空','red')
    }
    if (adminerid) {
        condition.adminerid = adminerid
    }
    

    let pageObj = {
        pageNum: pageNum,
        pageSize: pageSize
    }
    return new Promise((resolve, reject) => {
        aDao.findByVgue(condition, pageObj).then((result) => {
            console.log(`请求成功${result}`)
            // 请求成功返回成功的json 状态码200
            responResult['SUCCESS'].data = result
            resolve(responResult['SUCCESS'])
        }).catch((err) => {
            // 返回失败的json，状态码500
            responResult['ERROR-500'].message = '数据库操作失败'
            responResult['ERROR-500'].err = err
            reject(responResult['ERROR-500'])
        });
    });
}



/**
     * @name: 
     * @description: 根据角色id进行更新
     * @msg: 
     * @param {type} | id | obj
     * @return: 
     */
    updatById(id, updateObj) {
        let condtion = {
            _id: id
        }
        if (updateObj.password) {
            updateObj.password = md5code(updateObj.password)
        }
        return new Promise((resolve, reject) => {
            aDao.update(condtion, updateObj).then((result) => {
                console.log(`请求成功${result}`)
                // 请求成功返回成功的json 状态码200
                responResult['SUCCESS'].data = result
                resolve(responResult['SUCCESS'])
            }).catch((err) => {
                // 返回失败的json，状态码500
                responResult['ERROR-500'].message = '数据库操作失败'
                responResult['ERROR-500'].err = err
                reject(responResult['ERROR-500'])
            });
        });
    }


    /**
    * @name: 
    * @description: 
    * @msg: 
    * @param {type} id | id值
    * @return: 
    */
    deletById(id) {
        let condtion = {
            _id: id
        }
        return new Promise((resolve, reject) => {
            aDao.remove(condtion).then((result) => {
                console.log(`请求成功${result}`)
                // 请求成功返回成功的json 状态码200
                responResult['SUCCESS'].data = result
                resolve(responResult['SUCCESS'])
            }).catch((err) => {
                // 返回失败的json，状态码500
                responResult['ERROR-500'].message = '数据库操作失败'
                responResult['ERROR-500'].err = err
                reject(responResult['ERROR-500'])
            });
        });
    }

}

export default AdminService