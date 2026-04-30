import { supabase } from './supabase'

export async function getPublishedPosts(limit = 50) {
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, featured_image, category, tags, published_at, views, agent:author_id(name, role, avatar)')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function getAllPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*, agent:author_id(name, avatar)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getPostBySlug(slug) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, agent:author_id(name, role, avatar)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) throw error
  return data
}

export async function getPostById(id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createPost(postData) {
  if (!postData.slug && postData.title) {
    postData.slug = postData.title
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
  }
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select()
  if (error) throw error
  return data[0]
}

export async function updatePost(id, postData) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...postData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
  if (error) throw error
  return data[0]
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

export async function publishPost(id) {
  return updatePost(id, {
    status: 'published',
    published_at: new Date().toISOString()
  })
}

export async function incrementViews(id) {
  await supabase.rpc('increment_post_views', { post_id: id }).catch(() => {})
}
