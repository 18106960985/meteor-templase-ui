import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '七月流星',
    avatar: 'http://himg.bdimg.com/sys/portrait/item/43f7e4b883e69c88e28496e6b581e6989f9d13.jpg',
    name: 'Meteor'
  }
}

export default {
  loginByUsername: config => {

    return userMap['admin']
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
