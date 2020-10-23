import { savePhoto, dateConversion, getImageInfo, vibrate } from '@/common/utils';
import eventHub from '@/common/eventHub';
import api from '@/api';
// import * as api from '@/api'
const nowDay = new Date().getDate() + '';
const nowMonth = new Date().getMonth() + 1 + '';

const device = wx.getSystemInfoSync();
const wWidth = device.windowWidth;
const ratio = device.windowWidth / 375;
export default {
  data: {
    canvasId: 'canvas' + Math.ceil(Math.random() * 998),
    audit: 1,
    wWidth,
    ratio,
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
    date: nowDay.length > 1 ? nowDay + '' : '0' + nowDay,
    monthStr: dateConversion(new Date()).month + '月',
    dayStr: dateConversion(new Date()).day,
    qrcode: '',
    qrcodeUrl: 'cloud://daka.6461-daka-1301019118/qrcode',
    prepare: true,
    done: false,
  },
  methods: {
    // 一些初始化
    async init() {
      wx.showLoading({
        title: '初始化..',
      });
      // wx.cloud.init({ env: 'daka' });
      this.avatarUrl = this.$app.$options.globalData.userInfo.avatarUrl;
      this.nickName = this.$app.$options.globalData.userInfo.nickName;
      // const res = await api.audit({ id: 1 });
      // this.audit = res.result.status;
    },
    // 通常的下载图片并设置宽高
    async generalLoadImg(name) {
      if (this[name + '_width'] === 0) {
        const Img = await this.downloadCloud(this[name]);
        this[name] = Img.path;
        this[name + '_width'] = Img.width;
        this[name + '_height'] = Img.height;
      }
    },
    // 下载图片并以背景作为参考系设置宽高
    async referLoadImg(name) {
      if (this[name + '_width'] === 0) {
        const preImg = await this.downloadCloud(this[name]);
        this[name] = preImg.path;
        this[name + '_width'] = (preImg.width * this.wWidth) / this[this.basisImg + '_width'];
        this[name + '_height'] = parseInt((preImg.height * this[name + '_width']) / preImg.width);
      }
    },
    async prepareImg(obj) {
      if (this.prepare) {
        // let res = null;
        // res = await this.downloadSome(this.avatarUrl);
        // this.avatarUrl = res.path;
        // if (obj && obj.qrcode) {
        //   res = await this.downloadCloud(this.qrcodeUrl + obj.qrcode + '.png');
        //   this.qrcode = res.path;
        // }
        this.prepare = false;
      }
    },
    // downloadAll() {
    //   const pArray = [];
    //   const localAvatart = () => {
    //     return this.downloadSome(this.avatarUrl);
    //   };
    //   const qr0 = () => {
    //     return this.downloadCloud(this.qrcode00);
    //   };
    //   const qr1 = () => {
    //     return this.downloadCloud(this.qrcode01);
    //   };
    //   pArray.push(localAvatart(), qr0(), qr1());
    //   return Promise.all(pArray);
    // },
    // 准备整图
    async prepareBg() {
      if (this[this.basisImg + '_width'] === 0) {
        const bgImg = await this.downloadCloud(this[this.basisImg]);
        this[this.basisImg] = bgImg.path;
        this[this.basisImg + '_width'] = bgImg.width;
        this[this.basisImg + '_height'] = bgImg.height;
        this.height = parseInt((bgImg.height * this.wWidth) / bgImg.width);
      }
    },
    /**
     * 下载图片
     */
    downloadSome(src) {
      return new Promise((resolve) => {
        wx.getImageInfo({
          src,
          success(res) {
            resolve(res);
          },
        });
      });
    },
    /**
     * 下载云图片
     */
    downloadCloud(src) {
      return new Promise((resolve) => {
        wx.cloud
          .downloadFile({
            fileID: src,
          })
          .then(async (res) => {
            resolve(await getImageInfo(res.tempFilePath));
          })
          .catch((e) => {});
      });
    },
    /**
     * 预览/发送图片
     */
    preview() {
      const urls = [];
      urls.push(this.previewPic);
      wx.previewImage({
        current: this.previewPic, // 当前显示图片的http链接
        urls, // 需要预览的图片http链接列表
      });
    },
    save() {
      savePhoto(this.previewPic);
    },

    /**
     * 生成canvas描述的图片
     */
    createPic(_this) {
      wx.canvasToTempFilePath(
        {
          canvasId: this.canvasId,
          success: (res) => {
            _this.previewPic = res.tempFilePath;
          },
          fail: (e) => {
            console.log('fail creat Img', e);
          },
          complete: () => {
            wx.hideLoading();
          },
        },
        _this
      );
    },
    /**
     * 更换背景图片
     */
    changePhoto() {
      const name = this.editImg;
      const _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          _this.$store.state.cropImg = tempFilePaths[0];
          wx.setStorageSync('cropWidth', _this[name + '_width']);
          wx.setStorageSync('cropHeight', _this[name + '_height']);
          wx.navigateTo({
            url: 'cropper',
          });
          // _this[name] = tempFilePaths[0];
          // _this.draw();
        },
      });
    },
    /**
     * 打开编辑框
     */
    edit(e) {
      vibrate();
      this.editFlag = e;
      this.editText = this[e];
      this.showEditModal = true;
    },
    /**
     * 关闭modal重新渲染
     */
    editModalChange(args) {
      if (args.index === 1) {
        this[this.editFlag] = args.text;
        this.draw();
      }
      this.showEditModal = false;
    },
    /**
     * 菜单动作
     */
    menuAction(fn) {
      this[fn]();
    },
    editBtn() {
      this.showEdit = !this.showEdit;
    },
  },
  async created() {
    // this.draw().then(() => { this.done = true })
  },
  onLoad() {
    const _this = this;
    eventHub.$on('changePhoto', (...args) => {
      _this[_this.editImg] = args[0].url;
      setTimeout(() => {
        wx.showLoading({
          title: '施加魔法中..',
        });
        setTimeout(() => {
          _this.draw();
        }, 1000);
      }, 300);
    });
  },
};
