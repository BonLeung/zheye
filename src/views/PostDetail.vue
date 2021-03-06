<template>
  <div class="post-detail-page">
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentImageUrl"  :alt="currentPost.title" class="rounded-lg img-fluid my-4" />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt}}</span>
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
        :to="{ name: 'create', query: { id: currentPost._id } }"
        type="button"
        class="btn btn-success">编辑</router-link>
        <button type="button" class="btn btn-danger">删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { GlobalDataProps, ImageProps, PostProps, UserProps } from '@/store'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import MarkdownIt from 'markdown-it'
import UserProfile from '@/components/UserProfile.vue'

export default defineComponent({
  components: {
    UserProfile
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const route = useRoute()
    const modalIsVisible = ref(false)
    const currentId = route.params.id
    const md = new MarkdownIt()

    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })

    const currentPost = computed<PostProps>(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && content) {
        return isHTML ? content : md.render(content)
      } else {
        return null
      }
    })

    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })

    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })

    return {
      currentPost,
      currentImageUrl,
      currentHTML,
      showEditArea
    }
  }
})
</script>

<style>

</style>
