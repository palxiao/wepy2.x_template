

export default {
    data: {
        wWidth: 0,
        ratio: 0,
        previewPic: '',
        scale: 0.9,
        width: 375,
        height: 0,
        showEdit: false,
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
    },
    created() {
        wx.showLoading()
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
