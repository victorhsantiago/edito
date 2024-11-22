<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PostsWithAuthorList } from '@/models'
import AppButton from './common/AppButton.vue'
import DeletePostDialog from './DeletePostDialog.vue'

const { postsList } = defineProps<{ postsList?: PostsWithAuthorList }>()

const router = useRouter()

function navigateToEditPost(id: number) {
  router.push({ name: 'editPost', params: { id } })
}
</script>

<template>
  <table class="posts-table">
    <caption class="posts-table__caption">
      List of Posts
    </caption>
    <thead class="posts-table__header">
      <tr>
        <th scope="col">
          <input type="checkbox" name="select-all" aria-label="Select all posts" />
        </th>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Author</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody class="posts-table__body">
      <tr v-for="post in postsList" :key="post.id" class="posts-table__row">
        <td class="posts-table__cell--checkbox">
          <input
            type="checkbox"
            :name="`select-post-${post.title}`"
            :aria-label="`Select post ${post.title}`"
          />
        </td>
        <td class="posts-table__cell--title" data-cell="title">{{ post.title }}</td>
        <td class="posts-table__cell--description" data-cell="description">{{ post.body }}</td>
        <td class="posts-table__cell--author" data-cell="author">{{ post.author?.name }}</td>
        <td class="posts-table__cell--actions">
          <AppButton variant="tertiary" left-icon="edit" @click="navigateToEditPost(post.id)" />
          <DeletePostDialog :post="post" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="css" scoped>
/* Base table styling */
.posts-table {
  width: 100%;
  max-width: 1024px;
  border-collapse: collapse;
}

.posts-table__header th,
.posts-table__body td {
  padding: var(--space-sm);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}

.posts-table__caption {
  visibility: hidden;
  height: 0;
}

.posts-table__row {
  height: 4rem;
  transition: background-color 0.2s;
}

.posts-table__row:hover {
  background-color: var(--vt-c-highlight);
}

.posts-table__cell--title {
  max-width: 30ch;
}

.posts-table__cell--description {
  max-width: 60ch;
}

.posts-table__header th {
  font-weight: 600;
  position: sticky;
  top: 0;
  background-color: var(--vt-c-white-soft);
}

.posts-table__body tr:nth-child(even) {
  background-color: var(--vt-c-white-mute);
}

@media (prefers-color-scheme: dark) {
  .posts-table__header th {
    background-color: var(--vt-c-black-soft);
  }

  .posts-table__body tr:nth-child(even) {
    background-color: var(--vt-c-black-mute);
  }
}

/* Mobile layout adjustments */
@media (max-width: 1024px) {
  .posts-table__header {
    display: none;
  }

  .posts-table__row {
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-areas:
      'checkbox title actions'
      'checkbox description actions'
      'checkbox author actions';
    height: auto;
    gap: 0.5rem;
  }

  .posts-table__cell--checkbox {
    grid-area: checkbox;
    place-self: center;
  }

  .posts-table__cell--title {
    grid-area: title;
  }

  .posts-table__cell--description {
    grid-area: description;
  }

  .posts-table__cell--author {
    grid-area: author;
  }

  .posts-table__cell--actions {
    grid-area: actions;
    display: grid;
    place-items: center;
  }

  /* Labels for responsive view */
  td::before {
    content: attr(data-cell) ': ';
    font-weight: 600;
    text-transform: capitalize;
  }

  .posts-table__cell--checkbox::before,
  .posts-table__cell--actions::before {
    content: unset;
  }

  .posts-table__cell--title,
  .posts-table__cell--description {
    max-width: unset;
  }
}
</style>
