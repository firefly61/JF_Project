<template>
    <div class="login">
        <el-form ref="loginForm" :model="loginForm" status-icon :rules="rules" label-width="70px"
            :label-position="'right'">
            <el-form-item label="用户名" prop="nickname">
                <el-input v-model="loginForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="loginForm.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
                <el-input v-model="loginForm.captcha" class="captcha-input"></el-input>
                <img :src="code.captcha" class="f-r" @click="getNew" alt="验证码">
            </el-form-item>
            <el-button type="primary" @click.native="login">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
    import md5 from "md5";
    export default {
        data() {
            return {
                loginForm: {
                    nickname: 'jjjf',
                    pwd: '111111',
                    captcha: ''
                },
                rules: {
                    nickname: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    pwd: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    captcha: [{
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }]
                },
                code: {
                    captcha: '/api/captcha'
                }
            }
        },
        mounted() {
            this.code.captcha = '/api/captcha?_t' + new Date().getTime();
        },
        methods: {
            login() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        let obj = {
                            nickname: this.loginForm.nickname,
                            pwd: md5(this.loginForm.pwd),
                            captcha: this.loginForm.captcha
                        }
                        this.$http.post('user/login', obj).then(
                            (data) => {
                                if (data.code == -1) {
                                    this.$message.error(data.message);
                                    this.getNew();
                                } else {
                                    console.log(data.data)
                                    localStorage.setItem('user', JSON.stringify(data.data));
                                    this.$message.success('登陆成功');
                                    setTimeout(() => {
                                        this.$router.push('/index')
                                    }, 1000);

                                }
                                console.log(data)
                            }, (err) => {
                                console.log(err)
                            })
                    }
                })
            },
            getNew() {
                this.code.captcha = '/api/captcha?_t' + new Date().getTime();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
    .login {
        height: 100vh;
        padding-top: 25vh;
        background: linear-gradient(45deg, #148c92, #319ab9, #93d7de, transparent);
    }

    .el-form {
        width: 350px;
        margin: 0 auto;
        padding: 60px 45px 45px;
        background: #ecf5ff;
        border-radius: 5px;
        box-shadow: 2px 3px 4px 1px rgba(0, 0, 0, .08);
        text-align: center;

    }

    .captcha-input {
        width: 62%;
        float: left;
    }
</style>