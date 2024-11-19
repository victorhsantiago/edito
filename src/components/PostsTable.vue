<script setup lang="ts">
import type { PostsWithAuthorList } from '@/models'

const { postsList } = defineProps<{ postsList?: PostsWithAuthorList }>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="col">
          <input type="checkbox" name="select-all" />
        </th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Author</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in postsList" :key="post.id">
        <td><input type="checkbox" :name="`select-post-${post.title}`" /></td>
        <td class="post-title">{{ post.title }}</td>
        <td class="post-description">{{ post.body }}</td>
        <td>{{ post.author?.name }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
table {
  width: 100%;
  max-width: 1024px;
  border-collapse: collapse;
  position: relative;
}

th,
td {
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-wrap: nowrap;
  transition: 0.2s;
}

tr {
  height: 4rem;
}

.post-title {
  max-width: 30ch;
}

.post-description {
  max-width: 60ch;
}

th {
  font-weight: 600;
  position: sticky;
  top: 0;
  background-color: var(--vt-c-white-soft);
}

tbody tr:nth-child(even) td {
  background-color: var(--vt-c-white-mute);
}

@media (prefers-color-scheme: dark) {
  th {
    background-color: var(--vt-c-black-soft);
  }

  tbody tr:nth-child(even) td {
    background-color: var(--vt-c-black-mute);
  }
}
</style>
