<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PostsWithAuthorList } from '@/models'
import AppButton from './common/AppButton.vue'

const { postsList } = defineProps<{ postsList?: PostsWithAuthorList }>()

const router = useRouter()

function navigateToEditPost(id: number) {
  router.push({ name: 'editPost', params: { id } })
}
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
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in postsList" :key="post.id">
        <td><input type="checkbox" :name="`select-post-${post.title}`" /></td>
        <td data-cell="title" class="post-title">{{ post.title }}</td>
        <td data-cell="description" class="post-description">{{ post.body }}</td>
        <td data-cell="author">{{ post.author?.name }}</td>
        <td>
          <AppButton variant="tertiary" left-icon="edit" @click="navigateToEditPost(post.id)" />
          <AppButton variant="tertiary" left-icon="delete" />
        </td>
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
  text-align: left;
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

tbody tr:nth-child(even) {
  background-color: var(--vt-c-white-mute);
}

@media (prefers-color-scheme: dark) {
  th {
    background-color: var(--vt-c-black-soft);
  }

  tbody tr:nth-child(even) {
    background-color: var(--vt-c-black-mute);
  }
}

@media (max-width: 1024px) {
  thead {
    display: none;
  }

  tr {
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-areas:
      'checkbox title actions'
      'checkbox description actions'
      'checkbox author actions';
    height: auto;
  }

  td:nth-of-type(1) {
    grid-area: checkbox;
    place-self: center;
  }

  td:nth-of-type(2) {
    grid-area: title;
  }

  td:nth-of-type(3) {
    grid-area: description;
  }

  td:nth-of-type(4) {
    grid-area: author;
  }

  td:nth-of-type(5) {
    grid-area: actions;
    display: grid;
    place-items: center;
  }

  td::before {
    content: attr(data-cell) ': ';
    font-weight: 600;
    text-transform: capitalize;
  }

  td:nth-of-type(1)::before,
  td:nth-of-type(5)::before {
    content: unset;
  }

  .post-title,
  .post-description {
    max-width: unset;
  }
}
</style>
