<script setup>
const props = defineProps(['savings', 'label'])
console.log("props")
</script>

<template>
    <div class="my-4">
        <h4 class="text-xl">{{ props.label }}</h4>
        <p class="text-2xl font-bold">{{ (props.savings / 1000).toFixed(4) }}
            <span class="text-sm">tonnes</span>
        </p>
    </div>
</template>