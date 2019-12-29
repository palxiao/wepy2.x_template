
import { savePhoto, dateConversion, getImageInfo } from '@/utils';
// import * as api from '@/api'
const nowDay = new Date().getDate() + ''
const nowMonth = (new Date().getMonth() + 1) + ''
export default {
    data: {
        wWidth: 0,
        ratio: 0,
        previewPic: '',
        scale: 0.9,
        width: 375,
        height: 0,
        showEdit: false,
        showEditModal: false,
        editText: '',
        editFlag: '',
        avatarUrl: '',
        nickName: '',
        year: new Date().getFullYear() + '',
        month: nowMonth.length > 1 ? nowMonth + '' : '0' + nowMonth,
        day: nowDay.length > 1 ? nowDay + '' : '0' + nowDay,
        monthStr: dateConversion(new Date()).month + '月'
    },
    methods: {
        /**
         * 下载图片
         */
        downloadSome(src) {
            return new Promise(resolve => {
                wx.getImageInfo({
                    src,
                    success(res) {
                        resolve(res)
                    }
                })
            })
        },
        /**
         * 下载云图片
         */
        downloadCloud(src) {
            return new Promise(resolve => {
                wx.cloud.downloadFile({
                    fileID: src
                }).then(async res => {
                    resolve(await getImageInfo(res.tempFilePath))
                }).catch(e => { })
            })
        },
        /**
         * 预览/发送图片
         */
        preview() {
            const urls = []
            urls.push(this.previewPic)
            wx.previewImage({
                current: this.previewPic, // 当前显示图片的http链接
                urls // 需要预览的图片http链接列表
            })
        },
        save() {
            savePhoto(this.previewPic)
        },

        /**
         * 生成canvas描述的图片
         */
        createPic(_this) {
            wx.canvasToTempFilePath({
                canvasId: 'canvas',
                success: (res) => {
                    _this.previewPic = res.tempFilePath
                },
                fail: (e) => {
                    console.log('fail creat Img', e);
                },
                complete: () => {
                    wx.hideLoading();
                }
            }, _this);
        },
        /**
         * 更换背景图片
         */
        changePhoto(name) {
            if (!name) {
                name = 'bgImg'
            }
            const _this = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    const tempFilePaths = res.tempFilePaths;
                    _this[name] = tempFilePaths[0];
                    _this.draw();
                }
            });
        },
        /**
         * 打开编辑框
         */
        edit(e) {
            this.editFlag = e
            this.editText = this[e]
            this.showEditModal = true;
        },
        /**
         * 关闭modal重新渲染
         */
        editModalChange(args) {
            if (args.index === 1) {
                this[this.editFlag] = args.text
                this.draw()
            }
            this.showEditModal = false
        },
        /**
         * 菜单动作
         */
        menuAction(fn) {
            this[fn]()
        },
        editBtn() {
            this.showEdit = !this.showEdit
        },
    },
    created() {
        wx.cloud.init({
            env: 'daka'
        })
        this.avatarUrl = this.$app.$options.globalData.userInfo.avatarUrl
        this.nickName = this.$app.$options.globalData.userInfo.nickName
        try {
            const res = wx.getSystemInfoSync();
            this.wWidth = res.windowWidth
            console.log('机宽：' + this.wWidth);
            this.ratio = res.windowWidth / 375;
            console.log('系数：' + this.ratio);
        } catch (e) {
            // Do something when catch error
        }
        this.draw();
    },
}
