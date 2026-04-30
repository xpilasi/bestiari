import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as api from '@/lib/blogApi'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchPublishedPosts() {
    loading.value = true
    error.value = null
    try {
      posts.value = await api.getPublishedPosts()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchAllPosts() {
    loading.value = true
    error.value = null
    try {
      posts.value = await api.getAllPosts()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchPostBySlug(slug) {
    try {
      return await api.getPostBySlug(slug)
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  async function fetchPostById(id) {
    try {
      return await api.getPostById(id)
    } catch (e) {
      error.value = e.message
      return null
    }
  }

  async function createPost(postData) {
    const newPost = await api.createPost(postData)
    posts.value.unshift(newPost)
    return newPost
  }

  async function updatePost(id, postData) {
    const updated = await api.updatePost(id, postData)
    const i = posts.value.findIndex(p => p.id === id)
    if (i > -1) posts.value[i] = updated
    return updated
  }

  async function deletePost(id) {
    await api.deletePost(id)
    posts.value = posts.value.filter(p => p.id !== id)
  }

  async function publishPost(id) {
    return updatePost(id, {
      status: 'published',
      published_at: new Date().toISOString()
    })
  }

  return {
    posts, loading, error,
    fetchPublishedPosts, fetchAllPosts,
    fetchPostBySlug, fetchPostById,
    createPost, updatePost, deletePost, publishPost
  }
})
