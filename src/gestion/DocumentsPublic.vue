<template>
  <DocumentsManager :intern="false" />
</template>

<script>
import DocumentsManager from "./DocumentManager.vue";
export default {
  name: "DocumentsPublic",
  components: { DocumentsManager },
};
</script>
