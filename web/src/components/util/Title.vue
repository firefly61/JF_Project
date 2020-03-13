<template>
    <div class="title">{{content}}</div>
</template>

<script>
    export default {
        name: 'Title',
        props: {
            content: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title {
        padding: 1rem 1.25rem;
        text-align: left;
        color: #00ffff;
    }
</style>