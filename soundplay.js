(function () {
    function SoundPlay(params) {
        //处理参数
        this.opts = Object.assign({
            src: 'https://static3.yscase.com/maotai/bgm.mp3', //mp3文件地址
            autoplay: true, // 是否自动开始播放，默认 true
            loop: true, // 是否循环播放，默认 true
            icon: 'https://static3.yscase.com/icon.png', // 播放按钮图标
            animation: true, // 如果为 true 上面的icon转动，默认true 
            x: 100, // x 坐标，可选 ，默认右上角
            y: 20, // y 坐标，可选，默认右上角
        }, params);


        //如果在微信浏览器内 自动播放关闭
        this.playPlace() ? this.onOff = this.opts.autoplay : this.onOff = false;

        this.animationAnim = null;
        this.winW = document.body.clientWidth; //获取屏幕宽度
        this.angle = 0; //icon旋转度数

        this.init();
    }

    SoundPlay.prototype.playPlace = function () {
        //获取判断用的对象
        let ua = navigator.userAgent.toLowerCase();

        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }

        //在移动端的非微信/qq中打开
        if ((ua.match(/MicroMessenger/i) != "micromessenger") && (ua.match(/QQ/i) != "qq") && !flag) return false;

        return true;
    }

    SoundPlay.prototype.init = function () {
        // 创建dom标签
        this.musicBox = document.createElement('div');
        this.musicBox.style.position = 'absolute';
        this.musicBox.style.right = parseInt(this.opts.x) / 750 * this.winW + 'px';
        this.musicBox.style.top = parseInt(this.opts.y) / 750 * this.winW + 'px';
        this.musicBox.style.zIndex = 99999;

        // 创建音乐icon标签
        this.musicImg = new Image();
        this.musicImg.onload = () => {
            this.musicImg.style.display = 'block';

            //设置盒子宽高
            if (this.opts.w || this.opts.h) {
                this.musicBox.style.width = this.opts.w / 750 * this.winW + 'px';
                this.musicBox.style.height = this.opts.h / 750 * this.winW + 'px';
            } else {
                this.musicBox.style.width = this.musicImg.naturalWidth / 750 * this.winW + 'px';
                this.musicBox.style.height = this.musicImg.naturalHeight / 750 * this.winW + 'px';
            }

            this.musicImg.style.width = '100%';
            this.musicImg.style.height = 'auto';
        }
        this.musicImg.src = this.opts.iconPause && !this.opts.autoplay ? this.opts.iconPause : this.opts.icon;


        // 创建音频dom标签
        this.musicAudio = new Audio();
        this.musicAudio.src = this.opts.src;
        this.musicAudio.loop = this.opts.loop;
        this.musicAudio.autoplay = this.opts.autoplay;

        this.musicBox.append(this.musicImg);
        this.musicBox.append(this.musicAudio);
        document.body.append(this.musicBox);

        //自动播放
        if (this.onOff) this.play();

        if (!this.onOff) this.pause();

        //如果不循环且播放完毕
        this.musicAudio.addEventListener('ended', () => {

            if (!this.opts.loop && this.onOff) {
                this.pause();
            }
        }, false);

        //注册事件
        this.musicBox.addEventListener('click', this.controlPlay.bind(this));
    }

    SoundPlay.prototype.controlPlay = function () {
        if (this.onOff) { //暂停
            this.pause();
        } else { //播放
            this.play();
        }
    }

    SoundPlay.prototype.show = function () {
        this.musicBox.style.display = 'block';
    }

    SoundPlay.prototype.hide = function () {
        this.musicBox.style.display = 'none';
    }

    SoundPlay.prototype.pause = function () {
        this.onOff = false;
        this.musicAudio.pause();
        if (this.opts.iconPause && !this.onOff) {
            this.musicImg.src = this.opts.iconPause;
            this.angle = 0;
        }

        if (this.opts.iconPause) this.musicImg.src = this.opts.iconPause;
        if (this.opts.animation) this.animation_pause();
    }

    SoundPlay.prototype.play = function () {
        let that = this;

        this.onOff = true;
        document.addEventListener('DOMContentLoaded', function () {
            document.addEventListener("WeixinJSBridgeReady", function () {
                that.musicAudio.play();
            }, false);
        });

        this.musicAudio.play();
        if (this.opts.iconPause) this.musicImg.src = this.opts.icon;

        if (this.opts.animation) this.animation_start();
    }

    SoundPlay.prototype.animation_start = function () {
        this.animation_pause();

        this.angle >= 360 ? (this.angle = 0) : this.angle++;

        this.musicBox.style.transform = `rotate(${this .angle}deg)`;
        if (this.opts.iconPause) this.musicImg.src = this.opts.icon;
        this.animationAnim = requestAnimationFrame(this.animation_start.bind(this));

    }

    SoundPlay.prototype.animation_pause = function () {
        if (this.animationAnim) cancelAnimationFrame(this.animationAnim);

        if (this.opts.iconPause) {
            this.musicBox.style.transform = `rotate(0deg)`;
        }
        this.animationAnim = null;
    }

    window.SoundPlay = SoundPlay;
})();