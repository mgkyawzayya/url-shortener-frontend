<template>
  <div class="container container__centered container__padding">
    <div
      class="stats"
      v-if="stats"
    >
      <h1 class="stats__header">
        Stats for {{ stats.shortened_url }}
      </h1>
      <dl class="dlist">
        <dt class="dlist__title">Original URL</dt>
        <dd class="dlist__body">{{ stats.original_url }}</dd>
      </dl>
      <dl class="dlist">
        <dt class="dlist__title">Shortening Requested</dt>
        <dd class="dlist__body">{{ stats.requested_count }} {{ pluralize('time', stats.requested_count) }}</dd>
      </dl>
      <dl class="dlist">
        <dt class="dlist__title">Used</dt>
        <dd class="dlist__body">{{ stats.used_count }} {{ pluralize('time', stats.used_count) }}</dd>
      </dl>
      <dl class="dlist">
        <dt class="dlist__title">Last Requested</dt>
        <dd class="dlist__body">{{ stats.last_requested }}</dd>
      </dl>
      <dl class="dlist">
        <dt class="dlist__title">Last Used</dt>
        <dd class="dlist__body">{{ stats.last_used || 'Never' }}</dd>
      </dl>

      <a
        :href="stats.shortened_url"
        class="button button--yellow"
      >Take me there</a>
    </div>
    <div
      class="stats__loading"
      v-else
    >
      One Moment
    </div>
  </div>
</template>
<script>
import pluralize from 'pluralize'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      stats: 'stats/stats'
    })
  },
  methods: {
    ...mapActions({
      getStats: 'stats/getStats'
    }),
    pluralize: pluralize
  },
  mounted () {
    this.getStats(this.$route.params.code).catch(() => {
      this.$router.replace({ name: 'nope' })
    })
  }
}
</script>
<style lang="scss">
.stats {
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  width: 100%;

  &__header {
    font-size: 1.4em;
    margin: 0;
    margin-bottom: 40px;
    overflow-wrap: break-word;
  }

  &__loading {
    color: #fff;
    font-size: 1.2em;
    font-weight: 500;
  }
}
</style>
