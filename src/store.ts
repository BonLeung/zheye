import axios from 'axios'
import { Commit, createStore } from 'vuex'
import { testData, testPosts } from './testData'
interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createAt?: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const getAndcommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'BonLeung' }
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data && rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(column => column._id === id)
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  actions: {
    fetchColumns: ({ commit }) => {
      getAndcommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndcommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndcommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  }
})

export default store
