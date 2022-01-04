import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: {
      isLogin: false
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'BonLeung' }
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(column => column.id === id)
    },
    getPostsById: (state) => (id: number) => {
      return state.posts.filter(post => post.columnId === id)
    }
  }
})

export default store
