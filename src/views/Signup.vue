<template>
  <div class="signup-page ma-auto p-3 w-330">
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          v-model="formData.email"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          v-model="formData.nickName"
          :rules="nameRules"
          placeholder="请输入昵称"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          v-model="formData.password"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">重复密码</label>
        <validate-input
          v-model="formData.repeatPassword"
          :rules="repeatPasswordRules"
          placeholder="请输入重复密码"
          type="password"
        />
      </div>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import createMessage from '@/components/createMessage'

export default defineComponent({
  name: 'signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const formData = reactive({
      email: '',
      nickName: '',
      password: '',
      repeatPassword: ''
    })
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱地址' }
    ]
    const nameRules: RulesProp = [
      { type: 'required', message: '昵称不能为空' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '重复密码不能为空' },
      {
        type: 'custom',
        message: '两次输入的密码不一致',
        validator: () => {
          return formData.password === formData.repeatPassword
        }
      }
    ]
    const onFormSubmit = async (result: boolean) => {
      if (result) {
        const payload = {
          email: formData.email,
          nickName: formData.nickName,
          password: formData.password
        }
        axios.post('/api/users', payload).then(data => {
          createMessage('注册成功，正在跳转登录页面', 'success')
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }).catch(e => {
          createMessage(e, 'error')
          console.log(e)
        })
      }
    }
    return {
      formData,
      emailRules,
      nameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit
    }
  }
})
</script>

<style>

</style>
