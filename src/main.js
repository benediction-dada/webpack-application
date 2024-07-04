// style
import './asset/style/common.css'
import './asset/style/common.less'
import './asset/style/common.sass'
import './asset/style/common.scss'
import './asset/style/common.styl'
import './asset/icon/iconfont.css'

// js
const list = new Array(4).fill(10)
const fn = () => {
	console.log(...list)
}

fn()()
